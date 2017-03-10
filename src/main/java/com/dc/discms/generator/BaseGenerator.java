package com.dc.discms.generator;


import org.springframework.beans.factory.annotation.Value;

public class BaseGenerator {
    
	@Value("${uploadpath}") private String uploadpath;
	
	
	public String getOutPath(){
		return uploadpath+"src/";
	}
	
	public String getTemplatePath(){
		return uploadpath+"template/";
	}
	
	public String getRootPath(){
		return uploadpath;
	}
	
}
