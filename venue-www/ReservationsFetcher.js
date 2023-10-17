const fetchReservations = async _ => {
	if(window.location.href.includes(5173)) {
		const reservationsReceived = new CustomEvent('reservationsReceived',{
			detail: {
				payload: [
					{
						"name": "ww82",
						"seatQty": 8,
						"reservationId": 497331375669127300,
						"resIdString": "497331375669127291",
						"reservedSeats": [
							"S14-11",
							"S14-12",
							"S14-13",
							"S14-14",
							"S14-15",
							"S14-16",
							"S14-17",
							"S14-18"
						]
					},
					{
						"name": "ww90",
						"seatQty": 2,
						"reservationId": 499349699018984960,
						"resIdString": "499349699018984988",
						"reservedSeats": [
							"S1-7",
							"S1-8"
						]
					}
				]
			},
			bubbles: true
		});
		window.dispatchEvent(reservationsReceived);
	}
	else {
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
}

export {fetchReservations};
