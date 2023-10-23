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
	}

	static observedAttributes = ["maxselect","activated","id"];

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
		else console.log("Attribute "+name+" was changed!");
	}

	disconnectedCallback() {
		console.log("Seat picker (new) just got disconnected for "+
			this.elementId+"!");
	}

	onEmbedUnload() { console.log("Unloading "+this.elementId); }

	onSlotChange(e) {
		console.log("Reserved seat added to slot!");
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
								else seat.style.fill = "green";
							}
							seat.addEventListener("click",p.seatClicked);
						}
					}
				}
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
		} else if (this.selectedSeats.includes(seat)) {
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
		}
		//console.log('selectedSeat array: '+this.selectedSeats);
	}

}

customElements.define('seat-picker',SeatPicker);
