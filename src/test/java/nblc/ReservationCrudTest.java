package nblc;

import nblc.rest.MyMessage;
import org.junit.Test;
import org.junit.Rule;
import org.junit.rules.ExpectedException;
import static org.junit.Assert.assertEquals;
import static org.hamcrest.Matchers.contains;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.beans.HasPropertyWithValue.hasProperty;
import java.util.List;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

public class ReservationCrudTest
{
    @Rule
    public ExpectedException exceptionRule = ExpectedException.none();

    @Test
    public void verifyReservationCreate() {
        Reservation r1 = new Reservation("West",2);
        DataAccess da = new DataAccessFake();
        da.createReservation(r1);
        assertThat(da.getReservations(),contains(
           hasProperty("name",is("West"))
        ));
    }

    @Test
    public void testRetrieve() {
	try {
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("uuuuMMddHHmmss");
            LocalDateTime localTime = LocalDateTime.now();
            System.out.println(dtf.format(localTime)); 
            DataAccess da = new DataAccessDerby();		
	    List<Reservation> lr = da.getReservations();
	    System.out.println("Size of list is "+lr.size());
	    for (Reservation r : lr) {
                //System.out.print(r.name);
		//System.out.print(" (");
                //System.out.println(r.reservationId+")");
		List<ReservedSeat> sl = da.getReservedSeats(r);
		for (ReservedSeat s : sl) {
                    String seat = "T"+String.format("%02d",
                        MyMessage.getTable(s.seat))+"-S"+
			String.format("%02d",s.seat.number);
                    /*
                    System.out.print("\tS"+
                        String.format("%02d",MyMessage.getTable(s.seat))+"-"+
			String.format("%02d",s.seat.number));
		    System.out.print(" ");
                    System.out.println(s.person);
                    */
                    System.out.println("\""+r.name+"\",\""+seat+"\",\""+s.person);
                }
	    }

	} catch (Exception ex) { 
            ex.printStackTrace();
	}

    }

}
