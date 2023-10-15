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

	onButtonClicked() {
		fetchDuke();
		console.log('clicked ....');
	}

	onDukeArrived({ detail }) {
		const {name,age} = detail.payload;
		console.log('=> ',name,age);
	}

}

customElements.define('java-rocks',JavaRocks);
