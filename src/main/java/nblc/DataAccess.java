package nblc;

import java.util.List;

public interface DataAccess {

    public List<Reservation> getReservations();

    public void createReservation(Reservation r);

    public void createReservedSeat(ReservedSeat rs);

}
