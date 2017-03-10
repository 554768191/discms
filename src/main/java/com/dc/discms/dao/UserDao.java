package com.dc.discms.dao;

import com.dc.discms.model.User;

public interface UserDao {

	public void insert(User user);
	
	
	public User get(String username);
	
	
}