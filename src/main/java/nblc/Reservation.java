package nblc;

import java.util.List;
import java.util.ArrayList;

import io.hypersistence.tsid.TSID;
import org.javatuples.Pair;
//import java.util.UUID;

public class Reservation {
	public String name;
	public int seatQty;
	public long reservationId;

	public String getName() { return name; }

	public Reservation(String person,int seats) {
		this.name=person;
		this.seatQty=seats;
		this.reservationId = TSID.fast().toLong();
		//this.reservationId=UUID.randomUUID();
	}
}
