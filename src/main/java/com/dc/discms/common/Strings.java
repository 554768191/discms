package com.dc.discms.common;




import java.util.List;
import java.util.Random;

public class Strings {
	
	public static final String Empty = "";	
	
	public static String left(String s, int len) {
		return s.substring(0, len);
	}
	
	public static String right(String s, int len) {
		return s.substring(s.length() - len, s.length());
	}
	
	public static String trim(String s) {
		return s != null ? s.trim() : s;
	}
	
	public static String addDoubleQuotation(Object s) {
		return "\"" + replaceBlank(s + "") + "\"";
	}
	
	public static String replace(String s, String newStr, String... oldStr) {
		if (!Strings.isNullOrEmpty(s) && oldStr != null) {
			for (String i : oldStr) {
				s = s.replace(i, newStr);
			}
		}
		return s;
	}
	
	public static String implode(String separator, Object... objects) {
		if (objects != null && objects.length > 0) {
			String result = "";
			for (int i = 0;i < objects.length;++i) {
				result += (i == 0 ? objects[i] : separator + objects[i]);
			}
			return result;
		}
		return "";
	}

	public static String generate(String s, int count) {
		String result = "";
		for (int i = 0;i < count;++i) {
			result += s;
		}
		return result;
	}
	
	public static String SBCToDBC(String QJstr) {
	     String outStr="";
	     String Tstr="";
	     byte[] b=null;

	     for(int i=0;i<QJstr.length();i++) {   
	      try {
	       Tstr=QJstr.substring(i,i+1);
	       b=Tstr.getBytes("unicode");
	      }
	      catch(java.io.UnsupportedEncodingException e) {
	       e.printStackTrace();
	      }     
	   
	      if (b[3]==-1) {
	       b[2]=(byte)(b[2]+32);
	       b[3]=0;      
	        
	       try {      
	        outStr=outStr+new String(b,"unicode");
	       }
	       catch(java.io.UnsupportedEncodingException e) {
	        e.printStackTrace();
	       }      
	      }else outStr=outStr+Tstr;
	     }
	     return outStr; 
	}
	
	public static String implode(String separator, List<String> objects) {
		if (objects != null && objects.size() > 0) {
			String result = "";
			for (int i = 0;i < objects.size();++i) {
				result += (i == 0 ? objects.get(i) : separator + objects.get(i));
			}
			return result;
		}
		return "";
	}
	
	public static String[] explode(String separator, String s) {
		return s.split(separator);
	}
	
	public static String getNumber(String s) {
		if (!Strings.isNullOrEmpty(s)) {
			char[] chs = s.toCharArray();
			String result = "";
			for (char c : chs) {
				if (c >= '0' && c <= '9') {
					result += c;
				}
			}
			return result;
		}
		return "";
	}
	
	public static String ucfirst(String s) {
		if (!Strings.isNullOrEmpty(s)) {
			char c = s.charAt(0);
			if (c >= 'a' && c <= 'z') {
				return String.valueOf(c).toUpperCase() 
				+ s.substring(1);
			}
		}
		return s;
	}
	
	public static String lcfirst(String s) {
		if (!Strings.isNullOrEmpty(s)) {
			char c = s.charAt(0);
			if (c >= 'A' && c <= 'Z') {
				return String.valueOf(c).toLowerCase()
				+ s.substring(1);
			}
		}
		return s;
	}
	
	public static String ucwords(String s) {
		if (!Strings.isNullOrEmpty(s)) {
			String[] arr = s.split("\\s");
			String result = "";
			boolean flag = false;
			for (String v : arr) {
				flag = true;
				result += " ";
				if (!Strings.isNullOrEmpty(v)) {
					result += Strings.ucfirst(v);
				}
				else {
					result += v;
				}
			}
			return flag ? result.substring(1) : result;
		}
		return s;
	}
	
	public static String lcwords(String s) {
		if (!Strings.isNullOrEmpty(s)) {
			String[] arr = s.split("\\s");
			String result = "";
			boolean flag = false;
			for (String v : arr) {
				flag = true;
				result += " ";
				if (!Strings.isNullOrEmpty(v)) {
					result += Strings.lcfirst(v);
				}
				else {
					result += v;
				}
			}
			return flag ? result.substring(1) : result;
		}
		return s;
	}
	
	public static boolean isNullOrEmpty(String value) {
		return value == null || "".equals(value.trim()) || "null".equals(value.trim());
	}
	
	public static boolean isNullOrEmpty(Object value) {
		if (value == null) {
			return true;
		}
		if (value instanceof String) {
			return "".equals(Strings.trim(String.valueOf(value)));
		}
		return false;
	}
	
	public static boolean itemHasNullOrEmpty(String... strings) {
		if (strings == null) {
			return true;
		}
		for (int i = 0;i < strings.length;++i) {
			if (isNullOrEmpty(strings[i])) {
				return true;
			}
		}
		return false;
	}
	
	private static char[] DEFAULT_HEX_CHAR = {'0', '1', '2', '3', '4', '5', '6', '7',
        '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};
	
	public static String random(int len) {
        return random(DEFAULT_HEX_CHAR, len);
    }
	
	public static String random(char[] chars, int len) {
		String s = "";
        Random rander = new Random(System.currentTimeMillis());
        for(int i = 0; i< len; ++i) {
            s += chars[rander.nextInt(chars.length)];
        }
        return s;
	}

    /**
     * 比较两个字符串（大小写敏感）。
     * <pre>
     * StringUtil.equals(null, null)   = true
     * StringUtil.equals(null, "abc")  = false
     * StringUtil.equals("abc", null)  = false
     * StringUtil.equals("abc", "abc") = true
     * StringUtil.equals("abc", "ABC") = false
     * </pre>
     *
     * @param str1 要比较的字符串1
     * @param str2 要比较的字符串2
     *
     * @return 如果两个字符串相同，或者都是<code>null</code>，则返回<code>true</code>
     */
    public static boolean equals(String str1, String str2) {
        return str1 == null ? str2 == null : str1.equals(str2);
    }

    /**
     * 比较两个字符串（大小写不敏感）。
     * <pre>
     * StringUtil.equalsIgnoreCase(null, null)   = true
     * StringUtil.equalsIgnoreCase(null, "abc")  = false
     * StringUtil.equalsIgnoreCase("abc", null)  = false
     * StringUtil.equalsIgnoreCase("abc", "abc") = true
     * StringUtil.equalsIgnoreCase("abc", "ABC") = true
     * </pre>
     *
     * @param str1 要比较的字符串1
     * @param str2 要比较的字符串2
     *
     * @return 如果两个字符串相同，或者都是<code>null</code>，则返回<code>true</code>
     */
    public static boolean equalsIgnoreCase(String str1, String str2) {
        return str1 == null ? str2 == null : str1.equalsIgnoreCase(str2);
    }

    /**
     * 检查字符串是否是空白：<code>null</code>、空字符串<code>""</code>或只有空白字符。
     * <pre>
     * StringUtil.isBlank(null)      = true
     * StringUtil.isBlank("")        = true
     * StringUtil.isBlank(" ")       = true
     * StringUtil.isBlank("bob")     = false
     * StringUtil.isBlank("  bob  ") = false
     * </pre>
     *
     * @param str 要检查的字符串
     *
     * @return 如果为空白, 则返回<code>true</code>
     */
    public static boolean isBlank(String str) {
        int length;

        if ((str == null) || ((length = str.length()) == 0)) {
            return true;
        }

        for (int i = 0; i < length; i++) {
            if (!Character.isWhitespace(str.charAt(i))) {
                return false;
            }
        }

        return true;
    }

    /**
     * 检查字符串是否不是空白：<code>null</code>、空字符串<code>""</code>或只有空白字符。
     * <pre>
     * StringUtil.isBlank(null)      = false
     * StringUtil.isBlank("")        = false
     * StringUtil.isBlank(" ")       = false
     * StringUtil.isBlank("bob")     = true
     * StringUtil.isBlank("  bob  ") = true
     * </pre>
     *
     * @param str 要检查的字符串
     *
     * @return 如果为空白, 则返回<code>true</code>
     */
    public static boolean isNotBlank(String str) {
        int length;

        if ((str == null) || ((length = str.length()) == 0)) {
            return false;
        }

        for (int i = 0; i < length; i++) {
            if (!Character.isWhitespace(str.charAt(i))) {
                return true;
            }
        }

        return false;
    }

    /**
     * 检查字符串是否为<code>null</code>或空字符串<code>""</code>。
     * <pre>
     * StringUtil.isEmpty(null)      = true
     * StringUtil.isEmpty("")        = true
     * StringUtil.isEmpty(" ")       = false
     * StringUtil.isEmpty("bob")     = false
     * StringUtil.isEmpty("  bob  ") = false
     * </pre>
     *
     * @param str 要检查的字符串
     *
     * @return 如果为空, 则返回<code>true</code>
     */
    public static boolean isEmpty(String str) {
        return ((str == null) || (str.length() == 0));
    }

    /**
     * 检查字符串是否不是<code>null</code>和空字符串<code>""</code>。
     * <pre>
     * StringUtil.isEmpty(null)      = false
     * StringUtil.isEmpty("")        = false
     * StringUtil.isEmpty(" ")       = true
     * StringUtil.isEmpty("bob")     = true
     * StringUtil.isEmpty("  bob  ") = true
     * </pre>
     *
     * @param str 要检查的字符串
     *
     * @return 如果不为空, 则返回<code>true</code>
     */
    public static boolean isNotEmpty(String str) {
        return ((str != null) && (str.length() > 0));
    }

    /**
     * 在字符串中查找指定字符串，并返回第一个匹配的索引值。如果字符串为<code>null</code>或未找到，则返回<code>-1</code>。
     * <pre>
     * StringUtil.indexOf(null, *)          = -1
     * StringUtil.indexOf(*, null)          = -1
     * StringUtil.indexOf("", "")           = 0
     * StringUtil.indexOf("aabaabaa", "a")  = 0
     * StringUtil.indexOf("aabaabaa", "b")  = 2
     * StringUtil.indexOf("aabaabaa", "ab") = 1
     * StringUtil.indexOf("aabaabaa", "")   = 0
     * </pre>
     *
     * @param str 要扫描的字符串
     * @param searchStr 要查找的字符串
     *
     * @return 第一个匹配的索引值。如果字符串为<code>null</code>或未找到，则返回<code>-1</code>
     */
    public static int indexOf(String str, String searchStr) {
        if ((str == null) || (searchStr == null)) {
            return -1;
        }

        return str.indexOf(searchStr);
    }

    /**
     * 在字符串中查找指定字符串，并返回第一个匹配的索引值。如果字符串为<code>null</code>或未找到，则返回<code>-1</code>。
     * <pre>
     * StringUtil.indexOf(null, *, *)          = -1
     * StringUtil.indexOf(*, null, *)          = -1
     * StringUtil.indexOf("", "", 0)           = 0
     * StringUtil.indexOf("aabaabaa", "a", 0)  = 0
     * StringUtil.indexOf("aabaabaa", "b", 0)  = 2
     * StringUtil.indexOf("aabaabaa", "ab", 0) = 1
     * StringUtil.indexOf("aabaabaa", "b", 3)  = 5
     * StringUtil.indexOf("aabaabaa", "b", 9)  = -1
     * StringUtil.indexOf("aabaabaa", "b", -1) = 2
     * StringUtil.indexOf("aabaabaa", "", 2)   = 2
     * StringUtil.indexOf("abc", "", 9)        = 3
     * </pre>
     *
     * @param str 要扫描的字符串
     * @param searchStr 要查找的字符串
     * @param startPos 开始搜索的索引值，如果小于0，则看作0
     *
     * @return 第一个匹配的索引值。如果字符串为<code>null</code>或未找到，则返回<code>-1</code>
     */
    public static int indexOf(String str, String searchStr, int startPos) {
        if ((str == null) || (searchStr == null)) {
            return -1;
        }

        // JDK1.3及以下版本的bug：不能正确处理下面的情况
        if ((searchStr.length() == 0) && (startPos >= str.length())) {
            return str.length();
        }

        return str.indexOf(searchStr, startPos);
    }

    /**
     * 取指定字符串的子串。
     * 
     * <p>
     * 负的索引代表从尾部开始计算。如果字符串为<code>null</code>，则返回<code>null</code>。
     * <pre>
     * StringUtil.substring(null, *, *)    = null
     * StringUtil.substring("", * ,  *)    = "";
     * StringUtil.substring("abc", 0, 2)   = "ab"
     * StringUtil.substring("abc", 2, 0)   = ""
     * StringUtil.substring("abc", 2, 4)   = "c"
     * StringUtil.substring("abc", 4, 6)   = ""
     * StringUtil.substring("abc", 2, 2)   = ""
     * StringUtil.substring("abc", -2, -1) = "b"
     * StringUtil.substring("abc", -4, 2)  = "ab"
     * </pre>
     * </p>
     *
     * @param str 字符串
     * @param start 起始索引，如果为负数，表示从尾部计算
     * @param end 结束索引（不含），如果为负数，表示从尾部计算
     *
     * @return 子串，如果原始串为<code>null</code>，则返回<code>null</code>
     */
    public static String substring(String str, int start, int end) {
        if (str == null) {
            return null;
        }

        if (end < 0) {
            end = str.length() + end;
        }

        if (start < 0) {
            start = str.length() + start;
        }

        if (end > str.length()) {
            end = str.length();
        }

        if (start > end) {
            return "";
        }

        if (start < 0) {
            start = 0;
        }

        if (end < 0) {
            end = 0;
        }

        return str.substring(start, end);
    }

    /**
     * 检查字符串中是否包含指定的字符串。如果字符串为<code>null</code>，将返回<code>false</code>。
     * <pre>
     * StringUtil.contains(null, *)     = false
     * StringUtil.contains(*, null)     = false
     * StringUtil.contains("", "")      = true
     * StringUtil.contains("abc", "")   = true
     * StringUtil.contains("abc", "a")  = true
     * StringUtil.contains("abc", "z")  = false
     * </pre>
     *
     * @param str 要扫描的字符串
     * @param searchStr 要查找的字符串
     *
     * @return 如果找到，则返回<code>true</code>
     */
    public static boolean contains(String str, String searchStr) {
        if ((str == null) || (searchStr == null)) {
            return false;
        }

        return str.indexOf(searchStr) >= 0;
    }

    /**
     * <p>Checks if the String contains only unicode digits.
     * A decimal point is not a unicode digit and returns false.</p>
     *
     * <p><code>null</code> will return <code>false</code>.
     * An empty String ("") will return <code>true</code>.</p>
     *
     * <pre>
     * StringUtils.isNumeric(null)   = false
     * StringUtils.isNumeric("")     = true
     * StringUtils.isNumeric("  ")   = false
     * StringUtils.isNumeric("123")  = true
     * StringUtils.isNumeric("12 3") = false
     * StringUtils.isNumeric("ab2c") = false
     * StringUtils.isNumeric("12-3") = false
     * StringUtils.isNumeric("12.3") = false
     * </pre>
     *
     * @param str  the String to check, may be null
     * @return <code>true</code> if only contains digits, and is non-null
     */
    public static boolean isNumeric(String str) {
        if (str == null) {
            return false;
        }
        int sz = str.length();
        for (int i = 0; i < sz; i++) {
            if (Character.isDigit(str.charAt(i)) == false) {
                return false;
            }
        }
        return true;
    }
    
    public static String replaceBlank(String str) {
    	/*if (str != null) {
    		Pattern p = Pattern.compile("\\s*|\r|\n");
    		return p.matcher(str).replaceAll("");
    	}*/
    	return str;
    }
    
    public static String escape(String src) {  
        int i;  
        char j;  
        StringBuffer tmp = new StringBuffer();  
        tmp.ensureCapacity(src.length() * 6);  
        for (i = 0; i < src.length(); i++) {  
            j = src.charAt(i);  
            if (Character.isDigit(j) || Character.isLowerCase(j)  
                    || Character.isUpperCase(j))  
                tmp.append(j);  
            else if (j < 256) {  
                tmp.append("%");  
                if (j < 16)  
                    tmp.append("0");  
                tmp.append(Integer.toString(j, 16));  
            } else {  
                tmp.append("%u");  
                tmp.append(Integer.toString(j, 16));  
            }  
        }  
        return tmp.toString();  
    }
    
    public static String unescape(String src) {  
        StringBuffer tmp = new StringBuffer();  
        tmp.ensureCapacity(src.length());  
        int lastPos = 0, pos = 0;  
        char ch;  
        while (lastPos < src.length()) {  
            pos = src.indexOf("%", lastPos);  
            if (pos == lastPos) {  
                if (src.charAt(pos + 1) == 'u') {  
                    ch = (char) Integer.parseInt(src  
                            .substring(pos + 2, pos + 6), 16);  
                    tmp.append(ch);  
                    lastPos = pos + 6;  
                } else {  
                    ch = (char) Integer.parseInt(src  
                            .substring(pos + 1, pos + 3), 16);  
                    tmp.append(ch);  
                    lastPos = pos + 3;  
                }  
            } else {  
                if (pos == -1) {  
                    tmp.append(src.substring(lastPos));  
                    lastPos = src.length();  
                } else {  
                    tmp.append(src.substring(lastPos, pos));  
                    lastPos = pos;  
                }  
            }  
        }  
        return tmp.toString();  
    }
	
}
