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
    public void createReservation(Reservation r) {
	    resList.add(r);
    }

}
