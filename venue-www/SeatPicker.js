import { html, render } from './lit-all.min.js';
import { fetchSeats } from './SeatFetcher.js';

class SeatPicker extends HTMLElement {

	constructor() {
		super();
		this.eventsHandler=[];
		if(this.getAttribute("id")!=null) {
			this.elementId=this.getAttribute("id")+"Svg";
			console.log("The picker's id in constructor is "+this.elementId);
		}
		else this.elementId=null;
		/*
		if(this.getAttribute("maxselect")!=null) {
			console.log("The maxselect is "+this.getAttribute("maxselect"));
		}
		*/
		this.onWinResize = function() {};
		this.initialized=false;
		this.seatsListener=null;
		this.selectedSeats=[];
		this.reservedSeats=[];
		this.seatSocket=null;
		this.pingCount=0;
	}

	connectedCallback() {
		console.log("Seat picker (new) just got connected for "+this.elementId+"!");

		var div = document.createElement('div');
		div.setAttribute("slot","venue-layout")
		div.innerHTML =`<embed style="display: inline; width: 100%; height: 100%;"
				id=${this.elementId} version="1.1" src="./sanctuary.svg"/>`;
		/*
		div.innerHTML =`<object style="display: inline; width: 100%; height: 100%;"
				id=${this.elementId} type="image/svg+xml" data="./sanctuary.svg"/>`;
		*/

		document.getElementById(this.getAttribute("id")).appendChild(div);
		document.getElementById(this.elementId).
			addEventListener("load",_=>this.onEmbedLoad());
		document.getElementById(this.elementId).
			addEventListener("unload",_=>this.onEmbedUnload());

		this.root=this.attachShadow({mode:"open"});
		const rootTemplate = html`
			<slot name="venue-layout"></slot>
			<slot name="reserved-seat" @slotchange=${this.onSlotChange}></slot>
		`;
		render(rootTemplate,this.root);
		this.connect_socket();
	}

	static observedAttributes = ["maxselect","activated","id","finalized"];

	attributeChangedCallback(name, oldValue, newValue) {
		if(name==="maxselect") {
			console.log("User must pick "+newValue+" seats!");
		}
		else if(name==="activated" && this.elementId!=null) {
			if (newValue == 1 && oldValue != 1) {
				console.log("Seat picker (new) just got activated for " +
					this.elementId + "!");
			} else if (newValue == 0 && oldValue != 0) {
				console.log("Seat picker (new) just got deactivated for " +
					this.elementId + "!");
				svgPanZoom('#' + this.elementId).destroy();
				window.removeEventListener('resize',
					this.onWinResize, true);
				window.removeEventListener('seatsReceived',
					this.seatsListener, true);
				this.selectedSeats = [];
				this.reservedSeats = [];
			} else if (newValue == 2 && oldValue != 2) {
				console.log("Seat picker (new) just got re-activated for " +
					this.elementId + "!");
				setTimeout(function () {
					panZoom.resize();
					panZoom.fit();
					panZoom.center();
				}, 100);
				this.setAttribute("activated", "1");
			}
		}
		else if(name==="id" && oldValue==null) {
			this.elementId=this.getAttribute("id")+"Svg";
			console.log("The picker's id in changed attribute is "+this.elementId);
			this.seatsListener=this.outerSeatsReceived(this);
			window.addEventListener('seatsReceived',
				this.seatsListener,true);
		}
		else if(name==="finalized" && oldValue==null) {
			let i = 0;
			console.log("selectedSeat length is: "+this.selectedSeats.length);
			console.log(this.selectedSeats);
			while (i<this.selectedSeats.length) {
				console.log("working on seat: "+i);
				if(this.seatSocket!=null && this.seatSocket.readyState == 1) {
					console.log("sending 'reserved' status");
					this.seatSocket.send(JSON.stringify({
						"seat":this.selectedSeats[i].id,
						"state":"reserved"
					}));
				}
				else {
					console.log("socket is not ready");
				}
				i++;
			}
			/*
			this.selectedSeats.forEach(function(seat) {
				if(!this.seatSocket) this.seatSocket.send(JSON.stringify({"seat":seat.id,"state":"reserved"}));
			});
			*/
		}
		else console.log("Attribute "+name+" was changed!");
	}

	disconnectedCallback() {
		console.log("Seat picker (new) just got disconnected for "+
			this.elementId+"!");
	}

	onEmbedUnload() { console.log("Unloading "+this.elementId); }

	onSlotChange(e) {
		console.log("Reserved seat added to / removed from slot!");
		console.log(this);
		//console.log(this.assignedElements());
		//console.log(this.assignedNodes());
		//console.log(e.target);

		/*
		console.log(e);
		const myEle=document.getElementById("userPickerSvg");
		const myDoc = myEle?.getSVGDocument();
		let nodeList = document.getElementsByTagName("reserved-seat");
		let seatList = Array.prototype.slice.call(nodeList);
		let i = 0;
		while (i<seatList.length) {
			let seatId = seatList[i].getAttribute("id");
			if(this.slotList.includes(seatList[i])) {
				myDoc.getElementById(seatId).style.fill="green";
				this.slotList.spice(this.slotList.indexOf(seatList[i]),1);
			} else {
				myDoc.getElementById(seatId).style.fill="yellow";
				this.slotList.push(seatList[i]);
			}
		}
		*/
	}

	onEmbedLoad() {
		if(this.elementId!=null) {
			if(this.initialized) {
				console.log("Re-executing onEmbed load for "+this.elementId);
				window.removeEventListener('resize', this.onWinResize,true);
				svgPanZoom('#'+this.elementId).destroy();
				this.selectedSeats=[];
				this.reservedSeats=[];
			}
			console.log("Seat picker (new) just got activated for "+
				this.elementId+"!");
			console.log("Enhancing svg for "+this.elementId);
			this.setupPinchZoom(this.elementId);
			console.log("Pinch zoom finished");
			let panZoom = window.panZoom = svgPanZoom('#'+this.elementId,{
				zoomEnabled: true, controlIconsEnabled: true,
				fit: 1, center: 1, customEventsHandler: this.eventsHandler
			});
			console.log("Pan zoom finished");
			this.onWinResize = function() {
				setTimeout(function() {
					panZoom.resize();
					panZoom.fit();
					panZoom.center();
				},100);
			};
			window.addEventListener('resize', this.onWinResize, true);
			console.log("Done with onEmbedLoad");
			this.initialized=true;
			fetchSeats();
		}
	}

	outerSeatsReceived = function(picker) {
		return function	onSeatsReceived(event) {
			console.log("Got seats!");
			const itemTemplates = [];
			const detail=event.detail;
			console.log(detail);
			console.log("Attempting to lookup "+picker.elementId);
			setTimeout(function(p) {
				const myEle=document.getElementById(p.elementId);
				const myDoc = myEle?.getSVGDocument();
				if(myEle == null) {
					console.log("Couldn't retrieve SVG");
				}
				for(var t=1; t<30; t++) {
					for (var s = 1; s < 20; s++) {
						var seatString = 'S' + t + '-' + s;
						if (myDoc?.getElementById(seatString) != null) {
							var seat = myDoc?.getElementById(seatString);
							if(seat!=null) {
								if(detail.payload.includes(seatString)) {
									picker.reservedSeats.push(seat);
									seat.style.fill = "red";
								}
								else {
									/*
									if(seat.style.fill === "yellow") {
										picker.reservedSeats.push(seat);
									}
									else */ seat.style.fill = "green";
								}
							}
							seat.addEventListener("click",p.seatClicked);
						}
					}
				}
				console.log("Requesting pending seats...");
				picker.seatSocket.send("initSeats");
			}.bind(null, picker),10);
		};
	}

	setupPinchZoom(myElementId) {
		this.eventsHandler = {
			haltEventListeners: ['touchstart', 'touchend', 'touchmove',
				'touchleave', 'touchcancel']
			, init: function(options) {
				var instance = options.instance, initialScale = 1,
					pannedX = 0, pannedY = 0

				// Init Hammer
				// Listen only for pointer and touch events
				this.hammer = Hammer(options.svgElement, {
					inputClass: Hammer.SUPPORT_POINTER_EVENTS ?
						Hammer.PointerEventInput : Hammer.TouchInput
				})

				// Enable pinch
				this.hammer.get('pinch').set({enable: true})

				// Handle double tap
				this.hammer.on('doubletap', function(ev){ instance.zoomIn(); })

				// Handle pan
				this.hammer.on('panstart panmove', function(ev){
					// On pan start reset panned variables
					if (ev.type === 'panstart') { pannedX = 0; pannedY = 0; }

					// Pan only the difference
					instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY})
					pannedX = ev.deltaX; pannedY = ev.deltaY
				})

				// Handle pinch
				this.hammer.on('pinchstart pinchmove', function(ev){
					// On pinch start remember initial zoom
					if (ev.type === 'pinchstart') {
						initialScale = instance.getZoom()
						instance.zoomAtPoint(initialScale * ev.scale,
							{x: ev.center.x, y: ev.center.y})
					}
					instance.zoomAtPoint(initialScale * ev.scale,
						{x: ev.center.x, y: ev.center.y})
				})

				// Prevent moving the page on some devices when panning over SVG
				document.getElementById(myElementId).
						addEventListener('touchmove', function(e){
					e.preventDefault();
				});
			}, destroy: function(){
				console.log("Destroying custom events handler (pinch/zoom).");
				this.hammer.destroy()
			}
		}
	}
	seatClicked = e => {
		let seat=e.srcElement;
		if (!this.selectedSeats.includes(seat) && !this.reservedSeats.includes(seat) &&
				this.selectedSeats.length<this.getAttribute('maxselect')) {
			seat.style.fill = "cyan";
			this.selectedSeats.push(seat);
			const seatSelected = new CustomEvent('seatSelected',{
				detail: {
					payload: seat
				},
				bubbles: true
			});
			this.dispatchEvent(seatSelected);
			this.seatSocket.send(JSON.stringify({"seat":seat.id,"state":"pending"}));
		} else if (Number(this.selectedSeats.indexOf(seat))>=0 && this.getAttribute('maxselect')!=="0") {
			const index = this.selectedSeats.indexOf(seat);
			this.selectedSeats.splice(index,1);
			seat.style.fill = "green";
			const seatUnselected = new CustomEvent('seatUnselected',{
				detail: {
					payload: seat
				},
				bubbles: true
			});
			this.dispatchEvent(seatUnselected);
			this.seatSocket.send(JSON.stringify({"seat":seat.id,"state":"nonpending"}));
		}
		//console.log('selectedSeat array: '+this.selectedSeats);
	}

	connect_socket() {
		if(window.location.protocol==='https:')
			this.seatSocket = new WebSocket("wss://"+window.location.host+"/ws/msg");
		else
			this.seatSocket = new WebSocket("ws://"+window.location.host+"/ws/msg");
		this.seatSocket.addEventListener("open", e => {
			this.heartbeat(this.seatSocket,this.pingCount);
		});
		this.seatSocket.onclose = (event) => this.connect_socket;
		this.seatSocket.onmessage = (event) => {
			console.log(event.data);
			try {
				let myMsg = JSON.parse(event.data);
				//console.log(myMsg.seat);
				//console.log(myMsg.state);
				let sp = document.getElementById(this.elementId);
				//let rs = document.createElement("reserved-seat");
				//rs.setAttribute("id","S13-13");
				//rs.setAttribute("slot","reserved-seat");
				//sp.appendChild(rs);
				let myDoc = sp?.getSVGDocument();
				let seat = myDoc.getElementById(myMsg.seat);
				if(myMsg.state=="pending") {
					seat.style.fill="yellow";
					this.reservedSeats.push(seat);
				} else if(myMsg.state=="nonpending") {
					seat.style.fill="green";
					this.reservedSeats = reservedSeats.filter(e => e!=seat);
				} else if(myMsg.state=="reserved") {
					seat.style.fill="red";
					this.reservedSeats.push(seat);
				}
			} catch (err) {
				if(event.data=="pong")console.log("response received!");
			}
		};
	}

	heartbeat(seatSocket,pingCount) {
		if(!seatSocket) return;
		if(seatSocket.readyState !== 1) return;
		seatSocket.send("ping");
		if(pingCount++===21) location.reload()
		let that = this;
		setTimeout(function() { that.heartbeat(seatSocket,pingCount)},30000);
	}

}

customElements.define('seat-picker',SeatPicker);
