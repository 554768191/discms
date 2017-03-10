package com.dc.discms.dao.impl;


import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.dc.discms.common.Strings;
import com.dc.discms.dao.UserDao;
import com.dc.discms.db.DaoUtil;
import com.dc.discms.model.User;


@Component
public class UserDaoImpl implements UserDao{
	
	private final String prex="USER";
    private String getKey(String v){
    	return prex+"_"+v;
    }
	
	
	public void insert(User user) {
	    if(user!=null){
	    	DaoUtil.put(getKey(user.getUsername()), JSON.toJSONString(user));
	    }
	}

	public User get(String username) {
		String json = DaoUtil.get(getKey(username));
		if(Strings.isNullOrEmpty(json)){
			return null;
		}
		return JSON.parseObject(json, User.class);
	}

}
