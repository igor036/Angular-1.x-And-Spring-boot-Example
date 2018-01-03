package com.linecode.shop.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.linecode.shop.model.Provider;

@Repository
@Transactional
public class ProviderDao extends DAO<Provider> {

	public ProviderDao() {
		super(Provider.class);
	}
}
