package com.dc.discms.controller;


import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.alibaba.fastjson.JSON;
import com.dc.discms.common.EasyUITool;
import com.dc.discms.common.FileUtil;
import com.dc.discms.common.Strings;
import com.dc.discms.dao.TemplateConfigrationDao;
import com.dc.discms.model.TemplateConfigration;

@Controller
public class TemplateConfigrationController {

	@Value("${templatePath}")
	private String templatePath;
	
	@Value("${uploadpath}")
	private String uploadpath;
	
	@Autowired
	private TemplateConfigrationDao tcDao;
	
	
	@ResponseBody
	@RequestMapping(value="/manager/template/get")
	public String get(){
		return JSON.toJSONString(tcDao.get());
	}
	
	@ResponseBody
	@RequestMapping(value="/manager/template/save")
	public String save(TemplateConfigration obj){
		tcDao.save(obj);
		return "success";
	}
	
	@ResponseBody
	@RequestMapping(value="/manager/template/del")
	public String del(String id){
		tcDao.del(id);
		return "success";
	}
	
	@ResponseBody
	@RequestMapping(value="/manager/template/iterator")
	public String iterator(){
		File file=new File(templatePath);
		String[] list=file.list();
		List<Map<String,String>> tempList=new ArrayList<Map<String,String>>();
		if(list!=null&&list.length>0){
		   
		   for(String s:list){
			   Map<String,String> map=new HashMap<String,String>();
			   map.put("name", s);
			   tempList.add(map);
		   }
		}
		return EasyUITool.toGridJson(tempList);
	}
	
	
	@ResponseBody
	@RequestMapping(value="/manager/template/use")
	public String useTemplate(String name){
		if(Strings.isNullOrEmpty(name)){
			return "error";
		}
		String filePath=templatePath+"/"+name;
		File file=new File(filePath);
		String descPath=uploadpath;
		try {
			FileUtil.unzipFile(file, descPath);
			return "success";
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "error";
		}
	}
	
	
	
}
