package com.dc.discms.dao;


import java.util.List;

import com.dc.discms.model.GameType;


public interface GameTypeDao {

	public void save(GameType gameType);
	
	public void del(int id);
	
	public List<GameType> get();
	
	public void update(GameType gameType);
	
}
