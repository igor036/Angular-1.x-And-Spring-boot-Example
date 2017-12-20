package com.linecode.shop.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.linecode.shop.model.Cities;

import java.util.List;

import javax.persistence.Query;

@Repository
@Transactional
public class CitiesDao extends DAO<Cities> {

	public CitiesDao() {
		super(Cities.class);
	}
	
	public List<Cities> citiesByState(int stateId){
		
		String str_sql = "SELECT * FROM cities " + 
				  		 "WHERE state_id = :state_id";
		
		Query query = entityManager.createNativeQuery(str_sql,Cities.class);
		query.setParameter("state_id", stateId);
		
		return query.getResultList();
	}
}
