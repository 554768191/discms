package com.dc.discms.common;


import java.io.IOException;
import java.io.InterruptedIOException;
import java.net.UnknownHostException;
import java.nio.charset.CodingErrorAction;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLException;

import org.apache.http.Consts;
import org.apache.http.HttpEntityEnclosingRequest;
import org.apache.http.HttpRequest;
import org.apache.http.client.HttpRequestRetryHandler;
import org.apache.http.client.config.CookieSpecs;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.config.ConnectionConfig;
import org.apache.http.config.MessageConstraints;
import org.apache.http.conn.ConnectTimeoutException;
import org.apache.http.conn.HttpClientConnectionManager;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.client.LaxRedirectStrategy;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.protocol.HttpContext;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.ssl.TrustStrategy;

/**
 * http 链接
 * @author gavin
 *
 */
public class HttpLoad {

	private HttpLoad() {
		initHttpClient();
	};

	/**
	 * 用内部类构造器保证线程安全
	 * 
	 * @author gavin
	 *
	 */
	private static class HttpLoadHolder {
		private static HttpLoad instance = new HttpLoad();
	}

	public static HttpLoad getInstance() {
		return HttpLoadHolder.instance;
	}

	// 创建httpclient连接池
	private PoolingHttpClientConnectionManager httpClientConnectionManager = null;
	private static IdleConnectionMonitorThread scanThread = null;

	public void initHttpClient() {

		MessageConstraints messageConstraints = MessageConstraints.custom().setMaxHeaderCount(200)
				.setMaxLineLength(2000).build();

		ConnectionConfig connectionConfig = ConnectionConfig.custom().setMalformedInputAction(CodingErrorAction.IGNORE)
				.setUnmappableInputAction(CodingErrorAction.IGNORE).setCharset(Consts.UTF_8)
				.setMessageConstraints(messageConstraints).build();

		// 创建httpclient连接池
		httpClientConnectionManager = new PoolingHttpClientConnectionManager();
		// 设置连接池最大数量
		httpClientConnectionManager.setMaxTotal(200);
		// 设置单个路由最大连接数量
		httpClientConnectionManager.setDefaultMaxPerRoute(20);

		httpClientConnectionManager.setDefaultConnectionConfig(connectionConfig);

		// 扫描无效链接
		scanThread = new IdleConnectionMonitorThread(httpClientConnectionManager);

		scanThread.start();
	}

	// 请求重试机制
	HttpRequestRetryHandler myRetryHandler = new HttpRequestRetryHandler() {
		public boolean retryRequest(IOException exception, int executionCount, HttpContext context) {
			if (executionCount >= 3) {
				// 超过三次则不再重试请求
				return false;
			}
			if (exception instanceof InterruptedIOException) {
				// Timeout
				return false;
			}
			if (exception instanceof UnknownHostException) {
				// Unknown host
				return false;
			}
			if (exception instanceof ConnectTimeoutException) {
				// Connection refused
				return false;
			}
			if (exception instanceof SSLException) {
				// SSL handshake exception
				return false;
			}
			HttpClientContext clientContext = HttpClientContext.adapt(context);
			HttpRequest request = clientContext.getRequest();
			boolean idempotent = !(request instanceof HttpEntityEnclosingRequest);
			if (idempotent) {
				// Retry if the request is considered idempotent
				return true;
			}
			return false;
		}
	};

	public CloseableHttpClient getHttpClient() {
		// 创建全局的requestConfig
		RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(60000).setSocketTimeout(60000)
				.setCookieSpec(CookieSpecs.DEFAULT).build();
		// 声明重定向策略对象
		LaxRedirectStrategy redirectStrategy = new LaxRedirectStrategy();

		CloseableHttpClient httpClient = HttpClients.custom().setConnectionManager(httpClientConnectionManager)
				.setDefaultRequestConfig(requestConfig).setRedirectStrategy(redirectStrategy)
				.setRetryHandler(myRetryHandler).build();
		return httpClient;
	}

	/**
	 * 创建一个默认的httpsclient
	 * 
	 * @return
	 */
	public static CloseableHttpClient createSSLClientDefault() {
		try {
			SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {
				// 信任所有
				public boolean isTrusted(X509Certificate[] chain, String authType) throws CertificateException {
					return true;
				}
			}).build();

			SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslContext);

			return HttpClients.custom().setSSLSocketFactory(sslsf).build();

		} catch (KeyManagementException e) {
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (KeyStoreException e) {
			e.printStackTrace();
		}

		return HttpClients.createDefault();
	}

}

class IdleConnectionMonitorThread extends Thread {
	private final HttpClientConnectionManager connMgr;
	private volatile boolean shutdown;

	public IdleConnectionMonitorThread(HttpClientConnectionManager connMgr) {
		super();
		this.connMgr = connMgr;
	}

	@Override
	public void run() {
		try {
			while (!shutdown) {
				synchronized (this) {
					wait(5000);
					// 关闭无效连接
					connMgr.closeExpiredConnections();
					// 可选, 关闭空闲超过30秒的
					// connMgr.closeIdleConnections(30, TimeUnit.SECONDS);
				}
			}
		} catch (InterruptedException ex) {
			// terminate
		}
	}

	public void shutdown() {
		shutdown = true;
		synchronized (this) {
			notifyAll();
		}
	}

}
