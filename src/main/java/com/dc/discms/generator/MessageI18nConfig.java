package com.dc.discms.generator;


import java.io.InputStream;
import java.util.Map;
import org.springframework.stereotype.Component;

import com.dc.discms.common.ConfigProperties;

/**
 * 
 * @author gavin 通过spring的自动注入保证singleton
 * 
 */
@Component
public class MessageI18nConfig {

	public Map<Object, Object> CH = null;

	public Map<Object, Object> HK = null;

	public Map<Object, Object> TH = null;

	public Map<Object, Object> KH = null;

	public Map<Object, Object> US = null;

	public MessageI18nConfig() {

		new LoadMessage("message/message_CH.properties", 1).start();
		new LoadMessage("message/message_HK.properties", 2).start();
		new LoadMessage("message/message_TH.properties", 3).start();
		new LoadMessage("message/message_KH.properties", 4).start();
		new LoadMessage("message/message_US.properties", 5).start();
	}

	class LoadMessage extends Thread {

		private String messagePath;

		private int type;

		public LoadMessage(String messagePath, int type) {
			this.messagePath = messagePath;
			this.type = type;
		}

		public void run() {

			InputStream is = this.getClass().getClassLoader().getResourceAsStream(messagePath);
			ConfigProperties prop = new ConfigProperties(is);

			switch (type) {
			case 1:
				CH = prop.visitor();
				System.out.println("中文简体模板加载完成");
				break;
			case 2:
				HK = prop.visitor();
				System.out.println("中文繁体模板加载完成");
				break;
			case 3:
				TH = prop.visitor();
				System.out.println("柬语模板加载完成");
				break;
			case 4:
				KH = prop.visitor();
				System.out.println("泰语模板加载完成");
				break;
			case 5:
				US = prop.visitor();
				System.out.println("英文模板加载完成");
				break;
			default:
				break;
			}

		}
	}
}
