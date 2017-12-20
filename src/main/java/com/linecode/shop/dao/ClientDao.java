package com.linecode.shop.dao;


import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.linecode.shop.model.Client;

@Repository
@Transactional
public class ClientDao extends DAO<Client> {
	
	public ClientDao() {
		super(Client.class);
	}
}
