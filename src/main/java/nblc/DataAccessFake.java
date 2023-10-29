package nblc;

import org.javatuples.Pair;

import java.util.List;
import java.util.ArrayList;

public class DataAccessFake implements DataAccess {

    private List<Reservation> resList = new ArrayList<Reservation>();

    @Override
    public List<Reservation> getReservations() {
	    return resList;
    }

    @Override
    public long createReservation(Reservation r) {
	    resList.add(r);
        return 1L;
    }

    @Override
    public void createReservedSeat(long resId, int tableNo, ReservedSeat rs) { }

    @Override
    public long createReservationTrans(Reservation r, List<Pair<Integer, ReservedSeat>> tableSeatPairs) {
        return 0;
    }

    @Override
    public List<ReservedSeat> getReservedSeats(Reservation r) {
        return null;
    }

    @Override
    public List<String> getReservedSeatIds(Reservation r) {
        return null;
    }

    @Override
    public void deleteReservation(long resId) {

    }

}
