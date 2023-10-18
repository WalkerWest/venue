import { html, render, repeat} from './lit-all.min.js';
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
	}

	connectedCallback() {
		window.addEventListener('seatsReceived', e => this.onSeatsReceived(e));
		fetchSeats();
				console.log("Seat picker (new) just got connected for "+this.elementId+"!");
				const template = html`
					<embed style="display: inline; width: 100%; height: 100%;"
						id=${this.elementId} version="1.1" src="./sanctuary.svg"
						@load=${_=>this.onEmbedLoad()}>
				`;
				render(template,this);
	}

	static observedAttributes = ["activated","id"];

	attributeChangedCallback(name, oldValue, newValue) {
		console.log("Attribute "+name+" was changed!");
		if(name=="activated" && this.elementId!=null) {
			if(newValue==1 && oldValue!=1) {
				console.log("Seat picker (new) just got activated for "+this.elementId+"!");
				const template = html`
					<embed style="display: inline; width: 100%; height: 100%;"
						id=${this.elementId} version="1.1" src="./sanctuary.svg"
						@load=${_=>this.onEmbedLoad()}>
				`;
				render(template,this);
			} else if(newValue==0 && oldValue!=0) { 
				console.log("Seat picker (new) just got deactivated for "+this.elementId+"!");
				var lastEmbed = document.getElementById(this.elementId);
				svgPanZoom('#'+this.elementId).destroy();
				window.removeEventListener('resize', this.onWinResize,true);
			}
		}
		else if(name=="id") {
			this.elementId=this.getAttribute("id")+"Svg";
			console.log("The picker's id is "+this.elementId);
		}
		else console.log("Attribute "+name+" was changed!");
	}

	disconnectedCallback() {
		console.log("Seat picker (new) just got disconnected for "+this.elementId+"!");
		//document.getElementById(this.elementId.slice(0,-3)).
		//	removeChild(lastEmbed);
	}

	onEmbedLoad() {
		if(this.elementId!=null) {
			this.setupPinchZoom();
			var panZoom = window.panZoom = svgPanZoom('#'+this.elementId,{
				zoomEnabled: true, controlIconsEnabled: true,
				fit: 1, center: 1, customEventsHandler: this.eventsHandler
			});
			this.onWinResize = function() {
				var tryCount=0;
				setTimeout(function() {
					panZoom.resize();
					panZoom.fit();
					panZoom.center();
				},100);
			};
			window.addEventListener('resize', this.onWinResize, true);
		}
	}

	onSeatsReceived({detail}) {
		console.log("Got seats!");
		const itemTemplates = [];
		/*
		for(var i=0; i<detail.payload.length; i++) {
			itemTemplates.push(html`<ui5-option>${detail.payload[i].name}</ui5-option>`);
		}
		const template = html`
			<ui5-select id="resSelect" style="--_ui5-v1-18-0-input-icons-count: 2;">
				<ui5-option selected="">Select One</ui5-option>
				<ui5-option>Add New</ui5-option>
				${itemTemplates}
			</ui5-select>
		`;
		render(template,this);
		*/
		console.log(detail);
	}

	setupPinchZoom() {
		this.eventsHandler = {
			haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel']
			, init: function(options) {
				var instance = options.instance, initialScale = 1, pannedX = 0, pannedY = 0

				// Init Hammer
				// Listen only for pointer and touch events
				this.hammer = Hammer(options.svgElement, {
					inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
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
						instance.zoomAtPoint(initialScale * ev.scale, {x: ev.center.x, y: ev.center.y})
					}
					instance.zoomAtPoint(initialScale * ev.scale, {x: ev.center.x, y: ev.center.y})
				})

				// Prevent moving the page on some devices when panning over SVG
				document.getElementById("sanctuary-layout").addEventListener('touchmove', function(e){
					e.preventDefault();
				});
			}, destroy: function(){
				this.hammer.destroy()
			}
		}
	}
}

customElements.define('seat-picker',SeatPicker);
