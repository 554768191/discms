package com.dc.discms.db;


import java.io.InputStream;

import com.dc.discms.common.ConfigProperties;


public class BerkeleyDBConfig {
	public static String path;
	static {
			InputStream is=BerkeleyDBConfig.class.getClassLoader().getResourceAsStream("berkeley.properties");
			ConfigProperties properties=new ConfigProperties(is);
			path=properties.getString("path");
	}
	
}
