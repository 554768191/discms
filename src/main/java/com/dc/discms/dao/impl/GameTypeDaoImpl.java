package com.dc.discms.dao.impl;


import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.dc.discms.common.Strings;
import com.dc.discms.dao.GameTypeDao;
import com.dc.discms.db.DaoUtil;
import com.dc.discms.model.GameType;

@Component
public class GameTypeDaoImpl implements GameTypeDao{

	private String prex="GameType";
	
	private String getKey(){
		return prex+"_";
	}
	
	
	public void save(GameType gameType) {
		List<GameType> list=get();
		if(list==null){
			list=new ArrayList<GameType>();
		}
		list.add(gameType);
	    DaoUtil.put(getKey(), JSON.toJSONString(list));
	}

	public void del(int id) {
		List<GameType> list=get();
		if(list!=null&&list.size()>0){
			for(int i=0;i<list.size();i++){
			    if(list.get(i).getId()==id){
			    	list.remove(i);
			    	break;
			    }
			}
			DaoUtil.put(getKey(), JSON.toJSONString(list));
		}
	}


	public List<GameType> get() {
		String json=DaoUtil.get(getKey());
		if(Strings.isNullOrEmpty(json)){
			return null;
		}
		return JSONArray.parseArray(json, GameType.class);
	}


	public void update(GameType gameType) {
		List<GameType> list=get();
		if(list!=null&&list.size()>0){
			for(int i=0;i<list.size();i++){
				if(list.get(i).getId()==gameType.getId()){
					list.set(i,gameType);
					break;
				}
			}
			DaoUtil.put(getKey(), JSON.toJSONString(list));
		}
		
	}

}
