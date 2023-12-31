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
import "@ui5/webcomponents/dist/Popover.js";
import {html,render} from "./lit-all.min.js";

if(!String.prototype.replaceAll) {
	String.prototype.replaceAll = function(str, newStr) {
		if(Object.prototype.toString.call(str).toLowerCase() === '[object regex]') {
			return this.replace(str,newStr);
		}
		return this.replace(new RegExp(str,'g'),newStr);
	}
}

var myHost = window.location.origin;

document.querySelector('#app').innerHTML = `
<body xmlns="http://www.w3.org/1999/xhtml">
<style>
ui5-table ui5-table-column.table-header-text-alignment::part(column) {
    text-align: end;
}
</style>
<ui5-page style="" background-design="Solid">
	<ui5-bar design="Header" slot="header" data-sap-ui-fastnavgroup="true" media-range="XL">
		<ui5-button icon="home" tooltip="Go home" slot="startContent" icon-only="" has-icon=""></ui5-button>
		<ui5-label slot="startContent">NBLC Christmas Tea</ui5-label>
	</ui5-bar>
	<div>
		<ui5-tabcontainer fixed="true" data-sap-ui-fastnavgroup="true" style="" id="tabs">
			<ui5-tab text="User" slot="default-1" selected="">
				<ui5-wizard
						content-layout="SingleStep"
						id="wiz-1"
						data-sap-ui-fastnavgroup="true"
						width="0"
						content-height="0">
						
					<!-- ************ STEP #1: E-MAIL ADDRESS ************ -->
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
						<form id="confirmAdminForm" style="display:none;"
								action="/rest/verifyAdminPasswd" method="post">
							<div style="margin-top:10px;margin-left:15px;">
								<ui5-label show-colon="" for="adminPasswd" required="">
									Password</ui5-label>
								<ui5-input name="adminPasswd" id="adminPasswd" required="" 
									type="Password" placeholder="Enter the admin password">
								</ui5-input>
							</div>
							<div style="padding-top:20px" id="toStep2Div">
							<ui5-button design="Emphasized" type="Submit">Logon
							</ui5-button>
							</div>
						</form>
						
					</ui5-wizard-step>
					
					<!-- ************* STEP #2: PARTY IDENT  ************* -->
					<ui5-wizard-step
							id="step2"
							icon="collaborate" disabled=""
							title-text="Party"
							slot="default-2">
						<ui5-title level="H3">2.&nbsp;&nbsp;Party Identification</ui5-title>
						<ui5-label wrapping-type="Normal" 
							style="padding-top:10px;padding-bottom:10px;">
						Choose the number of people in your dinner party.
						Enter first and last names for each attendee in the
						boxes below.
						</ui5-label>
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
						<ui5-button design="Emphasized" id="wiz-1-toStep3" 
							type="Submit">Step 3</ui5-button>
						</div>
						</form>
					</ui5-wizard-step>
					
					<!-- ************** STEP #3: PICK SEATS ************** -->
					<ui5-wizard-step
							id="step3"
							icon="sys-find" disabled=""
							title-text="Seats"
							slot="default-3">
						<ui5-title level="H3">3.&nbsp;&nbsp;Seat Assignment</ui5-title>
						<ui5-label wrapping-type="Normal" 
							style="padding-top:10px;padding-bottom:10px;">
						In the diagram below, red boxes represent seats that
						are taken and green ones represent available seats.  
						As you click green boxes, they change colors and prompt 
						for which attendee is assigned to the seat.
						</ui5-label>
						<div style="width:100%;text-align:right;">
						<ui5-button design="Emphasized" id="wiz-1-toStep4" disabled="" 
							type="Submit">Step 4</ui5-button>
						</div>
						<div style="margin-top:15px;" id="userPickerDiv"></div>
					</ui5-wizard-step>
					
					<!-- ************ STEP #4: MEAL SELECTION ************ -->
					<!-- hr-approval -->
					<ui5-wizard-step
							id="step4"
							icon="meal" disabled=""
							title-text="Meals"
							slot="default-4">
						<ui5-title level="H3">4.&nbsp;&nbsp;Meal Selection</ui5-title>
						<ui5-label wrapping-type="Normal" 
							style="padding-top:10px;padding-bottom:10px;">
						It is time to pick the meal(s).<br>  
						<b>NOTE:</b> Both options are gluten-free.
						<form id="mealForm">
						<div style="margin-top:10px;margin-left:15px;">
							<div style="margin-top:10px;margin-left:15px;" id="mealList">
								<ui5-label required show-colon>Meal #1 (for ...)</ui5-label>
								<ui5-select id="meal1" style="--_ui5-v1-18-0-input-icons-count: 2;">
									<ui5-option value="REGULAR" selected="">Regular</ui5-option>
									<ui5-option value="VEGAN">Vegan/Dairy-Free</ui5-option>
								</ui5-select>
							</div>
						</div>
						<div style="padding-top:20px" id="toStep5Div">
						<ui5-button design="Emphasized" id="wiz-1-toStep5" 
							type="Submit">Step 5</ui5-button>
						</div>
						</form>
						
						</ui5-label>

					</ui5-wizard-step>
					
					<!-- *************** STEP #5: PAYMENT  *************** -->
					<ui5-wizard-step
							id="step5"
							icon="credit-card" disabled=""
							title-text="Payment"
							slot="default-5">
						<ui5-title level="H3">5.&nbsp;&nbsp;Payment</ui5-title>
						<ui5-label wrapping-type="Normal" 
							style="padding-top:10px;padding-bottom:10px;">
						Use the slider below to select the number of "Little
						Ladies" (ages 5-12) that will be attending with the 
						party.  The total due is calculated.  Enter payment
						information in the fields provided.
						</ui5-label>
						<form id="paymentForm">
						<div style="margin-top:10px;margin-left:15px;margin-right:15px;">
							<ui5-label show-colon>"Little Ladies" Attendees</ui5-label>
							<ui5-slider min="0" max="5" label-interval="1" 
								show-tickmarks="" show-tooltip="" id="littleNum" 
								style="height:75px;width:95%;"></ui5-slider>
						</div>
						<ui5-title level="H4">Total Donation</ui5-title>
						<ui5-table>
							<ui5-table-column slot="columns-1" first="">
								<span>Item</span>
							</ui5-table-column>
							<ui5-table-column class="table-header-text-alignment" slot="columns-2">
								<span>Qty</span>
							</ui5-table-column>
							<ui5-table-column class="table-header-text-alignment" slot="columns-3">
								<span>Unit Price</span>
							</ui5-table-column>
							<ui5-table-column class="table-header-text-alignment" slot="columns-4" last="">
								<span>Ext Price</span>
							</ui5-table-column>
							<ui5-table-row slot="default-1">
								<ui5-table-cell slot="default-1">
									<span>Adult attendees</span>
								</ui5-table-cell>
								<ui5-table-cell style="text-align: right" slot="default-2">
									<span id="qtyAdults">2</span>
								</ui5-table-cell>
								<ui5-table-cell style="text-align: right" slot="default-3">
									<span>$15.00</span>
								</ui5-table-cell>
								<ui5-table-cell style="text-align: right" slot="default-4">
									<span id="dollarsAdults">$30.00</span>
								</ui5-table-cell>
							</ui5-table-row>
							<ui5-table-row slot="default-2">
								<ui5-table-cell slot="default-1">
									<span>"Little Ladies"</span>
								</ui5-table-cell>
								<ui5-table-cell style="text-align: right" slot="default-2">
									<span id="qtyLittles">0</span>
								</ui5-table-cell>
								<ui5-table-cell style="text-align: right" slot="default-3">
									<span>$7.00</span>
								</ui5-table-cell>
								<ui5-table-cell style="text-align: right" slot="default-4">
									<span id="dollarsLittles">$0.00</span>
								</ui5-table-cell>
							</ui5-table-row>
						</ui5-table>
						<div style="width:100%;height:100%;">
							<span style="padding-left:16px;float:left;"><b>Total</b></span>
							<span id="grandTotal" style="float:right;padding-right:8px;"><b>$36.00</b></span>
						</div>
						<br>
						<div style="padding-top:20px" id="finalDiv">
						<ui5-button design="Emphasized" id="finalButton" 
							type="Submit">Finalize</ui5-button>
						</div>
						</form>
						<div id="confirmDiv" style="display:none;">
							<ui5-title level="H4">Order Confirmed</ui5-title>
							<ui5-label wrapping-type="Normal" id="confirmLabel"
								style="padding-top:10px;padding-bottom:10px;" >
							Confirmation Number:  
							<b><span id="confirmNumber"></span></b>
							</ui5-label>
						</div>
					</ui5-wizard-step>
					<!--<ui5-wizard-step
							icon="decision" disabled=""
							title-text="Confirm"
							slot="default-6">
					</ui5-wizard-step>-->
				</ui5-wizard>
			</ui5-tab>
			<ui5-tab text="Admin" slot="default-2" disabled=""> 
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
					<div style="margin-top:15px;" id="adminPickerDiv"></div>
				</div>
			</ui5-tab>
		</ui5-tabcontainer>
	</div>
</ui5-page>
<ui5-popover header-text="Assign Seat"
		style="z-index: 110; display: none;" 
		media-range="S" allow-target-overlap="" hide-arrow="" modal="">
	<div class="popover-content">
		<div class="flex-column">
		<ui5-label for="assignee" required="" show-color="">Person</ui5-label>
		<ui5-select id="assignee" style="--_ui5-v1-18-0-input-icons-count: 2;">
		</ui5-select>
		</div>
	</div>
	<div class="footer">
		<div style="flex: 1;"></div>
		<ui5-button id="closePopoverButton" design="Emphasized">
			Assign
		</ui5-button>
	</div>
</ui5-popover>
</body>
`

const PickerType = { ADMIN: 0, USER:1 }
setPicker(PickerType.ADMIN);

document.getElementById("adminPicker").addEventListener('seatSelected',function(e) {
	console.log("Within the picker, the user chose ... "+e.detail.payload.id);
},true);
document.getElementById("adminPicker").addEventListener('seatUnselected',function(e) {
	console.log("Within the picker, the user unclicked  ... "+e.detail.payload.id);
},true);


document.getElementById('emailAddrForm').addEventListener('submit',function(event) {
	if(window.location.href.includes(5173)) {
		console.log("Prevent form submission!");
		event.preventDefault();
	}
	var mailAddr = document.getElementById("emailAddr");
	mailAddr.disabled=true;
	document.getElementById("toConfirmDiv").hidden=true;
	if(mailAddr.value==='admin') {
		event.preventDefault();
		document.getElementById("confirmAdminForm").style.display="block";
		console.log("Prompt for admin password!");
	} else {
		document.getElementById("confirmCodeForm").style.display="block";
		console.log("Ready to send an e-mail to "+mailAddr.value+"!");
	}
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

	if(document.getElementById("userPicker")==null) {
		document.getElementById("adminPicker")?.setAttribute("activated",0);
		document.getElementById("adminPicker")?.remove();
		setPicker(PickerType.USER);
	} else refreshPeoplePicker();
},false);

function refreshPeoplePicker() {
	document.getElementById("userPicker").setAttribute("maxselect",partyNum.value.toString());
	const assigneeSelect = document.getElementById("assignee");
	const personTemplates = [];
	for(var i=1; i<=partyNum.value; i++) {
		var foundEntry=false;
		seatAssignments.forEach(function(assign) {
			if(assign.personId==='optPerson'+i.toString()) {
				assign.person.innerText=document.getElementById('person' + i.toString()).value;
				personTemplates.push(assign.person);
				foundEntry=true;
			}
		});
		if(!foundEntry)	personTemplates.push(html`<ui5-option id="${'optPerson'+i.toString()}">${document.getElementById('person' + i.toString()).value}</ui5-option>`);
	}
	render(html`${personTemplates}`,assigneeSelect);
	if(seatAssignments.length==Number(document.getElementById("userPicker").getAttribute("maxselect")))
		document.getElementById("wiz-1-toStep4").disabled=false;
	else document.getElementById("wiz-1-toStep4").disabled=true;
	document.getElementById("userPicker").setAttribute("activated","2");
}

document.getElementById('tabs').addEventListener("tab-select", (e) => {
	if(e.detail.tab.text=='Admin') {
		console.log("Admin tab was clicked");
		if(document.getElementById("adminPicker")==null) {
			console.log("Admin picker is null");
			document.getElementById("userPicker")?.setAttribute("activated",0);
			document.getElementById("userPicker")?.remove();
			setPicker(PickerType.ADMIN);
		}
	} else if(e.detail.tab.text=='User' && document.getElementById("step3").selected==true) {
		console.log("User tab was clicked");
		if(document.getElementById("userPicker")==null) {
			console.log("User picker is null");
			document.getElementById("adminPicker")?.setAttribute("activated",0);
			document.getElementById("adminPicker")?.remove();
			setPicker(PickerType.USER);
		}

	}
},false);

document.getElementById('wiz-1').addEventListener("step-change", (e) => {
	if(e.detail.step.titleText==='Seats') {
		console.log("Seats wizard step was clicked!");
		if(document.getElementById("userPicker")==null) {
			document.getElementById("adminPicker")?.setAttribute("activated",0);
			document.getElementById("adminPicker")?.remove();
			setPicker(PickerType.USER);
		} else refreshPeoplePicker();
	}
	else if(document.getElementById("step3").disabled===false && e.detail.step.titleText==='Party') {
		document.getElementById("step3").disabled=true;
		document.getElementById("step4").disabled=true;
		document.getElementById("step5").disabled=true;
	}
},false);

var seatAssignments=[];
function setPicker(pickerType) {
	switch(pickerType) {
		case PickerType.ADMIN:
			let adminPicker = Object.assign(document.
				createElement("seat-picker"), {id: "adminPicker"});
			document.getElementById("adminPickerDiv").appendChild(adminPicker);
			adminPicker.setAttribute("maxselect","1");
			break;
		case PickerType.USER:
			seatAssignments = [];
			for(const child of document.getElementById("assignee").children) {
				child.disabled=false;
			}
			let userPicker = Object.assign(document.
				createElement("seat-picker"), {id: "userPicker"});
			document.getElementById("userPickerDiv").appendChild(userPicker);
			userPicker.setAttribute("maxselect",partyNum.value.toString());

			const assigneeSelect = document.getElementById("assignee");
			const personTemplates = [];
			for(var i=1; i<=partyNum.value; i++) {
				personTemplates.push(html`<ui5-option id="${'optPerson'+i.toString()}">${document.getElementById('person' + i.toString()).value}</ui5-option>`);
			}
			render(html`${personTemplates}`,assigneeSelect);

			document.getElementById("userPicker").addEventListener('seatSelected',function(e) {
				let popover = document.querySelector("ui5-popover");
				let popoverCloser = document.getElementById("closePopoverButton");
				let popoverOpener = document.getElementById('userPickerDiv');
				let selectedSeat = e.detail.payload;
				popover.showAt(popoverOpener);
				popoverCloser.onclick = _ => {
					const assigneeSelect = document.getElementById("assignee");
					seatAssignments.push({
						"seatId":selectedSeat.id,
						"personId": assigneeSelect.selectedOption.id,
						"personName":assigneeSelect.selectedOption.innerText,
						"seat":selectedSeat,
						"person":assigneeSelect.selectedOption
					});
					console.log('Assigned '+selectedSeat.id+' to '+assigneeSelect.selectedOption.innerText);
					document.getElementById(assigneeSelect.selectedOption.id).disabled=true;
					if(seatAssignments.length==Number(document.getElementById("userPicker").getAttribute("maxselect")))
						document.getElementById("wiz-1-toStep4").disabled=false;
					else document.getElementById("wiz-1-toStep4").disabled=true;
					popover.close();
				};
			},true);
			document.getElementById("userPicker").addEventListener('seatUnselected',function(e) {
				seatAssignments.forEach(function(assign) {
					if(assign.seat===e.detail.payload) {
						document.getElementById(assign.person.id).disabled=false;
						seatAssignments.splice(seatAssignments.indexOf(assign),1);
						console.log('Seat '+assign.seat.id+' is open; '+assign.person.innerText+' needs a seat!');
					}
				});
			},true);

			break;
	}
}

var mealListRendered=false;
var mealTemplates = [];

document.getElementById("wiz-1-toStep4").onclick = function() {
	document.getElementById("step3").selected=false;
	document.getElementById("step4").disabled=false;
	document.getElementById("step4").selected=true;
	const mealDiv = document.getElementById("mealList");
	if(!mealListRendered) {
		while(mealDiv.firstChild) mealDiv.removeChild(mealDiv.lastChild);
		// mealDiv.innerHTML="";
		mealListRendered=true;
	}
	console.log("The selectedNum is "+selectedNum);
	while(mealTemplates.length>0) mealTemplates.pop();
	for(let i=1; i<=selectedNum; i++) {
		console.log("The i var is "+i);
		mealTemplates.push(html`
			<div>
			<ui5-label required show-colon>${
			'Meal #'+i.toString()+' (for '+
			document.getElementById('person' + i.toString()).value+')'}
			</ui5-label>
			<ui5-select id="${'meal'+i.toString()}" style="--_ui5-v1-18-0-input-icons-count: 2;">
				<ui5-option value="REGULAR" selected="">Regular</ui5-option>
				<ui5-option value="VEGAN">Vegan/Dairy-Free</ui5-option>
			</ui5-select>
			</div>
			`);
	}
	render(html`${mealTemplates}`,mealDiv);
};

document.getElementById('mealForm').addEventListener('submit',function(event) {
	event.preventDefault();
});

var totalAdults=0;

document.getElementById("wiz-1-toStep5").onclick = function() {
	document.getElementById("step4").selected=false;
	document.getElementById("step5").disabled=false;
	document.getElementById("step5").selected=true;
	document.getElementById("qtyAdults").innerText=selectedNum.toString();
	let USDollar = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});
	totalAdults=selectedNum*15;
	document.getElementById("dollarsAdults").innerText=USDollar.format(totalAdults);
	document.getElementById("grandTotal").innerText=USDollar.format(totalAdults+totalLittles);
};

var littles = 1;
var littleNum = document.getElementById('littleNum');
var totalLittles=0;

littleNum.addEventListener('change',function() {
	console.log("Littles number changed to "+littleNum.value);
	littles=Number(littleNum.value);
	document.getElementById("qtyLittles").innerText=littles.toString();
	let USDollar = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});
	totalLittles = littles*7;
	document.getElementById("dollarsLittles").innerText=USDollar.format(totalLittles);
	document.getElementById("grandTotal").innerText=USDollar.format(totalAdults+totalLittles);
},false);

var alreadySubmitted=false;

document.getElementById('paymentForm').addEventListener('submit',function(event) {
	event.preventDefault();
	if(!alreadySubmitted) {
		let registration={};
		const form = document.createElement('form');
		form.method="post";
		form.action="/rest/postReservation";

		registration.partyName=document.getElementById("emailAddr").value;
		form.appendChild(Object.assign(document.createElement("input"), {
			type: "hidden",
			name: "partyName",
			value: registration.partyName
		}));

		registration.partyQty=document.getElementById('partyNum').value;
		form.appendChild(Object.assign(document.createElement("input"), {
			type: "hidden",
			name: "partyQty",
			value: registration.partyQty
		}));

		for(let i=1; i<=Number(registration.partyQty); i++) {

			registration['seatHolder'+i.toString()]=document.getElementById('person' + i.toString()).value;
			form.appendChild(Object.assign(document.createElement("input"), {
				type: "hidden",
				name: 'seatHolder'+i.toString(),
				value: registration['seatHolder'+i.toString()]
			}));

			registration['mealSelect'+i.toString()]=document.getElementById('meal' + i.toString()).selectedOption.value;
			form.appendChild(Object.assign(document.createElement("input"), {
				type: "hidden",
				name: 'mealSelect'+i.toString(),
				value: registration['mealSelect'+i.toString()]
			}));

			seatAssignments.forEach(function(assign) {
				if (assign.personId === 'optPerson' + i.toString()) {
					registration['seatSelect' + i.toString()] = assign.seatId;
					form.appendChild(Object.assign(document.createElement("input"), {
						type: "hidden",
						name: 'seatSelect' + i.toString(),
						value: registration['seatSelect' + i.toString()]
					}));
				}
			});
		}
		console.log(registration);
		document.body.appendChild(form);
		if(!window.location.href.includes(5173)) form.submit();
		document.getElementById("step1").disabled=true;
		document.getElementById("step2").disabled=true;
		document.getElementById("step3").disabled=true;
		document.getElementById("step4").disabled=true;
		littleNum.disabled=true;
		document.getElementById("finalButton").hidden=true;
		document.getElementById("confirmDiv").style.display="block";
		document.getElementById("confirmNumber").innerText=document.getElementById("confirmCode").value;
	}
});

document.getElementById('confirmAdminForm').addEventListener('submit',function(event) {
	event.preventDefault();
	console.log("Check password");
	let passwd = document.getElementById("adminPasswd").value;
	if(window.location.href.includes(5173)) {
		window.location = "admin.html";
	}
	else {
		fetch(myHost+'/rest/checkAdminPassword?passwd='+passwd).then(response => {
			response.json().then(r2 => {
				if(r2==true) {
					console.log("Password confirmed!");
					window.location = "admin.html";
					//gotoPanel2();
				} else {
					console.log(r2);
					console.log("Access denied!");
				}
			});
		});

	}
});



