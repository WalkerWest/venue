import './style.css'
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
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js"
import "hammerjs/hammer.js";
import '/ReservationSelector.js';
import '/SeatPicker.js';

if(!String.prototype.replaceAll) {
	String.prototype.replaceAll = function(str, newStr) {
		if(Object.prototype.toString.call(str).toLowerCase() === '[object regex]') {
			return this.replace(str,newStr);
		}
		return this.replace(new RegExp(str,'g'),newStr);
	}
}

var myHost = window.location.origin;
var eventsHandler;
var modifyInProgress= false;
var lastEmbed = null;
var lastEventListener = null;
var lastEmbedDiv = null;

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
			document.getElementById("sanctuary-layout").addEventListener('touchmove', function(e){
				e.preventDefault();
			});
		}, destroy: function(){
			this.hammer.destroy()
		}
	}
}

document.querySelector('#app').innerHTML = `
<body xmlns="http://www.w3.org/1999/xhtml">
<ui5-page style="" background-design="Solid">
	<ui5-bar design="Header" slot="header" data-sap-ui-fastnavgroup="true" media-range="XL">
		<ui5-button icon="home" tooltip="Go home" slot="startContent" icon-only="" has-icon=""></ui5-button>
		<ui5-label slot="startContent">NBLC Christmas Tea</ui5-label>
	</ui5-bar>
	<div>
		<ui5-tabcontainer fixed="true" data-sap-ui-fastnavgroup="true" style="" id="tabs">
			<ui5-tab text="User" slot="default-1">
				<ui5-wizard
						content-layout="SingleStep"
						id="wiz-1"
						data-sap-ui-fastnavgroup="true"
						width="0"
						content-height="0">
					<ui5-wizard-step id="step1"
							icon="email" selected=""
							title-text="E-mail"
							slot="default-1">
						<form id="emailAddrForm" 
							action="/rest/emailConfirmation" method="post">
						<ui5-title level="H3">1.&nbsp;&nbsp;E-mail Address</ui5-title>
						<ui5-label wrapping-type="Normal" 
							style="padding-top:10px;padding-bottom:10px;">
						Please enter a valid e-mail address below.  A 
						confirmation code and link will be sent to the address
						for you to begin the registration process.
						</ui5-label>
						<div style="margin-top:10px;margin-left:15px;">
							<ui5-label show-colon="" for="emailAddr" required="">
								E-mail</ui5-label>
							<ui5-input name="emailAddr" id="emailAddr" required="" 
								type="Email" placeholder="Enter your e-mail address">
							</ui5-input>
						</div>
						<div style="padding-top:20px" id="toConfirmDiv">
							<ui5-button design="Emphasized" id="wiz-1-toConfirm" 
								type="Submit">E-mail Code
							</ui5-button>
						</div>
						</form>
						<form id="confirmCodeForm" style="display:none;"
								action="/rest/verifyConfirmCode" method="post">
							<div style="margin-top:10px;margin-left:15px;">
								<ui5-label show-colon="" for="confirmCode" required="">
									Code</ui5-label>
								<ui5-input name="confirmCode" id="confirmCode" required="" 
									type="Number" placeholder="Enter code sent to your e-mail">
								</ui5-input>
							</div>
							<div style="padding-top:20px" id="toStep2Div">
							<ui5-button design="Emphasized" id="wiz-1-toStep2" 
								type="Button">Step 2
							</ui5-button>
							</div>
						</form>
					</ui5-wizard-step>
					<ui5-wizard-step
							id="step2"
							icon="collaborate" disabled=""
							title-text="Party"
							slot="default-2">
						<ui5-title level="H3">2.&nbsp;&nbsp;Party Identification</ui5-title>
						<form id="partyIdForm">
						<div style="margin-top:10px;margin-left:15px;">
							<ui5-label show-colon>Number in Party</ui5-label>
							<ui5-slider min="1" max="18" label-interval="1" 
								show-tickmarks="" show-tooltip="" id="partyNum" 
								style="height:75px;"></ui5-slider>
							<div style="margin-top:10px;margin-left:15px;" id="peopleList">
								<ui5-label required show-colon>Person #1</ui5-label>
								<ui5-input id="person1" placeholder="First and last name"
									required="" 
									style="--_ui5-v1-18-0-input-icons-count: 0;">
								</ui5-input>
							</div>
						</div>
						<div style="padding-top:20px" id="toStep3Div">
						<ui5-button design="Emphasized" id="wiz-2-toStep3" 
							type="Submit">Step 3</ui5-button>
						</div>
						</form>
					</ui5-wizard-step>
					<ui5-wizard-step
							id="step3"
							icon="sys-find" disabled=""
							title-text="Seats"
							slot="default-3">
						<div style="margin-top:15px;" id="userSanctuaryLayoutContainer"></div>
						<div style="margin-top:15px;" id="userPickerDiv"></div>
					</ui5-wizard-step>
					<ui5-wizard-step
							icon="hr-approval" disabled=""
							title-text="Assign"
							slot="default-4">
					</ui5-wizard-step>
					<ui5-wizard-step
							icon="credit-card" disabled=""
							title-text="Payment"
							slot="default-5">
					</ui5-wizard-step>
					<!--<ui5-wizard-step
							icon="decision" disabled=""
							title-text="Confirm"
							slot="default-6">
					</ui5-wizard-step>-->
				</ui5-wizard>
			</ui5-tab>
			<ui5-tab text="Admin" slot="default-2" selected=""> 
				<div> 
					<div>
						<ui5-label for="resSelect" show-colon>Selected Reservation</ui5-label>
						<!--<ui5-select id="resSelect" style="--_ui5-v1-18-0-input-icons-count: 2;">
							<ui5-option selected="">Select One</ui5-option>
							<ui5-option>Add New</ui5-option>
						</ui5-select>-->
						<reservation-selector/>
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
					<div style="margin-top:15px;" id="sanctuaryLayoutContainer">
					</div>
					<div style="margin-top:15px;" id="adminPickerDiv"/>
				</div>
			</ui5-tab>
		</ui5-tabcontainer>
	</div>
</ui5-page>
</body>
`

createNewEmbed("sanctuaryLayoutContainer");

document.getElementById("adminPickerDiv").appendChild(
	Object.assign(document.createElement("seat-picker"), {
		id: "adminPicker"
	})
);

document.getElementById('emailAddrForm').addEventListener('submit',function(event) {
	if(window.location.href.includes(5173)) {
		console.log("Prevent form submission!");
		event.preventDefault();
	}
	var mailAddr = document.getElementById("emailAddr");
	mailAddr.disabled=true;
	document.getElementById("toConfirmDiv").hidden=true;
	document.getElementById("confirmCodeForm").style.display="block";
	console.log("Ready to send an e-mail to "+mailAddr.value+"!");
},false);

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

document.getElementById('partyIdForm').addEventListener('submit',function(event) {
	event.preventDefault();
	document.getElementById("step3").disabled=false;
	document.getElementById("step2").selected=false;
	document.getElementById("step3").selected=true;

	removeEmbed("sanctuaryLayoutContainer");
	document.getElementById("adminPicker")?.setAttribute("activated",0);
	document.getElementById("adminPicker")?.remove();

	createNewEmbed("userSanctuaryLayoutContainer");
	document.getElementById("userPickerDiv").appendChild(
		Object.assign(document.createElement("seat-picker"), {
			id: "userPicker"
		})
	);

},false);


document.getElementById('tabs').addEventListener("tab-select", (e) => {
	if(e.detail.tab.text=='Admin') {
		console.log("Admin tab was clicked");

		removeEmbed("userSanctuaryLayoutContainer");
		document.getElementById("userPicker")?.setAttribute("activated",0);
		document.getElementById("userPicker")?.remove();

		createNewEmbed("sanctuaryLayoutContainer");
		document.getElementById("adminPickerDiv").appendChild(
			Object.assign(document.createElement("seat-picker"), {
				id: "adminPicker"
			})
		);

	} else if(e.detail.tab.text=='User' && document.getElementById("step3").disabled==false) {
		console.log("User tab was clicked");
		removeEmbed("sanctuaryLayoutContainer");
		document.getElementById("adminPicker")?.setAttribute("activated",0);
		document.getElementById("adminPicker")?.remove();

		createNewEmbed("userSanctuaryLayoutContainer");
		document.getElementById("userPickerDiv").appendChild(
			Object.assign(document.createElement("seat-picker"), {
				id: "userPicker"
			})
		);

	}
},false);

document.getElementById('wiz-1').addEventListener("step-change", (e) => {
	if(e.detail.step.titleText=='Seats') {
		console.log("Seats wizard step was clicked!");

		removeEmbed("sanctuaryLayoutContainer");
		createNewEmbed("userSanctuaryLayoutContainer");

		if(document.getElementById("userPicker")==null) {
			document.getElementById("adminPicker")?.setAttribute("activated",0);
			document.getElementById("adminPicker")?.remove();
			document.getElementById("userPickerDiv").appendChild(
				Object.assign(document.createElement("seat-picker"), {
					id: "userPicker"
				})
			);
		}

	}
},false);

function removeEmbed(src) {
	if(lastEmbedDiv==src) {
		console.log("Removing "+src+"; "+lastEmbed.src);
		// Destroy svgpanzoom
		svgPanZoom(lastEmbed).destroy();
		// Remove event listener
		lastEmbed.removeEventListener('load', lastEventListener);
		// Null last event listener
		lastEventListener = null
		// Remove embed element
		document.getElementById(src).removeChild(lastEmbed);
		// Null reference to embed
		lastEmbed = null;
	}
}

function createNewEmbed(src) {
	if(lastEmbedDiv==null || lastEmbedDiv!=src) {
		lastEmbedDiv=src;
		
		var embed = document.createElement('embed');
		embed.setAttribute('style','display: inline; width: 100%; height:100%;');
		embed.setAttribute('id','sanctuary-layout');
		embed.setAttribute('version','1.1');
		embed.setAttribute('src','./sanctuary.svg');
		document.getElementById(src).appendChild(embed);
		lastEventListener = function() {
			setupPinchZoom();
			var panZoom = window.panZoom = svgPanZoom('#sanctuary-layout',{
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
		embed.addEventListener('load',lastEventListener);
		lastEmbed=embed;
	}
}
