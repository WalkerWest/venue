package nblc;

import com.google.gson.Gson;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.StatusCode;
import org.eclipse.jetty.websocket.api.WebSocketAdapter;
import org.eclipse.jetty.websocket.api.WebSocketException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.CountDownLatch;

public class MessagingAdapter extends WebSocketAdapter {

    private static Logger logger = LogManager.getLogger(App.class);
    private final CountDownLatch closureLatch = new CountDownLatch(1);

    @Override
    public void onWebSocketConnect(Session sess) {
        super.onWebSocketConnect(sess);
        logger.debug("Endpoint connected: {}", sess);
        WsSingleton.getInstance().sessionList.add(sess);
        WsSingleton.getInstance().sessionDict.put(sess,new ArrayList<String>());
    }

    public void sendReOpenMsg(String seat) {
        for(Session s : WsSingleton.getInstance().sessionList) {
            try {
                s.getRemote().sendString("{\"seat\":\""+seat+"\", \"state\":\"nonpending\"}");
            } catch (IOException | WebSocketException e) {}
        }
    }

    public class SeatState {
        public String seat;
        public String state;
    }

    @Override
    public void onWebSocketText(String message)
    {
        super.onWebSocketText(message);

        if(!message.equals("ping")) {
            Gson g = new Gson();
            SeatState ss = g.fromJson(message, SeatState.class);
            if (ss.state.equals("pending")) {
                WsSingleton.getInstance().sessionDict.get(getSession()).add(ss.seat);
            }
            logger.debug("Received TEXT message: {}", message);
        }

        List<Session> bad = new ArrayList<Session>();
        for(Session s : WsSingleton.getInstance().sessionList) {
            if(s!=this.getSession()) {
                try {
                    s.getRemote().sendString(message);
                } catch (IOException | WebSocketException e) {
                    bad.add(s);
                    //throw new RuntimeException(e);
                }
            }
        }
        for(Session b : bad) {
            WsSingleton.getInstance().sessionList.remove(b);
            for(String seat : WsSingleton.getInstance().sessionDict.get(b)) {
                this.sendReOpenMsg(seat);
            }
            WsSingleton.getInstance().sessionDict.remove(b);
        }

        if (message.toLowerCase(Locale.US).contains("bye"))
        {
            getSession().close(StatusCode.NORMAL, "Thanks");
        }
    }

    @Override
    public void onWebSocketClose(int statusCode, String reason)
    {
        super.onWebSocketClose(statusCode, reason);
        logger.debug("Socket Closed: [{}] {}", statusCode, reason);

        closureLatch.countDown();
    }

    @Override
    public void onWebSocketError(Throwable cause)
    {
        super.onWebSocketError(cause);
        logger.debug("onWebSocketError...");
        cause.printStackTrace(System.err);
    }

    public void awaitClosure() throws InterruptedException
    {
        logger.debug("Awaiting closure from remote");
        closureLatch.await();
    }

}
