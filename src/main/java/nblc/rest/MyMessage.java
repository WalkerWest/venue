package nblc.rest;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import javax.inject.Inject;
import nblc.DataAccess;
import nblc.Reservation;
import org.glassfish.hk2.api.Immediate;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Path("") @Immediate
public class MyMessage {

    @Inject
    private DataAccess da;

    @Path("msg") @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getMessage() { return "My message\n"; }

    @Path("reservation") @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Reservation> getReservation() {
        List<Reservation> retList = da.getReservations();
        //retList.add(new Reservation("Walker",4));
        Logger.getLogger(MyMessage.class.getName()).log(Level.INFO,
                "Serving: "+retList.get(0).reservationId);
        //da.getReservations();
        return retList;
    }

    @POST
    @Produces(MediaType.TEXT_HTML)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Path("postReservation")
    public void postReservation(
        @FormParam("partyName") String partyName,
        @FormParam("seatSelect") String seatSelect,
        @FormParam("partyQty") int partyQty,
        @FormParam("seatHolder") String seatHolder,
        @FormParam("mealSelect") String mealSelect
    ) {
        Logger.getLogger(MyMessage.class.getName()).log(Level.INFO,
                "Seat "+seatSelect+" reserved for "+seatHolder+"!");
    }

}

