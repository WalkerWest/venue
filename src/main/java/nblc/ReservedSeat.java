package nblc;

public class ReservedSeat {
	public Reservation reservation;
	public Seat seat;
	public String person;

	public MealType meal;

	public ReservedSeat(Reservation r, Seat s,String name,MealType m) {
		this.reservation = r;
		this.seat = s;
		this.person = name;
		this.meal = m;
	}
}
