package com.dc.discms.dao;


import java.util.List;

import com.dc.discms.model.Game;


public interface GameDao {

	public void save(Game game);
	
	public void del(int id);
	
	public List<Game> get();
	
	public void update(Game game);
	
}
