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

import com.linecode.shop.dao.ProviderDao;
import com.linecode.shop.model.Client;
import com.linecode.shop.model.Provider;
import com.linecode.shop.service.FileService;

@Controller
public class ProviderController {

	//create new generic controller for crud methods.
	
	@Autowired
	private ProviderDao providerDao;
	
	@Autowired
	private FileService serviceFile;
	
	@GetMapping("/providers")
	@ResponseBody
	@Cacheable
	public List<Provider> list(@RequestParam("pagIndex") int pagIndex){
		return providerDao.page(pagIndex);
	}
	
	@GetMapping("/providers/search")
	@ResponseBody
	public List<Provider> search(@RequestParam("name") String name){
		return providerDao.search(name);
	}
	
	@GetMapping("/providers/pagesCount")
	@ResponseBody
	public int pagesCount() {
		System.out.println("count");
		return providerDao.pagesCount();
	}
	
	@GetMapping("/providers/{id}")
	@ResponseBody
	public Provider get(@PathVariable long id) {
		return providerDao.find(id);
	}
	
	@DeleteMapping("/providers/{id}")
	@ResponseBody
	public String delete(@PathVariable("id") long id) {
		Provider provider = providerDao.find(id);
		serviceFile.deletePhoto(provider);
		if (providerDao.delete(id))
			return "deleted";
		return "error";
	}
	
	
	@PostMapping("/providers/save")
	@ResponseBody
	public Provider insert(@RequestBody Provider provider) {
		if(serviceFile.savePhoto(provider))
			return providerDao.insertOrUpdate(provider);
		return null;
	}
}
