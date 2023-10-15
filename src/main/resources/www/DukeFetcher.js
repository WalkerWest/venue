const fetchDuke = async _ => {
	const response = await fetch('duke.json');
	const duke = await response.json();
	console.log('loaded from server',duke);
	const dukeEvent = new CustomEvent('duke',{
		detail: {
			payload: duke
		},
		bubbles: true
	});
	window.dispatchEvent(dukeEvent);
}
export { fetchDuke };
