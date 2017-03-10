package com.dc.discms.common;


import java.awt.geom.AffineTransform;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import javax.imageio.ImageIO;

/**
 * 文件相关操作
 * 
 * @author Gavin
 * 
 *         2014年8月26日
 */
public class FileUtil {

	/**
	 * 文件删除
	 * 
	 * @param file
	 */
	public static void deleteFile(File file) {
		if (file.isFile()) {
			file.delete();
		} else {
			if (!file.exists()) {
				return;
			}
			File f[] = file.listFiles();
			int len = f.length;
			for (int i = 0; i < len; i++) {
				deleteFile(f[i]);
			}
			file.delete();
		}
	}

	/**
	 * 将inputStream写入到文件当中并保存
	 * 
	 * @param in
	 * @param fileName
	 * @throws IOException
	 */
	public static void saveFile(InputStream in, String fileName) throws IOException {
		File f = new File(fileName);
		if (!f.exists()) {
			f.createNewFile();
		}
		int byteWrite = 0;
		int byteCount = 0;
		OutputStream os = new FileOutputStream(f);
		byte[] bytes = new byte[1024];
		while ((byteCount = in.read(bytes)) != -1) {
			os.write(bytes, byteWrite, byteCount);
			byteWrite += byteCount;
		}
		in.close();
		os.close();
	}

	/**
	 * 将字节数组写入文件
	 * 
	 * @param content
	 * @param fileName
	 * @throws IOException
	 */
	public static void writeFile(byte[] content, String fileName) throws IOException {
		File f = new File(fileName);
		if (!f.exists()) {
			f.createNewFile();
		}
		OutputStream os = new FileOutputStream(f);
		os.write(content);
		os.close();
	}

	/**
	 * 将文件读入byte数组
	 * 
	 * @param fileName
	 * @return
	 * @throws IOException
	 */
	public static byte[] readFileAsByte(String fileName) throws IOException {
		File f = new File(fileName);
		if (!f.exists()) {
			return null;
		}
		FileInputStream in = new FileInputStream(f);
		ByteArrayOutputStream buffer = new ByteArrayOutputStream();
		byte[] temp = new byte[1024];
		int size = 0;
		int off = 0;
		while ((size = in.read(temp)) != -1) {
			buffer.write(temp, off, size);
			off += size;
		}
		in.close();
		byte[] bytes = buffer.toByteArray();
		return bytes;

	}

	/*	*//**
			 * 生成缩略图并保存
			 * 
			 * @param f
			 * @param w
			 * @param h
			 * @param fileUrl
			 * @throws IOException
			 */
	public static void saveThumb(File f, int w, int h, String fileUrl) throws IOException {
		BufferedImage smail = new BufferedImage(w, h, BufferedImage.TYPE_3BYTE_BGR);
		BufferedImage big = ImageIO.read(f);
		int src_h = big.getHeight();
		int src_w = big.getWidth();
		double sx = w * 1.0 / src_w;
		double sy = h * 1.0 / src_h;
		FileOutputStream fos = new FileOutputStream(fileUrl);
		AffineTransform transform = new AffineTransform();
		transform.setToScale(sx, sy);
		AffineTransformOp ato = new AffineTransformOp(transform, null);
		ato.filter(big, smail);
		ImageIO.write(smail, "jpg", fos);
		fos.close();
	}

	/*	*//**
			 * 生成小图并保存
			 * 
			 * @param f
			 * @param ww
			 * @param hh
			 * @param fileUrl
			 * @throws IOException
			 */
	public static void saveLittleThumb(File f, int ww, int hh, String fileUrl) throws IOException {
		BufferedImage smail = new BufferedImage(ww, hh, BufferedImage.TYPE_3BYTE_BGR);
		BufferedImage big = ImageIO.read(f);
		int src_h = big.getHeight();
		int src_w = big.getWidth();
		double sx = ww * 1.0 / src_w;
		double sy = hh * 1.0 / src_h;
		FileOutputStream fos = new FileOutputStream(fileUrl);
		AffineTransform transform = new AffineTransform();
		transform.setToScale(sx, sy);
		AffineTransformOp ato = new AffineTransformOp(transform, null);
		ato.filter(big, smail);
		ImageIO.write(smail, "jpg", fos);
		fos.close();
	}

	/*	*//**
			 * 生成大图并保存
			 * 
			 * @param f
			 * @param bw
			 * @param bh
			 * @param fileUrl
			 * @throws IOException
			 */
	public static void saveBigThumb(File f, int bw, int bh, String fileUrl) throws IOException {
		BufferedImage smail = new BufferedImage(bw, bh, BufferedImage.TYPE_3BYTE_BGR);
		BufferedImage big = ImageIO.read(f);
		int src_h = big.getHeight();
		int src_w = big.getWidth();
		double sx = bw * 1.0 / src_w;
		double sy = bh * 1.0 / src_h;
		FileOutputStream fos = new FileOutputStream(fileUrl);
		AffineTransform transform = new AffineTransform();
		transform.setToScale(sx, sy);
		AffineTransformOp ato = new AffineTransformOp(transform, null);
		ato.filter(big, smail);
		ImageIO.write(smail, "jpg", fos);
		fos.close();
	}

	/**
	 * 将图片转成字节
	 * 
	 * @param image
	 * @param imageFormat
	 * @return
	 * @throws IOException
	 */
	public static byte[] getByteFromImage(BufferedImage image, String imageFormat) throws IOException {
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		ImageIO.write(image, imageFormat, bos);
		return bos.toByteArray();

	}

	public static File createFile(String path) throws IOException {
		File file = new File(path);
		if (!file.exists()) {
			file.createNewFile();
		}
		return file;
	}

	public static File createFileDirectory(String path) throws IOException {
		File file = new File(path);
		if (!file.exists()) {
			file.mkdir();
		}
		return file;
	}

	/**
	 * 解压
	 * 
	 * @param zipFile
	 * @param descPath
	 * @throws IOException
	 */
	public static void unzipFile(File zipFile, String descPath) throws IOException {
		ZipFile zip = new ZipFile(zipFile);
		for (Enumeration<? extends ZipEntry> entries = zip.entries(); entries.hasMoreElements();) {
			ZipEntry entry = (ZipEntry) entries.nextElement();
			String zipEntryName = entry.getName();
			InputStream in = zip.getInputStream(entry);
			String outPath = (descPath + zipEntryName).replaceAll("\\*", "/");
			;
			// 判断路径是否存在,不存在则创建文件路径
			File file = new File(outPath.substring(0, outPath.lastIndexOf('/')));
			if (!file.exists()) {
				file.mkdirs();
			}
			// 判断文件全路径是否为文件夹,如果是上面已经上传,不需要解压
			if (new File(outPath).isDirectory()) {
				continue;
			}
			// 输出文件路径信息
			System.out.println(outPath);

			OutputStream out = new FileOutputStream(outPath);
			byte[] buf1 = new byte[1024];
			int len;
			while ((len = in.read(buf1)) > 0) {
				out.write(buf1, 0, len);
			}
			in.close();
			out.close();
		}
		System.out.println("******************解压完毕********************");
        zip.close();
	}
}
