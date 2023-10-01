package nblc;

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
    public void createReservedSeat(ReservedSeat rs) {

    }

}
