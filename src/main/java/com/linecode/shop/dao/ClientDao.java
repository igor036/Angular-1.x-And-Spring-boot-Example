package com.linecode.shop.dao;


import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.linecode.shop.model.Client;

@Repository
@Transactional
public class ClientDao extends DAO<Client> {
	
	public ClientDao() {
		super(Client.class);
	}
	
	public List<Client> search(String name){
		
		String sql = "SELECT * FROM client WHERE name LIKE :name";
		
		Query query = entityManager.createNativeQuery(sql,Client.class);
		
		query.setParameter("name", name+"%");
		
		return query.getResultList();
	}
}
