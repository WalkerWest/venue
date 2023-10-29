package nblc;

import org.eclipse.jetty.websocket.api.Session;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class WsSingleton {
    // Static variable reference of single_instance
    // of type Singleton
    private static WsSingleton single_instance = null;

    // Declaring a variable of type String
    public String s;
    public List<Session> sessionList = new ArrayList<Session>();
    public HashMap<Session,List<String>> sessionDict = new HashMap<Session,List<String>>();

    // Constructor
    // Here we will be creating private constructor
    // restricted to this class itself
    private WsSingleton()
    {
        s = "Hello I am a string part of Singleton class";
    }

    // Static method
    // Static method to create instance of Singleton class
    public static synchronized WsSingleton getInstance()
    {
        if (single_instance == null)
            single_instance = new WsSingleton();

        return single_instance;
    }
}
