import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import sanctuary from '/sanctuary.svg'
import { setupCounter } from './counter.js'
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-fiori/dist/Page.js"
import "@ui5/webcomponents-fiori/dist/Bar.js";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import "@ui5/webcomponents-icons-tnt/dist/AllIcons.js";
import "@ui5/webcomponents-icons-business-suite/dist/AllIcons.js";
import "@ui5/webcomponents/dist/TabContainer"
import "@ui5/webcomponents/dist/Tab"
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/Select";
import "@ui5/webcomponents/dist/Option";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents/dist/CardHeader.js";
import "@ui5/webcomponents/dist/Slider";
import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableColumn.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";
import "@ui5/webcomponents-fiori/dist/Wizard.js";
import "svg-pan-zoom/dist/svg-pan-zoom.js";
import "hammerjs/hammer.js";

/*
document.querySelector('#app').innerHTML = `
	<div>
		<a href="https://vitejs.dev" target="_blank">
			<img src="${viteLogo}" class="logo" alt="Vite logo" />
		</a>
		<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
			<img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
		</a>
		<h1>Hello Vite!</h1>
		<div class="card">
			<button id="counter" type="button"></button>
		</div>
		<p class="read-the-docs">
		Click on the Vite logo to learn more
		</p>
	</div>
	<div>
		<ui5-button>Hello UI5 Web Components</ui5-button>
	</div>
`
setupCounter(document.querySelector('#counter'))
*/

if(!String.prototype.replaceAll) {
	String.prototype.replaceAll = function(str, newStr) {
		if(Object.prototype.toString.call(str).toLowerCase() === '[object regex]') {
			return this.replace(str,newStr);
		}
		return this.replace(new RegExp(str,'g'),newStr);
	}
}

window.onload = function() { 
	var eventsHandler;

	eventsHandler = {
	 haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel']
	, init: function(options) {
		var instance = options.instance
		  , initialScale = 1
		  , pannedX = 0
		  , pannedY = 0

		// Init Hammer
		// Listen only for pointer and touch events
		this.hammer = Hammer(options.svgElement, {
		  inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
		})

		// Enable pinch
		this.hammer.get('pinch').set({enable: true})

		// Handle double tap
		this.hammer.on('doubletap', function(ev){
		  instance.zoomIn()
		})

		// Handle pan
		this.hammer.on('panstart panmove', function(ev){
		  // On pan start reset panned variables
		  if (ev.type === 'panstart') {
			 pannedX = 0
			 pannedY = 0
		  }

		  // Pan only the difference
		  instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY})
		  pannedX = ev.deltaX
		  pannedY = ev.deltaY
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
		options.svgElement.addEventListener('touchmove', function(e){ e.preventDefault(); });
	 }

	, destroy: function(){
		this.hammer.destroy()
	 }
	}
	svgPanZoom('#venue-layout',{ 
		zoomEnabled: true, controlIconsEnabled: true,
		fit: 1, center: 1, customEventsHandler: eventsHandler 
	}); 
	$(window).resize(function() {
		panZoom.resize();
		panZoom.fit();
		panZoom.center();
	});
};

document.querySelector('#app').innerHTML = `
<body xmlns="http://www.w3.org/1999/xhtml">
<ui5-page style="" background-design="Solid">
	<ui5-bar design="Header" slot="header" data-sap-ui-fastnavgroup="true" media-range="XL">
		<ui5-button icon="home" tooltip="Go home" slot="startContent" icon-only="" has-icon=""></ui5-button>
		<ui5-label slot="startContent">NBLC Christmas Tea</ui5-label>
	</ui5-bar>
	<div>
		<ui5-tabcontainer fixed="true" data-sap-ui-fastnavgroup="true" style="">
			<ui5-tab text="User" slot="default-1">
				<ui5-wizard
						content-layout="SingleStep"
						id="wiz-1"
						data-sap-ui-fastnavgroup="true"
						width="0"
						content-height="0">
					<ui5-wizard-step
							icon="email"
							title-text="E-mail"
							slot="default-1">
					</ui5-wizard-step>
					<ui5-wizard-step
							icon="collaborate"
							title-text="Party"
							slot="default-2">
					</ui5-wizard-step>
					<ui5-wizard-step
							icon="sys-find"
							title-text="Seats"
							slot="default-3">
					</ui5-wizard-step>
					<ui5-wizard-step
							icon="hr-approval"
							title-text="Assign"
							slot="default-4">
					</ui5-wizard-step>
					<ui5-wizard-step
							icon="credit-card"
							title-text="Payment"
							slot="default-5">
					</ui5-wizard-step>
					<!--<ui5-wizard-step
							icon="decision"
							title-text="Confirm"
							slot="default-6">
					</ui5-wizard-step>-->
				</ui5-wizard>
			</ui5-tab>
			<ui5-tab text="Admin" slot="default-2" selected=""> 
				<div> 
					<div>
						<ui5-label for="resSelect" show-colon>Selected Reservation</ui5-label>
						<ui5-select id="resSelect" style="--_ui5-v1-18-0-input-icons-count: 2;">
							<ui5-option selected="">Select One</ui5-option>
							<ui5-option>Add New</ui5-option>
						</ui5-select>
					</div>
					<ui5-card style="margin-top:15px;">
						<ui5-card-header slot="header" title-text="Add Reservation"></ui5-card-header>
						<div style="margin-top:10px;margin-left:15px;">
							<ui5-label show-colon>Party&apos;s name</ui5-label>
							<ui5-input value="Horner Party" style="--_ui5-v1-18-0-input-icons-count: 0;"></ui5-input>
						</div>
						<div style="margin-top:10px;margin-left:15px;">
							<ui5-label show-colon>Number in Party</ui5-label>
							<ui5-slider min="1" max="18" label-interval="1" show-tickmarks="" show-tooltip="" style="height:75px;"></ui5-slider>
						</div>
						<ui5-table style="margin-block-end: 0.75rem;" data-sap-ui-fastnavgroup="true">
							<ui5-table-column slot="columns" popin-display="Inline">
								<ui5-label>Person&apos;s Name</ui5-label>
							</ui5-table-column>
							<ui5-table-column slot="columns" min-width="450" popin-text="Meal Selection" demand-popin="" popin-display="Inline">
								<ui5-label>Meal Selection</ui5-label>
							</ui5-table-column>
							<ui5-table-column slot="columns" min-width="700" popin-text="Seat" demand-popin="" popin-display="Inline">
								<ui5-label>Seat</ui5-label>
							</ui5-table-column>
							<ui5-table-row slot="default-1">
									<ui5-table-cell slot="default-1">
									<ui5-input value="Name" style="--_ui5-v1-18-0-input-icons-count: 0;"></ui5-input>
									</ui5-table-cell>
									<ui5-table-cell slot="default-2">
									<ui5-select style="--_ui5-v1-18-0-input-icons-count: 2;">
										<ui5-option selected="">Select One</ui5-option>
									</ui5-select>
									</ui5-table-cell>
									<ui5-table-cell slot="default-3">
									<ui5-select style="--_ui5-v1-18-0-input-icons-count: 2;">
										<ui5-option selected="">Select One</ui5-option>
									</ui5-select>
									</ui5-table-cell>
							</ui5-table-row>
					</ui5-card>
					<div style="margin-top:15px;">
						<object id="venue-layout" style="display: inline; width: 100%; height:100%;" data="${sanctuary}" version="1.1"/>
						<!--<img src="${sanctuary}" />-->
					</div>
				</div>
			</ui5-tab>
		</ui5-tabcontainer>
	</div>
</ui5-page>
</body>
`

