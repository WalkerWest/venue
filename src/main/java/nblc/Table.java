package nblc;
import java.util.List;

public class Table {
	public int num;
	public TableType type;
	public Seat[] seats;

	public Table(int q, TableType t) {
		this.num=q;
		this.type=t;
		switch(t) {
			case TEN:
				seats = new Seat[4];
				break;
			case EIGHTEEN:
				seats = new Seat[8];
				break;
		}
		for(int i=0; i<seats.length; i++) seats[i]=new Seat(i+1);
	}

	public int seatsLeft(List<ReservedSeat> reserved) {
		int empty=0;
		for(int i=0; i<seats.length; i++) {
			boolean foundSeat = false;
			for (ReservedSeat s : reserved) {
				if(s.seat==seats[i]) foundSeat=true;
			}
			if(!foundSeat) empty++;
		}
		return empty;
	}
}
