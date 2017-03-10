package com.dc.discms.controller;


import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dc.discms.common.Strings;
import com.dc.discms.dao.UserDao;
import com.dc.discms.model.User;


@Controller
@EnableAutoConfiguration
public class UserController {

	
	
    @SuppressWarnings("unused")
	private Log log=LogFactory.getLog(this.getClass());
    
    @Autowired
    private UserDao userDao;
	
	
	@ResponseBody
	@RequestMapping(value="/manager/login",method=RequestMethod.POST)
	public String login(String username,String password,HttpServletRequest request){
		if(Strings.isNullOrEmpty(username)||Strings.isNullOrEmpty(password)){
			return "error";
		}
		User user=userDao.get(username);
		if(Strings.isNullOrEmpty(user)){
			return "error";
		}
		if(password.equals(user.getPassword())){
			request.getSession().setAttribute("user", user);
			return "success";
		}
		return "error";
		
	}

}
