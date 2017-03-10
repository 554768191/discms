package com.dc.discms.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dc.discms.generator.IndexPageGenerator;


@Controller
public class IndexPageController {
	
	@Autowired
	private IndexPageGenerator indexPageGenterator;
	
	@ResponseBody
	@RequestMapping(value="/manager/index/create",method=RequestMethod.GET)
	public String createPage(){
		try {
			indexPageGenterator.create();
			return "success";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "error";
		}
	}
}
