package nblc;

import java.util.List;
import java.util.ArrayList;
import org.javatuples.Pair;
import java.util.UUID;

public class Reservation {
	public String name;
	public int seatQty;
	public UUID reservationId;

	public Reservation(String person,int seats) {
		this.name=person;
		this.seatQty=seats;
		this.reservationId=UUID.randomUUID();
	}
}
