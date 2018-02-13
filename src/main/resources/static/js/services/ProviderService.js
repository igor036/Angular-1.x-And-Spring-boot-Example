app.factory("ProviderService",function($http){
	
	var config_text = {headers: { 'Accept': 'text/plain'}};
	var config_json = {headers: {'Content-Type': 'application/json'}};
	
	return {
		provider: function(id){
			return $http({method: "GET",url: "/providers/"+id,});
		},
		
		loadProviders: function(pag_index){
			return $http({method: "GET",url: "/providers?pagIndex="+pag_index,});
		},
		
		loadPagesCount: function(){
			return $http({method: "GET",url: "/providers/pagesCount",});
		},
		
		post: function(provider){
			return $http.post("/providers/save/", provider, config_json);
		},
		
		delete: function(providerId){
			return $http.delete("/providers/"+providerId, config_text);
		}
	}
	
});