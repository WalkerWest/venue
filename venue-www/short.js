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
		<ui5-wizard
				content-layout="SingleStep"
				id="wiz-1"
				data-sap-ui-fastnavgroup="true"
				width="0"
				content-height="0">
				
			<!-- ************** STEP #3: PICK SEATS ************** -->
			<ui5-wizard-step
					id="step3"
					icon="sys-find" disabled=""
					title-text="Seats"
					slot="default-3">
				<ui5-title level="H3">Pick Your Seats</ui5-title>
				<ui5-label wrapping-type="Normal" 
					style="padding-top:10px;padding-bottom:10px;">
				In the diagram below, red boxes represent seats that
				are taken and green ones represent available seats.  
				As you click green boxes, they change colors and prompt 
				for which attendee is assigned to the seat.
				</ui5-label>
				<ui5-label wrapping-type="Normal" 
					style="padding-top:10px;padding-bottom:20px;">
				Please only choose seats for adults that you registered 
				and do not include "Little Ladies."
				</ui5-label>
				
				<form id="paymentForm">
				<ui5-label required show-colon>Party Identification</ui5-label>
				<ui5-input id="partyId" placeholder="Horner Party of 5"
					required="" 
					style="--_ui5-v1-18-0-input-icons-count: 0;">
				</ui5-input>
				<div style="width:100%;text-align:right;" id="finalDiv">
				<ui5-button design="Emphasized" id="finalButton" disabled="" 
					type="Submit">Finalize</ui5-button>
				</div>
				</form>
				<div id="confirmDiv" style="width:100%;text-align:right;display:none;">
					<ui5-title level="H4">Seats booked!</ui5-title>
				</div>
				<div style="margin-top:15px;" id="userPickerDiv"></div>
			</ui5-wizard-step>
		</ui5-wizard>
	</div>
</ui5-page>
<ui5-popover header-text="Assign Seat"
		style="z-index: 110; display: none;" 
		media-range="S" allow-target-overlap="" hide-arrow="" modal="">
	<div class="popover-content">
		<div class="flex-column">
		<ui5-label for="assignee" required="" show-color="">Person</ui5-label>
		<ui5-input id="assignee" placeholder="First and last name"></ui5-input>
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
setPicker(PickerType.USER);

var seatAssignments=[];
function setPicker(pickerType) {
	switch(pickerType) {
		case PickerType.USER:
			seatAssignments = [];
			for(const child of document.getElementById("assignee").children) {
				child.disabled=false;
			}
			let userPicker = Object.assign(document.
				createElement("seat-picker"), {id: "userPicker"});
			document.getElementById("userPickerDiv").appendChild(userPicker);
			userPicker.setAttribute('maxselect','18');

			document.getElementById("userPicker").addEventListener('seatSelected',function(e) {
				let popover = document.querySelector("ui5-popover");
				let popoverCloser = document.getElementById("closePopoverButton");
				let popoverOpener = document.getElementById('userPickerDiv');
				let selectedSeat = e.detail.payload;
				popover.showAt(popoverOpener);
				popoverCloser.onclick = _ => {
					let assignee = document.getElementById('assignee');
					seatAssignments.push({
						"seatId":selectedSeat.id,
						"personName":assignee.value,
						"seat":selectedSeat
					});
					console.log('Assigned '+selectedSeat.id+' to '+assignee.value);
					assignee.value="";

					if(seatAssignments.length>=1)
						document.getElementById("finalButton").disabled=false;
					else document.getElementById("finalButton").disabled=true;
					popover.close();
				};
			},true);
			document.getElementById("userPicker").addEventListener('seatUnselected',function(e) {
				seatAssignments.forEach(function(assign) {
					if(assign.seat===e.detail.payload) {
						seatAssignments.splice(seatAssignments.indexOf(assign),1);
						console.log('Seat '+assign.seat.id+' is open; '+assign.personName+' needs a seat!');
					}
				});
				if(seatAssignments.length>=1)
					document.getElementById("finalButton").disabled=false;
				else document.getElementById("finalButton").disabled=true;
			},true);

			break;
	}
}

var alreadySubmitted=false;
document.getElementById('paymentForm').addEventListener('submit',function(event) {
	event.preventDefault();
	if(!alreadySubmitted) {
		let registration={};
		const form = document.createElement('form');
		form.method="post";
		form.action="/rest/postReservation";

		registration.partyName=document.getElementById("partyId").value;
		form.appendChild(Object.assign(document.createElement("input"), {
			type: "hidden",
			name: "partyName",
			value: registration.partyName
		}));

		registration.partyQty=seatAssignments.length;
		form.appendChild(Object.assign(document.createElement("input"), {
			type: "hidden",
			name: "partyQty",
			value: registration.partyQty
		}));

		let i = 1;
		seatAssignments.forEach(function(assign) {
			registration['seatHolder'+i.toString()]=assign.personName;
			form.appendChild(Object.assign(document.createElement("input"), {
				type: "hidden",
				name: 'seatHolder'+i.toString(),
				value: registration['seatHolder'+i.toString()]
			}));
			registration['seatSelect' + i.toString()] = assign.seatId;
			form.appendChild(Object.assign(document.createElement("input"), {
				type: "hidden",
				name: 'seatSelect' + i.toString(),
				value: registration['seatSelect' + i.toString()]
			}));
			registration['mealSelect'+i.toString()]='REGULAR';
			form.appendChild(Object.assign(document.createElement("input"), {
				type: "hidden",
				name: 'mealSelect'+i.toString(),
				value: registration['mealSelect'+i.toString()]
			}));
			i++;
		});

		console.log(registration);
		document.body.appendChild(form);
		if(!window.location.href.includes(5173)) form.submit();
		document.getElementById("finalButton").hidden=true;
		document.getElementById("confirmDiv").style.display="block";
		document.getElementById("partyId").disabled=true;
		/*document.getElementById("confirmNumber").innerText=document.getElementById("confirmCode").value;*/
	}
});


