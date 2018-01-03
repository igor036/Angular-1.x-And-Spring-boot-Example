package com.linecode.shop.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
@Transactional(rollbackFor = Exception.class)
public abstract class DAO <T> {

	@PersistenceContext
	protected EntityManager entityManager;
	private Class<T> classType;
	private final int PAGE_COUNT = 5;
	
	public DAO(Class<T> classType) {
		this.classType = classType;
	}
	
	public T find(long id) {
		return entityManager.find(classType, id);
	}
	
	public T insertOrUpdate(T object) {
		try {
			entityManager.merge(object);
			entityManager.flush();
			return object;
		}catch (Exception e) {
			return null;
		}
	}
	
	
	public boolean delete(T object) {
		try {
			entityManager.remove(object);
			entityManager.flush();
			return true;
		}catch (Exception e) {
			return false;
		}
	}
	
	public boolean delete(long id) {
		try {
			
			T object = find(id);
			
			if (object == null)
				return false;
			return delete(object);
			
		}catch (Exception e) {
			return false;
		}
	}
	
	
   /*
	* !! method for get list with pagination !!
	*/
	public List<T> page(int index){
		
		/* for get page, exemplo (0) for the (N) first elements, 
		 * 5 for the next N elements!!
		 * on N is the PAGE_COUNT.
		 */
		int offset = (index-1) * PAGE_COUNT;
		
		String queryStr = " SELECT * FROM "+classType.getSimpleName() +
						  " ORDER BY id LIMIT :limit"+
						  " OFFSET :offset";
	
		Query query = entityManager.createNativeQuery(queryStr, classType);
		query.setParameter("limit", PAGE_COUNT);
		query.setParameter("offset", offset);
		
		return query.getResultList();
	}
	
	/*get pages count*/
	public int pagesCount() {
		
		String queryStr = "SELECT COUNT(id) FROM "+classType.getSimpleName();
		Query query = entityManager.createNativeQuery(queryStr);
		
		int countElements = Integer.parseInt(query.getSingleResult().toString());
		int nPagseCount = countElements % 5 != 0 ? (countElements / 5) + 1 : (countElements / 5);
		
		return nPagseCount;
	}
	
	public List<T> list(){
		
		return entityManager
				.createNativeQuery("SELECT * FROM "+classType.getSimpleName(), classType)
				.getResultList();
	}
}
