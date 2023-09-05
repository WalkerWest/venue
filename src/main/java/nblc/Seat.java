package nblc;

import java.util.UUID;

public class Seat {
	public int number;
	public UUID seatId;
	public Seat(int n) { 
		this.number = n; 
		this.seatId = UUID.randomUUID();
	}
}
