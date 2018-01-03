package com.linecode.shop.service;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.stereotype.Service;

import com.linecode.shop.model.Client;
import com.linecode.shop.model.Provider;

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
	
	private String strPath;
	
	public void path() {
		
		File path = new File(strPath);
		if (!path.exists())
			path.mkdir();
		
	}
	
	public boolean savePhoto(Client client) {
		
		strPath = "/var/www/html/client_photos";
		path();
		
		if (client.getPhoto().contains("user_photos/default.png")) {
			client.setPhoto("user_photos/default.png");
			return true;
		}
		
		if (client.getPhoto().contains("http://localhost"))
			return true;
		
		String strBase64 = client.getPhoto().replaceAll("data:image/jpeg;base64,", "");
		String urlPhoto = strPath+"/"+client.getName()+".jpg";
		
		
		if (!savePhoto(strBase64, urlPhoto))
			return false;
		
		client.setPhoto("http://localhost/client_photos//"+client.getName()+".jpg");
		return true;
		
	}
	
	public boolean savePhoto(Provider provider) {
		
		strPath = "/var/www/html/provider_photos";
		path();
		
		if (provider.getPhoto().contains("user_photos/default.png")) {
			provider.setPhoto("user_photos/default.png");
			return true;
		}
		
		if (provider.getPhoto().contains("http://localhost"))
			return true;
		
		String strBase64 = provider.getPhoto().replaceAll("data:image/jpeg;base64,", "");
		String urlPhoto = strPath+"/"+provider.getName()+".jpg";
		
		
		if (!savePhoto(strBase64, urlPhoto))
			return false;
		
		provider.setPhoto("http://localhost/provider_photos//"+provider.getName()+".jpg");
		return true;
		
	}
	
	
	private boolean savePhoto(String strBase64,String urlPhoto) {
		
		try {
			
	
			File photo = new File(urlPhoto.replace("%", ""));
			
			if (photo.exists())
				photo.delete();
			
			byte[] data = Base64.decodeBase64(strBase64);
			OutputStream stream = new FileOutputStream(photo);
			
		    stream.write(data);
		    stream.flush();
		    stream.close();
		    photo.exists();
		    
		    return true;
		    
		}catch (IOException e) {
			System.out.println(e.getMessage());
			return false;
		}
	}
	
	public void deletePhoto(Client client) {	
		
		strPath = "/var/www/html/client_photos";
		
		if (!client.getPhoto().equals("user_photos/default.png")) {
			String urlPhoto = strPath+"/"+
								client.getPhoto().replaceAll("%", "")
									  .split("client_photos//")[1];
			File photo = new File(urlPhoto);
			photo.delete();
		}
			
	}
	
	public void deletePhoto(Provider provider) {	
		
		strPath = "/var/www/html/provider_photos";
		
		if (!provider.getPhoto().equals("user_photos/default.png")) {
			String urlPhoto = strPath+"/"+
					provider.getPhoto().replaceAll("%", "")
									  .split("provider_photos//")[1];
			File photo = new File(urlPhoto);
			photo.delete();
		}
			
	}
}
