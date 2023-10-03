package nblc;

import java.util.List;

public interface DataAccess {

    public List<Reservation> getReservations();

    public long createReservation(Reservation r);

    public void createReservedSeat(long resId, int tableNo, ReservedSeat rs);

    public List<ReservedSeat> getReservedSeats(Reservation r);

    public List<String> getReservedSeatIds(Reservation r);

}
