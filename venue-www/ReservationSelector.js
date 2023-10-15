import {html,render,repeat} from './lit-all.min.js';
import { fetchReservations } from './ReservationsFetcher.js';

class ReservationSelector extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		window.addEventListener('reservationsReceived', e => this.onReservationsReceived(e));
		fetchReservations();
	}

	onReservationsReceived({detail}) {
		console.log("Got reservations!");
		const itemTemplates = [];
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
		console.log(detail);
	}
}

customElements.define('reservation-selector',ReservationSelector);
