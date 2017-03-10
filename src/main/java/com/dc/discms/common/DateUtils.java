package com.dc.discms.common;


import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *  日期转换类
 
 */
public abstract class DateUtils {
    protected static final String datePattern     = "yyyy-MM-dd";
    protected static final String timePattern     = "HH:mm:ss";
    protected static final String fullDatePattern = "yyyy-MM-dd HH:mm:ss";

    /**
     * 格式化时间
     * @param date 时间
     * @param pattern 格式化字符串
     * @return
     */
    public static String formatDate(Date date, String pattern) {
        if ( date != null ) {
            SimpleDateFormat df = new SimpleDateFormat( pattern );
            return df.format( date );
        }
        return "";
    }

    /**
     * 将时间对象的日期部分格化化
     * @param date
     * @return
     */
    public static String getDateString(Date date) {
        return formatDate( date, datePattern );
    }

    /**
     * 将时间对象的日期、时间部分格化化
     * @param date
     * @return
     */
    public static String getFullString(Date date) {
        return formatDate( date, fullDatePattern );
    }

    /**
     * 将时间对象的时间部分格化化
     * @param date
     * @return
     */
    public static String getTimeString(Date date) {
        return formatDate( date, timePattern );
    }
    
    /**
     * 按照日期格式，将字符串解析为日期对象
     * 
     * @param aMask  输入字符串的格式
     * @param str 一个按aMask格式排列的日期的字符串描述
     * @return Date 对象
     */
    public static Date parseDate(String str, String[] patterns ) {
        for(String pattern : patterns){
            try {
                SimpleDateFormat df = new SimpleDateFormat( pattern );
                return df.parse( str );
            } catch ( Exception pe ) {}
        }
        return null;
    }

    /**
     * 按照日期格式，将字符串解析为日期对象
     * 
     * @param aMask  输入字符串的格式
     * @param str 一个按aMask格式排列的日期的字符串描述
     * @return Date 对象
     */
    public static Date parseDate(String str, String pattern ) {
        try {
            SimpleDateFormat df = new SimpleDateFormat( pattern );
            return df.parse( str );
        } catch ( Exception pe ) {
            return null;
        }
    }
    
    /**
     * 将<code>datePattern<code>为格式的字符串解析为日期对象
     * @param str
     * @return
     */
    public static Date dateStringToDate(String str){
        return parseDate(str, datePattern);
    }
   
    /**
     * add by fa ,2008.12.11
     * 将日期对象转换为“yyyyMMdd”String
     * @param date
     * @return String
     */ 
    public static String dateToShortString(Date date){    	
		 SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
		 return df.format(date);
    }
}
