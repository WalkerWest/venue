const fetchReservations = async _ => {
	const response = await fetch(window.location.origin+'/rest/reservation');
	const reservations = await response.json();
	const reservationsReceived = new CustomEvent('reservationsReceived',{
		detail: {
			payload: reservations
		},
		bubbles: true
	});
	window.dispatchEvent(reservationsReceived);
}

export {fetchReservations};
