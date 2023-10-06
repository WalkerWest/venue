package nblc;

import org.junit.Test;
import org.junit.Rule;
import org.junit.rules.ExpectedException;
import static org.junit.Assert.assertEquals;
import static org.hamcrest.Matchers.contains;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.beans.HasPropertyWithValue.hasProperty;

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

}
