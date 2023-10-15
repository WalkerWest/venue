import { html, render } from './libs/lit-core.min.js';
import { fetchDuke } from './DukeFetcher.js';
/*
import {
Button, Page, Bar, TabContainer, Tab, Label, Select, Option, Input,
Card, CardHeader, Slider, Table, TableColumn, TableRow, TableCell,
Wizard, Title
} from './libs/bundle.esm-587a83d6.mjs';
*/

import "./libs/DatePicker.js";

class VenueApp extends HTMLElement{

connectedCallback() {
	/*
	const template = html`
		<h3>Duke rocks</h3>
		<button @click=${_=>this.onButtonClicked()}>click</button>
	`;
	*/
	render(this.template,this);
	window.addEventListener('dukeNew',e => this.onDukeArrived(e));
}

onButtonClicked() {
	fetchDuke();
	console.log('clicked ....');
}

onDukeArrived({ detail }) {
	const {name,age} = detail.payload;
	console.log('=> ',name,age);
}

constructor() {
	super();
	this.template = html`
	<ui5-page style="" background-design="Solid">
		<ui5-bar design="Header" slot="header" data-sap-ui-fastnavgroup="true" media-range="XL">
			<ui5-button icon="home" tooltip="Go home" 
				slot="startContent" icon-only="" has-icon=""></ui5-button>
			<ui5-label slot="startContent">NBLC Christmas Tea</ui5-label>
		</ui5-bar>
		<div>
			<ui5-tabcontainer fixed="true" data-sap-ui-fastnavgroup="true" style="">
			</ui5-tabcontainer>
		</div>
	</ui5-page>
	`;
}

}

customElements.define('venue-app',VenueApp);
