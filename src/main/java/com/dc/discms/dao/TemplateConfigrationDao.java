package com.dc.discms.dao;


import java.util.List;

import com.dc.discms.model.TemplateConfigration;


public interface TemplateConfigrationDao {

	public List<TemplateConfigration> get();
	
	public void save(TemplateConfigration template);
	
	public void del(String id);
	
}
