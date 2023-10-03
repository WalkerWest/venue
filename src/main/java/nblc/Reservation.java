package nblc;

import java.util.List;
import java.util.ArrayList;

import com.google.common.collect.ImmutableList;
import io.hypersistence.tsid.TSID;
import org.javatuples.Pair;
//import java.util.UUID;

public class Reservation implements Cloneable {
	public String name;
	public int seatQty;
	public long reservationId;

	public ImmutableList<String> reservedSeats;

	public String getName() { return name; }

	public Reservation(String person,int seats) {
		this(null,person,seats,null);
	}

	public Reservation(String person,int seats,List<String>seatList) {
		this(null,person,seats,seatList);
	}

	public Reservation(Long resId, String person,int seats) {
		this(resId,person,seats,null);
	}

	public Reservation(Long resId,String person,int seats,List<String>seatList) {
		this.name=person;
		this.seatQty=seats;
		if(resId!=null) this.reservationId = resId;
		else this.reservationId = TSID.fast().toLong();
		if(seatList!=null) this.reservedSeats = ImmutableList.copyOf(seatList);
	}

    @Override
    public Reservation clone() {
		return clone(null);
    }

	public Reservation clone(List<String> sl) {
		try {
			Reservation clone = (Reservation) super.clone();
			clone.reservedSeats = ImmutableList.copyOf(sl);
			// TODO: copy mutable state here, so the clone can't change the internals of the original
			return clone;
		} catch (CloneNotSupportedException e) {
			throw new AssertionError();
		}
	}

}
