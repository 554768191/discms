package com.dc.discms.generator;


import java.io.File;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dc.discms.dao.AppDao;
import com.dc.discms.dao.GameDao;
import com.dc.discms.dao.GameTypeDao;
import com.dc.discms.model.AppConfigration;
import com.dc.discms.model.Game;
import com.dc.discms.model.GameType;



@Component
public class IndexPageGenerator extends BaseGenerator {

	@Autowired
	private GameTypeDao gameTypeDao;

	@Autowired
	private GameDao gameDao;

	@Autowired
	private AppDao appDao;
	

	@Autowired
	private MessageI18nConfig messageI18nConfig;

	public void create() throws Exception {

		AppConfigration app = appDao.getObj();

		if (app == null) {
			throw new Exception("没有app注册信息");
		}

		List<GameType> gameTypes = gameTypeDao.get();
		if (gameTypes == null || gameTypes.size() < 1) {
			throw new Exception("没有配置game类型");
		}
		Collections.sort(gameTypes, new Comparator<GameType>() {
			public int compare(GameType arg0, GameType arg1) {
				if (arg0.getSort() > arg1.getSort()) {
					return 1;
				}
				if (arg0.getSort() == arg1.getSort()) {
					return 0;
				}
				if (arg0.getSort() < arg1.getSort()) {
					return -1;
				}
				return 0;
			}
		});

		List<Game> games = gameDao.get();
		if (games == null || games.size() < 1) {
			throw new Exception("没有游戏配置信息");
		}
		Collections.sort(games, new Comparator<Game>() {
			public int compare(Game arg0, Game arg1) {
				if (arg0.getSort() > arg1.getSort()) {
					return 1;
				}
				if (arg0.getSort() == arg1.getSort()) {
					return 0;
				}
				if (arg0.getSort() < arg1.getSort()) {
					return -1;
				}
				return 0;
			}
		}); 
	
		// 获取语言版本
		String[] langs = app.getLang().split(",");
		Map<Object, Object> map = new HashMap<Object, Object>();
		map.put("logoImage", app.getLogo());
		map.put("domain", app.getDomain());
		map.put("langs",langs);
		map.put("companyName", app.getCompany());
		FreeMarkerUtil.initConfig(getTemplatePath());
		
		//生成默认语言的首页
		Map<Object,Object> m1=new HashMap<Object,Object>();
		m1.put("lang", app.getDefaultLanguage());
		String ipath= getRootPath() + "index.html";
		File file0 = new File(ipath);
		FileWriter fileWriter0 = new FileWriter(file0);
		FreeMarkerUtil.processTemplate("index_index.ftl", m1, fileWriter0);

		for (String lang : langs) {
			switch (lang) {
			case "CH":
				Map<Object, Object> chm = new HashMap<Object, Object>();
				chm.putAll(messageI18nConfig.CH);
				chm.put("locate_lang", "CH");
				Map<String, List<Game>> gs = new HashMap<String, List<Game>>();
				for (int i = 0; i < gameTypes.size(); i++) {
					gameTypes.get(i).setName((String) messageI18nConfig.CH.get(gameTypes.get(i).getCode()));
					if (gs.get(gameTypes.get(i).getId()+"") == null) {
						gs.put(gameTypes.get(i).getId()+"", new ArrayList<Game>());
					}
					for (Game g : games) {
						if (g.getPid() == gameTypes.get(i).getId()) {
							g.setName((String) messageI18nConfig.CH.get(g.getCode()));
							gs.get(gameTypes.get(i).getId()+"").add(g);
						}
					}
				}
				map.put("gameTypes", gameTypes);
				map.put("gameMap", gs);
				chm.putAll(map);
				String chPath = getOutPath() + "CH/index.html";
				File file1 = new File(chPath);
				FileWriter fileWriter1 = new FileWriter(file1);
				FreeMarkerUtil.processTemplate("index.ftl", chm, fileWriter1);
				break;
			case "US":
				Map<Object, Object> usm = new HashMap<Object, Object>();
				usm.putAll(messageI18nConfig.US);
				usm.put("locate_lang", "US");
				Map<String, List<Game>> gsus = new HashMap<String, List<Game>>();
				for (int i = 0; i < gameTypes.size(); i++) {
					gameTypes.get(i).setName((String) messageI18nConfig.US.get(gameTypes.get(i).getCode()));
					if (gsus.get(gameTypes.get(i).getId()+"") == null) {
						gsus.put(gameTypes.get(i).getId()+"", new ArrayList<Game>());
					}
					for (Game g : games) {
						if (g.getPid() == gameTypes.get(i).getId()) {
							g.setName((String) messageI18nConfig.US.get(g.getCode()));
							gsus.get(gameTypes.get(i).getId()+"").add(g);
						}
					}
				}
				map.put("gameTypes", gameTypes);
				map.put("gameMap", gsus);
				usm.putAll(map);
				String usPath = getOutPath() + "US/index.html";
				File file2 = new File(usPath);
				FileWriter fileWriter2 = new FileWriter(file2);
				FreeMarkerUtil.processTemplate("index.ftl", usm, fileWriter2);
				break;
			case "HK":
				Map<Object, Object> hkm = new HashMap<Object, Object>();
				hkm.putAll(messageI18nConfig.HK);
				hkm.put("locate_lang", "HK");
				Map<String, List<Game>> gshk = new HashMap<String, List<Game>>();
				for (int i = 0; i < gameTypes.size(); i++) {
					gameTypes.get(i).setName((String) messageI18nConfig.HK.get(gameTypes.get(i).getCode()));
					if (gshk.get(gameTypes.get(i).getId()+"") == null) {
						gshk.put(gameTypes.get(i).getId()+"", new ArrayList<Game>());
					}
					for (Game g : games) {
						if (g.getPid() == gameTypes.get(i).getId()) {
							g.setName((String) messageI18nConfig.HK.get(g.getCode()));
							gshk.get(gameTypes.get(i).getId()+"").add(g);
						}
					}
				}
				map.put("gameTypes", gameTypes);
				map.put("gameMap", gshk);
				hkm.putAll(map);
				String hkPath = getOutPath() + "KH/index.html";
				File file3 = new File(hkPath);
				FileWriter fileWriter3 = new FileWriter(file3);
				FreeMarkerUtil.processTemplate("index.ftl", hkm, fileWriter3);
				break;
			case "TH":
				Map<Object, Object> thm = new HashMap<Object, Object>();
				thm.putAll(messageI18nConfig.TH);
				thm.put("locate_lang", "TH");
				Map<String, List<Game>> gsth = new HashMap<String, List<Game>>();
				for (int i = 0; i < gameTypes.size(); i++) {
					gameTypes.get(i).setName((String) messageI18nConfig.TH.get(gameTypes.get(i).getCode()));
					if (gsth.get(gameTypes.get(i).getId()+"") == null) {
						gsth.put(gameTypes.get(i).getId()+"", new ArrayList<Game>());
					}
					for (Game g : games) {
						if (g.getPid() == gameTypes.get(i).getId()) {
							g.setName((String) messageI18nConfig.TH.get(g.getCode()));
							gsth.get(gameTypes.get(i).getId()+"").add(g);
						}
					}
				}
				map.put("gameTypes", gameTypes);
				map.put("gameMap", gsth);
				thm.putAll(map);
				String thPath = getOutPath() + "TH/index.html";
				File file4 = new File(thPath);
				FileWriter fileWriter4 = new FileWriter(file4);
				FreeMarkerUtil.processTemplate("index.ftl", thm, fileWriter4);
				break;
			case "KH":
				Map<Object, Object> khm = new HashMap<Object, Object>();
				khm.putAll(messageI18nConfig.KH);
				khm.put("locate_lang", "KH");
				Map<String, List<Game>> gskh = new HashMap<String, List<Game>>();
				for (int i = 0; i < gameTypes.size(); i++) {
					gameTypes.get(i).setName((String) messageI18nConfig.KH.get(gameTypes.get(i).getCode()));
					if (gskh.get(gameTypes.get(i).getId()+"") == null) {
						gskh.put(gameTypes.get(i).getId()+"", new ArrayList<Game>());
					}
					for (Game g : games) {
						if (g.getPid() == gameTypes.get(i).getId()) {
							g.setName((String) messageI18nConfig.KH.get(g.getCode()));
							gskh.get(gameTypes.get(i).getId()+"").add(g);
						}
					}
				}
				map.put("gameTypes", gameTypes);
				map.put("gameMap", gskh);
				khm.putAll(map);
				String khPath = getOutPath() + "KH/index.html";
				File file5 = new File(khPath);
				FileWriter fileWriter5 = new FileWriter(file5);
				FreeMarkerUtil.processTemplate("index.ftl", khm, fileWriter5);
				break;
			default:
				break;
			}
		}

	}
}
