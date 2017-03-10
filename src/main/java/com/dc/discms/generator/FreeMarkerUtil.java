package com.dc.discms.generator;



import java.io.File;
import java.io.IOException;
import java.io.Writer;
import java.util.Locale;
import java.util.Map;

import com.dc.discms.common.Strings;

import freemarker.template.Configuration;
import freemarker.template.DefaultObjectWrapper;
import freemarker.template.Template;
import freemarker.template.TemplateException;

public class FreeMarkerUtil {
	private  static Configuration config = new Configuration(Configuration.VERSION_2_3_23);
	private final static String defaultTemplateDir="/template/"; 
	
	
	/** 
     * @param templateName 模板名字 
     * @param root 模板根 用于在模板内输出结果集 
     * @param out 输出对象 具体输出到哪里 
     */  
    public static void processTemplate(String templateName, Map<?,?> root, Writer out){  
        try{  
            //获得模板  
            Template template=config.getTemplate(templateName,"utf-8");
            template.process(root, out);     
            out.flush();     
        } catch (IOException e) {  
            e.printStackTrace();  
        } catch (TemplateException e) {  
            e.printStackTrace();  
        }finally{  
             try {  
                out.close();  
                out=null;  
            } catch (IOException e) {  
                e.printStackTrace();  
            }  
        }  
    }  
    /** 
     * 初始化模板配置 
     * @param templateDir 模板位置 
     */  
    public static void initConfig(String templateDir){ 
    	    System.out.println(templateDir);
    	
    	    if(Strings.isNullOrEmpty(templateDir)){
    	    	templateDir=defaultTemplateDir;
    	    }
    	
            config.setLocale(Locale.CHINA);  
            config.setDefaultEncoding("utf-8");  
            config.setEncoding(Locale.CHINA, "utf-8");  
            try {
				config.setDirectoryForTemplateLoading(new File(templateDir));
				config.setObjectWrapper(new DefaultObjectWrapper(Configuration.VERSION_2_3_23));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

    }  
}
