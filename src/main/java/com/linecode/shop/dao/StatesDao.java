package com.linecode.shop.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.linecode.shop.model.States;

@Repository
@Transactional
public class StatesDao extends DAO<States> {
	
	public StatesDao() {
		super(States.class);
	}
}
