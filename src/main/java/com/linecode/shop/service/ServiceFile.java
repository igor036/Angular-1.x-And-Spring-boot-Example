package com.linecode.shop.service;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.stereotype.Service;

import com.linecode.shop.model.Client;

import static org.mockito.Matchers.booleanThat;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

@Service
public class ServiceFile {

	/*
	 * !!! Attention !!!	
	 * this class using apache with the file service to save and get photos
	 * you will need to have the apacher service running on the same server
	 */
	
	private final String strPath;
	
	public ServiceFile() {
		
		strPath = "/var/www/html/client_photos";
		File path = new File(strPath);
		if (!path.exists())
			path.mkdir();
		
	}
	
	public boolean savePhoto(Client client) {
		
		if (client.getPhoto().contains("user_photos/default.png")) {
			client.setPhoto("user_photos/default.png");
			return true;
		}
		
		if (client.getPhoto().contains("http://localhost"))
			return true;
		
		try {
			
			String strBase64 = client.getPhoto().replaceAll("data:image/jpeg;base64,", "");
			String urlPhoto = strPath+"/"+client.getName()+".jpg";
			
	
			File photo = new File(urlPhoto.replace("%", ""));
			
			if (photo.exists())
				photo.delete();
			
			byte[] data = Base64.decodeBase64(strBase64);
			OutputStream stream = new FileOutputStream(photo);
			
		    stream.write(data);
		    stream.flush();
		    stream.close();
		    photo.exists();
		    
		    client.setPhoto("http://localhost/client_photos//"+client.getName()+".jpg");
		    
		    return true;
		    
		}catch (IOException e) {
			System.out.println(e.getMessage());
			return false;
		}
		
	}
	
	public void deletePhoto(Client client) {	
		
		if (!client.getPhoto().equals("user_photos/default.png")) {
			String urlPhoto = strPath+"/"+
								client.getPhoto().replaceAll("%", "")
									  .split("client_photos//")[1];
			File photo = new File(urlPhoto);
			photo.delete();
		}
			
	}

}
