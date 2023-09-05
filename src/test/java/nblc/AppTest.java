package nblc;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

import static nblc.TableType.*;
import java.util.List;
import java.util.ArrayList;

/**
 * Unit test for simple App.
 */
public class AppTest 
    extends TestCase
{
    /**
     * Create the test case
     *
     * @param testName name of the test case
     */
    public AppTest( String testName )
    {
        super( testName );
    }

    /**
     * @return the suite of tests being tested
     */
    public static Test suite()
    {
        return new TestSuite( AppTest.class );
    }

    /**
     * Rigourous Test :-)
     */
    public void testApp()
    {
        assertTrue( true );
    }

    public void testTables() throws Exception {

	    Reservation r1 = new Reservation("West",2);
	    assertTrue (r1.seatQty==2);

	    List<Table> tablist = new ArrayList<Table>();
	    tablist.add(new Table(1,FOUR));
	    tablist.add(new Table(2,EIGHT));
	    tablist.add(new Table(3,FOUR));
	    assertTrue (ChristmasTea.seatsTotal(tablist)==16);

	    List<ReservedSeat> reslist = new ArrayList<ReservedSeat>();
	    reslist = ChristmasTea.addReservation(tablist,reslist,r1,tablist.get(0).seats[0],"Judith");
	    assertTrue (ChristmasTea.seatsLeft(tablist,reslist)==15);
	    reslist = ChristmasTea.addReservation(tablist,reslist,r1,tablist.get(0).seats[1],"Liz");
	    assertTrue (ChristmasTea.seatsLeft(tablist,reslist)==14);

	    Reservation r2 = new Reservation("Reidford",2);
	    assertTrue (r2.seatQty==2);

	    reslist = ChristmasTea.addReservation(tablist,reslist,r2,tablist.get(1).seats[0],"Connie");
	    assertTrue (ChristmasTea.seatsLeft(tablist,reslist)==13);

	    reslist = ChristmasTea.addReservation(tablist,reslist,r2,tablist.get(2).seats[2],"Bernie");
	    assertTrue (ChristmasTea.seatsLeft(tablist,reslist)==12);

	    ChristmasTea.ListAttendees(tablist,reslist);
    }

}
