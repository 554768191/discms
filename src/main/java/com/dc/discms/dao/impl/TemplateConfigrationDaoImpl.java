package com.dc.discms.dao.impl;


import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;
import com.alibaba.fastjson.JSON;
import com.dc.discms.common.Strings;
import com.dc.discms.dao.TemplateConfigrationDao;
import com.dc.discms.db.DaoUtil;
import com.dc.discms.model.TemplateConfigration;

@Component
public class TemplateConfigrationDaoImpl implements TemplateConfigrationDao{
	
    private String prex="TEMPLATE_";
	
	private String getKey(){
		return prex+"_";
	}
	
	@Override
	public List<TemplateConfigration> get() {
		String json =DaoUtil.get(getKey());
		if(Strings.isNullOrEmpty(json)){
			return null;
		}
		return JSON.parseArray(json,TemplateConfigration.class);
	}

	@Override
	public void save(TemplateConfigration template) {
		String json =DaoUtil.get(getKey());
		List<TemplateConfigration> list=null;
		if(Strings.isNullOrEmpty(json)){
			list=new ArrayList<TemplateConfigration>();
		}else{
			list=JSON.parseArray(json,TemplateConfigration.class);
		}
		list.add(template);
		DaoUtil.put(getKey(), JSON.toJSONString(list));
	}

	@Override
	public void del(String id) {
		String json =DaoUtil.get(getKey());
		List<TemplateConfigration> list=null;
		if(Strings.isNullOrEmpty(json)){
			return;
		}else{
			list=JSON.parseArray(json,TemplateConfigration.class);
		}
		for(int i=0;i<list.size();i++){
			if(id.equals(list.get(i).getId())){
				list.remove(i);
				DaoUtil.put(getKey(), JSON.toJSONString(list));
				break;
			}
		}
	}

}
