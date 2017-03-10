package com.dc.discms.common;




import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;

@SuppressWarnings("serial")
public class ConfigProperties extends Properties {
	
	public ConfigProperties(String classpath) {
		this(ConfigProperties.class.getResourceAsStream("/" + classpath));
	}
	
	public ConfigProperties(File file) {
		try {
			InputStream in = new FileInputStream(file);
			this.load(in);
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public ConfigProperties(InputStream in) {
		try {
			this.load(in);
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public Map<Object,Object> visitor(){
		Iterator<Object> itertor=super.keySet().iterator();
		Map<Object,Object> map=new HashMap<Object, Object>();
		while(itertor.hasNext()){
			Object key=itertor.next();
			map.put(key, super.get(key));
		}
		return map;
	}
	
	public String getString(String key) {
		return Convert.parseString(super.get(key)); 
	}
	
	public byte getByte(String key) {
		return Convert.parseByte(super.get(key));
	}
	
	public int getInt(String key) {
		return Convert.parseInt(super.get(key));
	}
	
	public long getLong(String key) {
		return Convert.parseLong(super.get(key));
	}
	
	public float getFloat(String key) {
		return Convert.parseFloat(super.get(key));
	}
	
	public double getDouble(String key) {
		return Convert.parseDouble(super.get(key));
	}
	
	public boolean getBoolean(String key) {
		return Convert.parseBoolean(super.get(key));
	}
	
}
