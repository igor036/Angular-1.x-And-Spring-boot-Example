app.factory("BookService",function($http){
	
	var config_text = {headers: { 'Accept': 'text/plain'}};
	var config_json = {headers: {'Content-Type': 'application/json'}};
	
	return {
		
		book: function(id){
			return $http({method: "GET",url: "/books/"+id});
		},
		
		loadBooks: function(pag_index) {
			return $http({method: "GET",url: "/books?pagIndex="+pag_index,});
		},
		
		loadPagesCount: function(){
			return $http({method: "GET",url: "/books/pagesCount",});
		},
		
		post: function(book){
			return $http.post("/books/save/", book,config_json);
		},
		
		delete: function(id){
			return $http.delete("/books/"+id,config_text);
		},
		
		providerSearch: function(search){
			return $http({method: "GET",url: "/providers/search?name="+search,});
		}
	}
});