package com.dc.discms.common;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

public class HttpUtil {

	private static Log log = LogFactory.getLog(HttpUtil.class);

	/**
	 * 普通的http get 请求
	 */
	public static String get(String url, Map<String, String> headerMap) throws Exception{

		CloseableHttpClient httpclient = HttpLoad.getInstance().getHttpClient();
		HttpGet method = new HttpGet(url);
		method.addHeader("Accept", "text/html,*/*");
		method.addHeader("Content-Type", "text/html;charset=utf-8");
		if (headerMap != null) {
			Iterator<String> kiter = headerMap.keySet().iterator();
			while (kiter.hasNext()) {
				String ki = kiter.next();
				method.addHeader(ki, headerMap.get(ki));
			}
		}
		CloseableHttpResponse response = null;
		HttpEntity entity = null;
		try {
			response = httpclient.execute(method);
			int statusCode = response.getStatusLine().getStatusCode();
			if (statusCode == 200) {
				entity = response.getEntity();
				String src = EntityUtils.toString(entity, "UTF-8");
				EntityUtils.consume(entity);

				// InputStream inputStream = entity.getContent();
				// ByteArrayBuffer buffer = new ByteArrayBuffer(1024);
				// byte[] tmp = new byte[1024];
				// int count=0;
				// while((count=inputStream..read(tmp)) != -1){
				// buffer.append(tmp,0,count);
				// }
				// String src=new String(buffer.toByteArray(),"UTF-8");
				return src;
			} else {
				httpExceptionHandler(statusCode, url);
			}
		} catch (Exception e) {
			log.error(e.getMessage());
			throw e;
		} finally {
			if (response != null) {
				try {
					response.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			method.abort();
		}
		return null;

	}

	public static String post(String url, String param) throws Exception{
		CloseableHttpClient httpclient = HttpLoad.getInstance().getHttpClient();
		HttpPost method = new HttpPost(url);
		method.addHeader("Accept", "*/*");
		method.addHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		CloseableHttpResponse response = null;
		HttpEntity entity = null;
		try {
			// 遍历param
			if (param != null) {
				ByteArrayEntity byteentity = new ByteArrayEntity(param.getBytes("utf-8"));
				method.setEntity(byteentity);
			}
			response = httpclient.execute(method);
			int statusCode = response.getStatusLine().getStatusCode();
			if (statusCode == 200) {
				entity = response.getEntity();
				String src = EntityUtils.toString(entity, "UTF-8");
				EntityUtils.consume(entity);

				// InputStream inputStream = entity.getContent();
				// ByteArrayBuffer buffer = new ByteArrayBuffer(1024);
				// byte[] tmp = new byte[1024];
				// int count=0;
				// while((count=inputStream.read(tmp)) != -1){
				// buffer.append(tmp,0,count);
				// }
				// String src=new String(buffer.toByteArray(),"UTF-8");
				return src;
			} else {
				httpExceptionHandler(statusCode, url);
			}
		} catch (Exception e) {
			log.error(e.getMessage());
			throw e;
		} finally {
			if (response != null) {
				try {
					response.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			method.abort();
		}
		return null;
	}
	
	public static String post2(String url, Map<String, String> param) throws Exception{
		CloseableHttpClient httpclient = HttpLoad.getInstance().getHttpClient();
		HttpPost method = new HttpPost(url);
		method.addHeader("Accept", "*/*");
		method.addHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		CloseableHttpResponse response = null;
		HttpEntity entity = null;
		try {
			// 遍历param
			if (param != null) {
	            List<NameValuePair> formparams=new ArrayList<NameValuePair>();
				Iterator<Entry<String, String>> iter = param.entrySet().iterator();
				while (iter.hasNext()) {
					Entry<String, String> entry = iter.next();
					formparams.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
				}
				UrlEncodedFormEntity uefEntity=new UrlEncodedFormEntity(formparams, "UTF-8");
				method.setEntity(uefEntity);
			}
			response = httpclient.execute(method);
			int statusCode = response.getStatusLine().getStatusCode();
			if (statusCode == 200) {
				entity = response.getEntity();
				String src = EntityUtils.toString(entity, "UTF-8");
				EntityUtils.consume(entity);

				// InputStream inputStream = entity.getContent();
				// ByteArrayBuffer buffer = new ByteArrayBuffer(1024);
				// byte[] tmp = new byte[1024];
				// int count=0;
				// while((count=inputStream.read(tmp)) != -1){
				// buffer.append(tmp,0,count);
				// }
				// String src=new String(buffer.toByteArray(),"UTF-8");
				return src;
			} else {
				httpExceptionHandler(statusCode, url);
			}
		} catch (Exception e) {
			log.error(e.getMessage());
			throw e;
		} finally {
			if (response != null) {
				try {
					response.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			method.abort();
		}
		return null;
	}

	private static void httpExceptionHandler(int code, String urlString) throws Exception {
		switch (code) {
		case 400:
			throw new Exception("下载400错误代码，请求出现语法错误" + urlString);
		case 403:
			throw new Exception("下载403错误代码，资源不可用" + urlString);
		case 404:
			throw new Exception("下载404错误代码，无法找到指定资源地址" + urlString);
		case 503:
			throw new Exception("下载503错误代码，服务不可用" + urlString);
		case 504:
			throw new Exception("下载504错误代码，网关超时" + urlString);
		default:
			throw new Exception("请求超时" + urlString);
		}
	}

}
