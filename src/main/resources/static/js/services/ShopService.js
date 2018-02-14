app.factory("ShopService",function($http){
	
	var config_text = {headers: { 'Accept': 'text/plain'}};
	var config_json = {headers: {'Content-Type': 'application/json'}};
	
	return {
		
		purchase: function(sale){
			return $http.post("/purchase", sale, config_json);
		}
	}
	
});