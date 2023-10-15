if(!String.prototype.replaceAll) {
	String.prototype.replaceAll = function(str, newStr) {
		if(Object.prototype.toString.call(str).toLowerCase() === '[object regex]') {
			return this.replace(str,newStr);
		}
		return this.replace(new RegExp(str,'g'),newStr);
	}
}

var eventsHandler;

function tagSvg() {
	console.log("Mutation observed!");
	setupPinchZoom();
	var panZoom = window.panZoom = svgPanZoom('#venue-layout',{
		zoomEnabled: true, controlIconsEnabled: true,
		fit: 1, center: 1, customEventsHandler: eventsHandler
	});
	window.onresize = function() {
		var tryCount=0;
		setTimeout(function() {
			panZoom.resize();
			panZoom.fit();
			panZoom.center();
		},100);
	};
};

function setupPinchZoom() {
	eventsHandler = {
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
			document.getElementById("venue-layout").addEventListener('touchmove', function(e){ e.preventDefault(); });
		}, destroy: function(){
			this.hammer.destroy()
		}
	}
}

var modifyInProgress= false;
//var svgTagged = false;

function testNotify(e) {
	if(!modifyInProgress && document.querySelector('#venue-layout')!=null) {
		modifyInProgress=true;
		setTimeout(function() {
			console.log("Dom modified!");
			modifyInProgress=false;
			//svgTagged=true;
			tagSvg();
		},1000);
	}
}
//window.onload = function() {
var elementToObserve = document.getElementById('app');
elementToObserve.addEventListener('DOMSubtreeModified',testNotify);
//}
//

import { html, render } from './libs/lit-core.min.js';
import { fetchDuke } from './DukeFetcher.js';

class JavaRocks extends HTMLElement{

        constructor() {
                super();
        }

        connectedCallback() {
                const template = html`
                        <h3>Duke rocks</h3>
                        <button @click=${_=>this.onButtonClicked()}>click</button>
                `;
                render(template,this);
                window.addEventListener('duke',e => this.onDukeArrived(e));
        }

		  const template = html`
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
				<ui5-slider min="1" max="18" label-interval="1" 
					show-tickmarks="" show-tooltip="" style="height:75px;"></ui5-slider>
			</div>
			<ui5-table style="margin-block-end: 0.75rem;" data-sap-ui-fastnavgroup="true">
				<ui5-table-column slot="columns" popin-display="Inline">
					<ui5-label>Person&apos;s Name</ui5-label>
				</ui5-table-column>
				<ui5-table-column slot="columns" min-width="450" 
						popin-text="Meal Selection" demand-popin="" popin-display="Inline">
					<ui5-label>Meal Selection</ui5-label>
				</ui5-table-column>
				<ui5-table-column slot="columns" min-width="700" 
						popin-text="Seat" demand-popin="" popin-display="Inline">
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
			<object id="venue-layout" style="display: inline; width: 100%; height:100%;" 
					data="${sanctuary}" version="1.1"/>
			<!--<img src="${sanctuary}" />-->
		</div>
	</div>
</ui5-tab>
`;
}

document.getElementById('emailAddrForm').
addEventListener('submit',function(event) {
	if(window.location.href.includes(5173)) event.preventDefault();
	var mailAddr = document.getElementById("emailAddr");
	mailAddr.disabled=true;
	document.getElementById("toConfirmDiv").hidden=true;
	document.getElementById("confirmCodeForm").style.display="block";
	console.log("Ready to send an e-mail to "+mailAddr.value+"!");
},false);

var myHost = window.location.origin;

document.getElementById("wiz-1-toStep2").onclick = function() {
	var confirmCode = document.getElementById("confirmCode").value;
	console.log("Ready to verify confirmation code "+confirmCode+"!");
	if(window.location.href.includes(5173)) { gotoPanel2(); return; }
	fetch(myHost+'/rest/checkConfirmation?code='+confirmCode).then(response => {
		response.json().then(r2 => {
			if(r2==true) {
				console.log("Code confirmed!");
				gotoPanel2();
			} else {
				console.log(r2);
				console.log("Code denied!");
			}
		});
	});
};

function gotoPanel2() {
	document.getElementById("confirmCode").disabled=true;
	document.getElementById("step2").disabled=false;
	document.getElementById("step1").selected=false;
	document.getElementById("step2").selected=true;
}

var selectedNum = 1;
var partyNum = document.getElementById('partyNum');
partyNum.addEventListener('change',function() {
	console.log("Party number changed to "+partyNum.value);
	while(partyNum.value>selectedNum) {
		console.log('append clone');
		cloneName(); selectedNum++;
	}
	while(partyNum.value<selectedNum) { deleteName(); selectedNum--; }
	selectedNum=Number(partyNum.value);
},false);

function cloneName() {
	var newDiv = document.createElement("div");
	newDiv.setAttribute("id","personDiv"+(Number(selectedNum)+1));

	var myLabel = document.createElement("ui5-label");
	myLabel.setAttribute("show-colon","");
	myLabel.setAttribute("required","");
	myLabel.innerText="Person #"+(Number(selectedNum)+1);

	var myInput = document.createElement("ui5-input");
	myInput.setAttribute("id","person"+(Number(selectedNum)+1));
	myInput.setAttribute("required","");
	myInput.setAttribute("placeholder","First and last name");
	myInput.setAttribute("style","--_ui5-v1-18-0-input-icons-count: 0;");

	newDiv.appendChild(myLabel).insertAdjacentHTML('afterend',"&nbsp;");
	newDiv.appendChild(myInput);
	document.getElementById("peopleList").appendChild(newDiv);
}
function deleteName() {
	document.getElementById("personDiv"+selectedNum).remove();
}

document.getElementById('partyIdForm').
addEventListener('submit',function(event) {
	event.preventDefault();
	document.getElementById("step3").disabled=false;
	document.getElementById("step2").selected=false;
	document.getElementById("step3").selected=true;
},false);
