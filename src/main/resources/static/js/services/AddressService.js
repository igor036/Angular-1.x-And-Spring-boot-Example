app.factory("AddressService",function($http){
	
	var config_text = {headers: { 'Accept': 'text/plain'}};
	var config_json = {headers: {'Content-Type': 'application/json'}};
	
	return {
		
		satesLoad: function(){
			return $http.get("/states",config_json);
		},
		
		citiesLoad: function(stateId){
			return $http.get("/cities/"+stateId,config_json);
		}
	}
	
});