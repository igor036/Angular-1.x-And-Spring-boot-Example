package com.linecode.shop.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.linecode.shop.model.Sale;

@Repository
@Transactional
public class SaleDao extends DAO<Sale> {
	
	public SaleDao() {
		super(Sale.class);
	}
	
}
