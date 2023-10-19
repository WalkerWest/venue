import { html, render } from './lit-all.min.js';
import { fetchSeats } from './SeatFetcher.js';

class SeatPicker extends HTMLElement {

	constructor() {
		super();
		this.eventsHandler=[];
		if(this.getAttribute("id")!=null) {
			this.elementId=this.getAttribute("id")+"Svg";
			console.log("The picker's id is "+this.elementId);
		}
		else this.elementId=null;
		this.onWinResize = function() {};
		this.initialized=false;
		this.seatsListener=null;
	}

	connectedCallback() {
		console.log("Seat picker (new) just got connected for "+this.elementId+"!");

		var div = document.createElement('div');
		div.setAttribute("slot","venue-layout")
		div.innerHTML =`<embed style="display: inline; width: 100%; height: 100%;"
				id=${this.elementId} version="1.1" src="./sanctuary.svg"/>`;
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

	static observedAttributes = ["activated","id"];

	attributeChangedCallback(name, oldValue, newValue) {
		console.log("Attribute "+name+" was changed!");
		if(name=="activated" && this.elementId!=null) {
			if(newValue==1 && oldValue!=1) {
				console.log("Seat picker (new) just got activated for "+
					this.elementId+"!");
				/*
				const template = html`
					<embed style="display: inline; width: 100%; height: 100%;"
						id=${this.elementId} version="1.1" src="./sanctuary.svg"
						@load=${_=>this.onEmbedLoad()}
						@unload=${_=>this.onEmbedUnload()}>
				`;
				render(template,this);
				*/
			} else if(newValue==0 && oldValue!=0) {
				console.log("Seat picker (new) just got deactivated for "+
					this.elementId+"!");
				svgPanZoom('#'+this.elementId).destroy();
				window.removeEventListener('resize',
					this.onWinResize,true);
				window.removeEventListener('seatsReceived',
					this.seatsListener, true);
			}
		}
		else if(name=="id" && oldValue==null) {
			this.elementId=this.getAttribute("id")+"Svg";
			console.log("The picker's id is "+this.elementId);
			this.seatsListener=this.outerSeatsReceived(this.elementId);
			window.addEventListener('seatsReceived',
				this.seatsListener,true);
		}
		else console.log("Attribute "+name+" was changed!");
	}

	disconnectedCallback() {
		console.log("Seat picker (new) just got disconnected for "+
			this.elementId+"!");
	}

	onEmbedUnload() {
		console.log("Unloading "+this.elementId);
	}

	onSlotChange(e) {
		console.log("Reserved seat added to slot!");
	}

	onEmbedLoad() {
		if(this.elementId!=null) {
			if(this.initialized) {
				console.log("Re-executing onEmbed load for "+this.elementId);
				window.removeEventListener('resize', this.onWinResize,true);
				svgPanZoom('#'+this.elementId).destroy();
			}
			console.log("Enhancing svg for "+this.elementId);
			this.setupPinchZoom(this.elementId);
			console.log("Pinch zoom finished");
			var panZoom = window.panZoom = svgPanZoom('#'+this.elementId,{
				zoomEnabled: true, controlIconsEnabled: true,
				fit: 1, center: 1, customEventsHandler: this.eventsHandler
			});
			console.log("Pan zoom finished");
			this.onWinResize = function() {
				var tryCount=0;
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

	outerSeatsReceived = function(myElement) {
		return function	onSeatsReceived(event) {
			console.log("Got seats!");
			const itemTemplates = [];
			const detail=event.detail;
			console.log(detail);
			console.log("Attempting to lookup "+myElement);
			setTimeout(function(myParam) {
				console.log("Attempting to lookup "+myParam);
				const myEle=document.getElementById(myParam);
				const myDoc = myEle?.getSVGDocument();
				if(myEle == null) {
					//console.log(this.elementId);
					console.log("Couldn't retrieve SVG");
					console.log(document.getFirstElementChild);
					console.log(document);
				}
				for(var t=1; t<30; t++) {
					for (var s = 1; s < 20; s++) {
						var seatString = 'S' + t + '-' + s;
						if (myDoc?.getElementById(seatString) != null) {
							var seat = myDoc?.getElementById(seatString);
							if(seat!=null) seat.style.fill = "green";
						}
					}
				}
			}.bind(null, myElement),10);
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
				this.hammer.destroy()
			}
		}
	}
}

customElements.define('seat-picker',SeatPicker);
