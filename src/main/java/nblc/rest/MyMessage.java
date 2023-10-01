package nblc.rest;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import javax.inject.Inject;
import javax.ws.rs.core.MultivaluedMap;

import nblc.*;
import static nblc.TableType.*;
import static nblc.MealType.*;

import org.glassfish.hk2.api.Immediate;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

    /*
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
        da.createReservation(new Reservation(partyName,partyQty));
        Logger.getLogger(MyMessage.class.getName()).log(Level.INFO,
                "Seat "+seatSelect+" reserved for "+seatHolder+"!");
    }
    */

    List<Table> tables = new ArrayList() {{

        // parking lot side of sanctuary
        add(new Table( 1,TEN));
        add(new Table( 2,EIGHTEEN));
        add(new Table( 4,TEN));
        add(new Table( 5,TEN));
        add(new Table( 6,TEN));
        add(new Table( 7,TEN));
        add(new Table( 8,TEN));
        add(new Table( 9,TEN));
        add(new Table(10,TEN));

        // middle column of tables
        add(new Table(11,EIGHTEEN));
        add(new Table(12,EIGHTEEN));
        add(new Table(13,EIGHTEEN));
        add(new Table(14,EIGHTEEN));
        add(new Table(15,EIGHTEEN));
        add(new Table(16,EIGHTEEN));

        // lake side of sanctuary
        add(new Table(17,TEN));
        add(new Table(18,EIGHTEEN));
        add(new Table(19,TEN));
        add(new Table(20,TEN));
        add(new Table(21,EIGHTEEN));
        add(new Table(22,EIGHTEEN));
        add(new Table(13,EIGHTEEN));
        add(new Table(14,EIGHTEEN));
        add(new Table(15,EIGHTEEN));
    }};

    @POST
    @Produces(MediaType.TEXT_HTML)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Path("postReservation")
    public void postReservationMv(
            MultivaluedMap<String,String> params
    ) {
        String partyName = params.get("partyName").get(0);
        int partyQty = Integer.parseInt(params.get("partyQty").get(0));
        Reservation newReservation = new Reservation(partyName,partyQty);
        long resId = da.createReservation(newReservation);
        for(int i=1; i<19; i++) {
            if(params.containsKey("seatHolder"+i)) {
                String seatSelect =
                        params.get("seatSelect"+i).get(0);
                String mealSelect =
                        params.get("mealSelect"+i).get(0).toUpperCase();
                Pattern pattern = Pattern.
                        compile("^S(?<table>[0-9]+)-(?<seat>[0-9]+)$");
                Matcher matcher = pattern.matcher(seatSelect);
                if(matcher.find()) {
                    String seatHolder = params.get("seatHolder"+i).get(0);
                    Logger.getLogger(MyMessage.class.getName()).log(Level.INFO,
                            "Seat "+matcher.group("seat")+" at table #"+
                                    matcher.group("table")+" reserved for "+
                                    seatHolder+" who ordered "+mealSelect+"!");
                    Seat mySeat = tables.get(
                            Integer.parseInt(matcher.group("table"))-1).
                            seats[Integer.parseInt(matcher.group("seat"))];
                    ReservedSeat resSeat = new ReservedSeat(
                            newReservation,
                            mySeat,
                            seatHolder,
                            MealType.valueOf(mealSelect)
                    );
                }
            }
        }
    }


}

