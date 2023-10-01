package nblc;

import org.junit.Test;
import org.junit.Rule;
import org.junit.rules.ExpectedException;
import static org.junit.Assert.assertEquals;

import static nblc.TableType.*;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

public class MoreTest 
{
    @Rule
    public ExpectedException exceptionRule = ExpectedException.none();

    @Test
    public void verifyDoubleBook() throws Exception {
	    exceptionRule.expect(Exception.class);
	    exceptionRule.expectMessage("Seat already taken");

	    Reservation r1 = new Reservation("West",2);
	    List<Table> tablist = Arrays.asList(new Table[] {
	    	new Table(1, TEN)
	    });
	    List<ReservedSeat> reslist = new ArrayList<ReservedSeat>();
	    
	    reslist = ChristmasTea.addReservation(tablist,reslist,r1,tablist.get(0).seats[0],"Judith");
	    reslist = ChristmasTea.addReservation(tablist,reslist,r1,tablist.get(0).seats[0],"John");
    }

    @Test
    public void verifyReservationEmpty() throws Exception {
	    exceptionRule.expect(Exception.class);
	    exceptionRule.expectMessage("No seats left in reservation");

	    Reservation r1 = new Reservation("West",2);
	    List<Table> tablist = Arrays.asList(new Table[] {
	    	new Table(1, TEN)
	    });
	    List<ReservedSeat> reslist = new ArrayList<ReservedSeat>();
	    
	    reslist = ChristmasTea.addReservation(tablist,reslist,r1,tablist.get(0).seats[0],"Judith");
	    reslist = ChristmasTea.addReservation(tablist,reslist,r1,tablist.get(0).seats[1],"John");
	    reslist = ChristmasTea.addReservation(tablist,reslist,r1,tablist.get(0).seats[2],"Brandi");
    }


}
