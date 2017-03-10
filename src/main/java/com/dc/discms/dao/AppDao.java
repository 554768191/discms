package com.dc.discms.dao;

import com.dc.discms.model.AppConfigration;

public interface AppDao {

	public void save(AppConfigration app);
	
	public String get();
	
	public AppConfigration getObj();
	
	
}
