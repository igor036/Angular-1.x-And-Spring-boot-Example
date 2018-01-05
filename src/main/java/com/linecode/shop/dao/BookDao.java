package com.linecode.shop.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.linecode.shop.model.Book;

@Repository
@Transactional
public class BookDao extends DAO<Book> {

	public BookDao() {
		super(Book.class);
	}
}
