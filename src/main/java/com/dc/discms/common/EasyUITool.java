package com.dc.discms.common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;


public class EasyUITool {	
	public static String toGridJson(List<?> list,int total){
		String def="{\"total\":\"0\",\"rows\":[]}";
		if(list==null||list.size()<1)
		{
			return def;
		}
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("total", total);
		map.put("rows", list);
//		return JSONObject.fromObject(map).toString();
		return JSON.toJSONString(map);
	}
	public static String listToJson(List<?> list){
		String def="{\"data\":[]}";
		if(list==null||list.size()<1)
		{
			return def;
		}
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("data", list);
		return JSON.toJSONString(map);
	}	
	
	/**
	 * grid without page
	 * 
	 * @param rows
	 * @return
	 */
	public static String toGridJson(List<?> rows) {
		if (rows == null || rows.size() < 1) {
			return "{\"rows\": [] }";
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("rows", rows);
		return JSON.toJSONString(map);
	}
	
	/**
	 * grid with footer
	 * @param rows
	 * @param footer
	 * @return
	 */
	public static String toGridJsonWithFooter(List<?> rows,List<?> footer)
	{
		if (rows == null || rows.size() < 1) {
			return "{\"rows\": [] })";
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("rows", rows);
		map.put("footer", footer);
		return JSON.toJSONString(map);
	}
}
