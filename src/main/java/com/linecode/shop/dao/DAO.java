package com.linecode.shop.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.linecode.shop.model.IEntity;


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
			
			log("INSERT/UPDATE", (object = entityManager.merge(object)));
			entityManager.flush();
			
			return object;
			
		}catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	
	}
	
	
	public boolean delete(T object) {
		try {
			
			
			entityManager.remove(object);
			entityManager.flush();
			log("DELETE", object);
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
			
			delete(object);
			log("DELETE", object);
			return true;
			
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
		
		String queryStr = " SELECT * FROM "+classType.getSimpleName()+
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
	
	private void log(String action, Object object) throws Exception {
		
		try {
			
		
			String strQuery = "INSERT INTO log(nm_table, action, id_table)"+ 
							  "VALUES (:table, :action, :id_table)";
			
			Query query = entityManager.createNativeQuery(strQuery);
			query.setParameter("table", classType.getSimpleName().toLowerCase());
			query.setParameter("action",action);
			query.setParameter("id_table", ((IEntity)object).getId() );
			
			query.executeUpdate();
			
		}catch (Exception ex) {
			
			ex.printStackTrace();
			throw ex;
		}
	}
}
