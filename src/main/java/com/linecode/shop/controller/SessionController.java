package com.linecode.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.linecode.shop.dao.CitiesDao;
import com.linecode.shop.dao.ProductDao;
import com.linecode.shop.dao.SaleDao;
import com.linecode.shop.dao.StatesDao;
import com.linecode.shop.model.Cities;
import com.linecode.shop.model.Sale;
import com.linecode.shop.model.States;

@Controller
public class SessionController {

	@Autowired
	private StatesDao statesDao;
	
	@Autowired
	private CitiesDao citiesDao;
	
	@Autowired
	private SaleDao saleDao;
	
	@Autowired
	private ProductDao productDao;

	@GetMapping("/")
	public String index() {
		return "index";
	}
	
	@GetMapping("/states")
	@ResponseBody
	public List<States> states(){
		return statesDao.list();
	}
	
	@GetMapping("/cities/{id}")
	@ResponseBody
	public List<Cities> cities(@PathVariable int id){
		return citiesDao.citiesByState(id);
	}
	
	@PostMapping("/purchase")
	@ResponseBody
	public String purchase(@RequestBody Sale sale) {
		
		try {
			
			System.out.println(sale.getProducts().size());
			
			return "sucess";
			
		}catch (Exception ex) {
			ex.printStackTrace();
			return "erro";
		}
	}
}
