package com.linecode.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.linecode.shop.dao.ClientDao;
import com.linecode.shop.model.Client;
import com.linecode.shop.service.FileService;

@Controller
public class ClienteController {

	@Autowired
	private ClientDao clientDao;
	
	@Autowired
	private FileService serviceFile;
	
	@GetMapping("/customers")
	@ResponseBody
	@Cacheable
	public List<Client> list(@RequestParam("pagIndex") int pagIndex){
		return clientDao.page(pagIndex);
	}
	
	@GetMapping("/customers/search")
	@ResponseBody
	public List<Client> search(@RequestParam("name") String name){
		return clientDao.search(name);
	}
	
	@GetMapping("/customers/pagesCount")
	@ResponseBody
	public int pagesCount() {
		return clientDao.pagesCount();
	}
	
	@GetMapping("/customers/{id}")
	@ResponseBody
	public Client get(@PathVariable long id) {
		return clientDao.find(id);
	}
	
	@DeleteMapping("/customers/{id}")
	@ResponseBody
	public String delete(@PathVariable("id") long id) {
		Client client = clientDao.find(id);
		serviceFile.deletePhoto(client);
		if (clientDao.delete(id))
			return "deleted";
		return "error";
	}
	
	@PostMapping("/customers/save")
	@ResponseBody
	public Client insert(@RequestBody Client client) {
		if(serviceFile.savePhoto(client))
			return clientDao.insertOrUpdate(client);
		return null;
	}
}
