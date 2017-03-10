package com.dc.discms.model;


public class AppConfigration {

	private String company;//包网名称
	
	private String domain;//域名
	
	private String logo;//base64图片
	
	private String lang;//语言版本，逗号分隔
	
	private String cagent;//包网代理号

	private String defaultLanguage;//默认语言版本

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getLang() {
		return lang;
	}

	public void setLang(String lang) {
		this.lang = lang;
	}

	public String getCagent() {
		return cagent;
	}

	public void setCagent(String cagent) {
		this.cagent = cagent;
	}

	public String getDefaultLanguage() {
		return defaultLanguage;
	}

	public void setDefaultLanguage(String defaultLanguage) {
		this.defaultLanguage = defaultLanguage;
	}

}
