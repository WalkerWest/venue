package nblc;

public class ReservedSeat {
	public Reservation reservation;
	public Seat seat;
	public String person;
	public ReservedSeat(Reservation r, Seat s,String name) {
		this.reservation = r;
		this.seat = s;
		this.person = name;
	}
}
