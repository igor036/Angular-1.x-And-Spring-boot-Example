package com.linecode.shop.dao;

import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.linecode.shop.model.Provider;

@Repository
@Transactional
public class ProviderDao extends DAO<Provider> {

	public ProviderDao() {
		super(Provider.class);
	}
	
	public List<Provider> search(String name){
		
		String sql = "SELECT * FROM provider WHERE name LIKE :name";
		
		Query query = entityManager.createNativeQuery(sql,Provider.class);
		
		query.setParameter("name", name+"%");
		
		return query.getResultList();
	}
}
