package nblc.rest;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import javax.inject.Inject;
import javax.ws.rs.core.MultivaluedMap;

import nblc.*;
import static nblc.TableType.*;

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
        for (int i=0; i<retList.size(); i++) {
            retList.set(i, retList.get(i).clone(da.getReservedSeatIds(retList.get(i))));
        }
        return retList;
    }

    @Path("deleteReservation") @GET
    @Produces(MediaType.APPLICATION_JSON)
    public void deleteReservation(@QueryParam("id") long resId) {
        Logger.getLogger(MyMessage.class.getName()).log(Level.INFO,
                "I will delete "+resId);
        da.deleteReservation(resId);
        return;
    }

    public static List<Table> tables = new ArrayList<Table>() {{

        // parking lot side of sanctuary
        add(new Table( 1,TEN));
        add(new Table( 2,EIGHTEEN));
        add(new Table( 3,TEN));
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
        add(new Table(21,TEN));
        add(new Table(22,TEN));
        add(new Table(23,TEN));
        add(new Table(24,TEN));
        add(new Table(25,TEN));
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
                    int table = Integer.parseInt(matcher.group("table"));
                    int seat = Integer.parseInt(matcher.group("seat"));
                    Logger.getLogger(MyMessage.class.getName()).log(Level.INFO,
                            "Seat "+seat+" at table #"+ table +" reserved for "+
                                    seatHolder+" who ordered "+mealSelect+"!");
                    Seat mySeat = tables.get(table-1).seats[seat-1];
                    ReservedSeat resSeat = new ReservedSeat(
                            newReservation,
                            mySeat,
                            seatHolder,
                            MealType.valueOf(mealSelect)
                    );
                    da.createReservedSeat(resId,table,resSeat);
                }
            }
        }
    }

    @POST
    @Produces(MediaType.TEXT_HTML)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Path("emailConfirmation")
    public void emailConfirmation(
            @FormParam("emailAddr") String emailAddr
    ) {
        Logger.getLogger(MyMessage.class.getName()).log(Level.INFO,
                "Time to send an e-mail to "+emailAddr+"!");
    }

    @POST
    @Produces(MediaType.TEXT_HTML)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Path("verifyConfirmCode")
    public void verifyConfirmCode(
            @FormParam("confirmCode") Long confirmCode
    ) {
        Logger.getLogger(MyMessage.class.getName()).log(Level.INFO,
                "Verify the following code: "+confirmCode+"!");
    }


}

