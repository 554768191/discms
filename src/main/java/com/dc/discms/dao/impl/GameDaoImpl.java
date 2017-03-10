package com.dc.discms.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.dc.discms.common.Strings;
import com.dc.discms.dao.GameDao;
import com.dc.discms.db.DaoUtil;
import com.dc.discms.model.Game;

@Component
public class GameDaoImpl implements GameDao{
	
	private String prex="GameDao";
	
	private String getKey(){
		return prex+"_";
	}
	

	public void save(Game game) {
		List<Game> list=get();
		if(list==null){
			list=new ArrayList<Game>();
		}
		list.add(game);
		DaoUtil.put(getKey(), JSON.toJSONString(list));
	}

	public void del(int id) {
		List<Game> list=get();
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

	public List<Game> get() {
		String json=DaoUtil.get(getKey());
		if(Strings.isNullOrEmpty(json)){
			return null;
		}
		List<Game> list=JSONArray.parseArray(json, Game.class);
		return list;
	}


	public void update(Game game) {
		List<Game> list=get();
		if(list!=null&&list.size()>0){
			for(int i=0;i<list.size();i++){
				if(list.get(i).getId()==game.getId()){
					list.set(i,game);
					break;
				}
			}
			DaoUtil.put(getKey(), JSON.toJSONString(list));
		}
	}

}
