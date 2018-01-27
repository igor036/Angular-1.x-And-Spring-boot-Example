app.factory('ClientService',function($http){
	
	var config_text = {headers: { 'Accept': 'text/plain'}};
	var config_json = {headers: {'Content-Type': 'application/json'}};
	
	return {
		
		client: function(clientId){
			return $http({method: "GET",url: "/customers/"+clientId});
		},
		
		loadCustomers: function(pag_index) {
			return $http({ method: "GET", url: "/customers?pagIndex="+pag_index,});
		},
		
		loadPagesCount: function(){
			return $http({ method: "GET",url: "/customers/pagesCount"});
		},
		
		post: function (client, header){
			return $http.post("/customers/save/", client, config_json);
		},
		
		delete: function(clientId){
			return $http.delete("/customers/"+clientId,config_text);
		}
	};
	
});