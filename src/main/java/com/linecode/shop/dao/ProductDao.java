package com.linecode.shop.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.linecode.shop.model.Product;

@Repository
@Transactional
public class ProductDao extends DAO<Product> {

	public ProductDao() {
		super(Product.class);
	}
}
