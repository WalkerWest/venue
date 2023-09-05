package nblc;

import static nblc.TableType.*;
import java.util.List;
import java.util.ArrayList;

public class ChristmasTea {

	public static int seatsTotal(List<Table> tables) {
		int seats=0;
		for(Table t : tables) {
			switch(t.type) {
				case EIGHT: seats+=8; break;
				case FOUR: seats+=4; break;
			}
		}
		return seats;
	}

	public static int seatsLeft(List<Table> tables, List<ReservedSeat> taken) {
		return seatsTotal(tables)-taken.size();
	}

	public static void ListAttendees(List<Table> tables,List<ReservedSeat> seats) {
		System.out.println("----------------------------------------");
		for (Table t : tables) {
			for (Seat s : t.seats) {
				boolean foundSeat=false;
				for (ReservedSeat rs : seats) {
					if(rs.seat==s) {
						System.out.println("Table #"+t.num+", Seat #"+s.number+": "+rs.person);
						foundSeat=true;
						break;
					}
				}
				if(!foundSeat) System.out.println("Table #"+t.num+", Seat #"+s.number+": *** OPEN ***");
			}
			System.out.println("----------------------------------------");
		}
	}

	public static List<ReservedSeat> addReservation(
			List<Table> tables,
			List<ReservedSeat> reserved,
			Reservation r, 
			Seat s,
			String person) throws Exception
	{
		List<ReservedSeat> res = new ArrayList<ReservedSeat>();
		int maxSeats = r.seatQty;
		for(ReservedSeat rs : reserved) {
			res.add(new ReservedSeat(rs.reservation, rs.seat, rs.person));
			if(s==rs.seat)throw new Exception("Seat already taken");
			else if(rs.reservation == r) maxSeats--;
		}
		if(maxSeats<=0) throw new Exception("No seats left in reservation");
		boolean seatReserved=false;
		for(Table t : tables) {
			for(Seat ts : t.seats) {
				if(ts==s) {
					res.add(new ReservedSeat(r,s,person));
					seatReserved=true;
					break;
				}
			}
			if(seatReserved)break;
		}
		return res;
	}


}
