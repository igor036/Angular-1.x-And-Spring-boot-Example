package com.linecode.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.linecode.shop.dao.BookDao;
import com.linecode.shop.model.Book;
import com.linecode.shop.service.FileService;

@Controller
public class BookController {
	
	@Autowired
	private BookDao bookDao;
	
	@Autowired
	private FileService serviceFile;
	
	@GetMapping("/books")
	@ResponseBody
	@Cacheable
	public List<Book> list(@RequestParam("pagIndex") int pagIndex){
		return bookDao.page(pagIndex);
	}
	
	@GetMapping("/books/pagesCount")
	@ResponseBody
	public int pagesCount() {
		return bookDao.pagesCount();
	}
	
	@GetMapping("/books/{id}")
	@ResponseBody
	public Book get(@PathVariable long id) {
		return bookDao.find(id);
	}
	
	@DeleteMapping("/books/{id}")
	@ResponseBody
	public String delete(@PathVariable("id") long id) {
		Book book = bookDao.find(id);
		serviceFile.deletePhoto(book);
		if (bookDao.delete(id))
			return "deleted";
		return "error";
	}
	
	
	@PostMapping("/books/save")
	@ResponseBody
	public Book insert(@RequestBody Book book) {
		if(serviceFile.savePhoto(book))
			return bookDao.insertOrUpdate(book);
		return null;
	}
}
