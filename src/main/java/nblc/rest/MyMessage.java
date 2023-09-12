package nblc.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import javax.inject.Inject;
import nblc.DataAccess;
import nblc.Reservation;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.glassfish.hk2.api.Immediate;

import java.util.ArrayList;
import java.util.List;

@Path("") @Immediate
public class MyMessage {

    private static Logger logger = LogManager.getLogger(MyMessage.class);

    @Inject
    private DataAccess da;

    @Path("msg") @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getMessage() { return "My message\n"; }

    @Path("reservation") @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Reservation> getReservation() {
        var retList = new ArrayList<Reservation>();
        retList.add(new Reservation("Walker",4));
        da.getReservations();
        return retList;
    }

}

