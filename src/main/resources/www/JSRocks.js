class JSRocks extends HTMLElement{

	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = "more and more like Java";
	}

}

customElements.define('js-rocks',JSRocks);
