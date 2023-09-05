package nblc;
import static nblc.TableType.*;
import java.util.List;
import java.util.ArrayList;

public class Table {
	public int num;
	public TableType type;
	public Seat[] seats;

	public Table(int q, TableType t) {
		this.num=q;
		this.type=t;
		switch(t) {
			case FOUR: 
				seats = new Seat[4];
				break;
			case EIGHT: 
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
