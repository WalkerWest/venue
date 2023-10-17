const fetchSeats = async _ => {
	if(window.location.href.includes(5173)) {
		const seatsReceived = new CustomEvent('seatsReceived',{
			detail: {
				payload: ["S1-1","S1-2"]
			},
			bubbles: true
		});
		window.dispatchEvent(seatsReceived);
	} else {
		const response = await fetch(window.location.origin+'/rest/reservedSeats');
		const seats = await response.json();
		const seatsReceived = new CustomEvent('seatsReceived',{
			detail: {
				payload: seats
			},
			bubbles: true
		});
		window.dispatchEvent(seatsReceived);
	}
}

export {fetchSeats};
