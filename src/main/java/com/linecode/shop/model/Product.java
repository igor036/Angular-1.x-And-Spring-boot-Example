package com.linecode.shop.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Product implements IEntity {

	private static final long serialVersionUID = 1L;
	
	@Id
	private long id;
	
	@ManyToOne
	@JoinColumn(name = "book_pkey")
	private Book book;
	
	@ManyToOne
	@JoinColumn(name = "sale_pkey")
	private Sale sake;
	
	@Column(name = "amount")
	private int amount;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public Sale getSake() {
		return sake;
	}

	public void setSake(Sale sake) {
		this.sake = sake;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}
}
