package com.dc.discms.dao.impl;


import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.dc.discms.common.Strings;
import com.dc.discms.dao.AppDao;
import com.dc.discms.db.DaoUtil;
import com.dc.discms.model.AppConfigration;


@Component
public class AppDaoImpl implements AppDao{

	private String prex="APP";
	
	private String getKey(){
		return prex+"_";
	}
	
	public void save(AppConfigration app) {
		DaoUtil.put(getKey(), JSON.toJSONString(app));
		
	}

	public String get() {
		return DaoUtil.get(getKey());
	}

	public AppConfigration getObj() {
		String json=DaoUtil.get(getKey());
		if(Strings.isNullOrEmpty(json)){
			return null;
		}
		return JSON.parseObject(json, AppConfigration.class);
	}

}
