package jpegUtil;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.font.FontRenderContext;
import java.awt.geom.Rectangle2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Random;

import javax.imageio.ImageIO;
public class JpegUtil {

	public String create(String str, String filePath, int width, int height) {

        String fileName = System.currentTimeMillis() + ".jpg";
        String path = filePath + "/" + fileName;
        File file = new File(path);

        BufferedImage bi = new BufferedImage(width, height,
                BufferedImage.TYPE_INT_RGB);

        Graphics2D g2 = (Graphics2D) bi.getGraphics();
        g2.setBackground(Color.lightGray);
        g2.clearRect(0, 0, width, height);

       
        Font font = new Font("隶书", Font.BOLD, 25);
        g2.setFont(font);
        /*g2.setPaint(Color.RED);*/
        Color color = new Color(120, 200, 50);
        g2.setPaint(color);

       
        FontRenderContext context = g2.getFontRenderContext();
        Rectangle2D bounds = font.getStringBounds(str, context);
        double x = (width - bounds.getWidth()) / 2;
        double y = (height - bounds.getHeight()) / 2;
        double ascent = -bounds.getY();
        double baseY = y + ascent;
        
       
        g2.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING,
                RenderingHints.VALUE_TEXT_ANTIALIAS_ON);

       
        g2.drawString(str, (int) x, (int) baseY);

        try {
            ImageIO.write(bi, "jpg", file);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("生成gif 错误 "+e.getMessage());
        }
        return file.getPath();
    }
	
	public int createFlash(String str, String filePath, int width, int height) {
		
		str="  "+str+"  ";
		Random ran = new Random();
		int max = 1;
		boolean flag = true;
		for (int i = 0; i < max; i++) {
			String fileName = i + ".jpg";
	        String path = filePath + "/" + fileName;
	        File file = new File(path);
			BufferedImage bi = new BufferedImage(width, height,
	                BufferedImage.TYPE_INT_RGB);

	        Graphics2D g2 = (Graphics2D) bi.getGraphics();
	        g2.setBackground(Color.WHITE);
	        g2.clearRect(0, 0, width, height);
	       
	        Font font = new Font("黑体", Font.BOLD, (int)(height*0.9));
	        g2.setFont(font);
	        //g2.setPaint(Color.RED);
	        Color color = new Color(ran.nextInt(200), ran.nextInt(200), ran.nextInt(200));
	        g2.setPaint(color);
	        FontRenderContext context = g2.getFontRenderContext();
	        Rectangle2D bounds = font.getStringBounds(str, context);
			
	        double x = bounds.getWidth();
	        if(flag){
	        	max=(int)x/10;
	        	flag = false;
	        }
	        double y = (height - bounds.getHeight())/2;
	        double ascent = -bounds.getY();
	        double baseY = y + ascent;
			
	        g2.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING,
	                RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
	        g2.drawString(str,-i*10, (int) baseY);
	        
	        try {
	            ImageIO.write(bi, "jpg", file);
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
		}
        return max;
    }
	
	
	 public static void main(String[] args) {
		 JpegUtil create = new JpegUtil();
	     System.out.println(create.createFlash("吴二迪是一个傻子", "d:/123", 80, 80));
	    }
}
