package com.dc.discms.db;


public class DaoUtil {
     
	private static BerkeleyUtil berkeley;
	private static String path=BerkeleyDBConfig.path;
	
	static {
		berkeley=new BerkeleyUtil(path);
	}
	
	public static void put(String key,String value){
		berkeley.writeToDatabase(key, value, true);
	}
	
	public static String get(String key){
		return berkeley.readFromDatabase(key);
	}
	
	public static void del(String key){
		berkeley.deleteFromDatabase(key);
	}
	
	public static void close(){
		berkeley.closeDB();
	}
	
	public static void setup(){
		berkeley=new BerkeleyUtil(path);
	} 
	
	
}
