	app.controller("clientController",function($scope, $routeParams, ClientService,AddressService){
	
	load();

	//variable's and object's
	$scope.config_text = {headers: { 'Accept': 'text/plain'}};
	$scope.config_json = {headers: {'Content-Type': 'application/json'}};
	$scope.pag_index = 1;

	//load client for edit
	if($routeParams.id){
		ClientService.client($routeParams.id).then(function(response){
			if (response.data) {
				$("#submit").val("Editar cliente");
				$("#msg").html("Editar cliente");
				$scope.client = response.data;
				
				//!!field accepts string only
				$scope.client.state.id = ""+$scope.client.state.id;
				//!!
				
				//load photo
				$("#photo").prop("src",$scope.client.photo);
				$scope.citiesLoad($scope.client.state.id);
			 }else
				$scope.errorMsg = "Cliente não encontrado!";
		},function(){
			$scope.errorMsg = "Ops, aconteceu um erro na sua solicitação, por favor, tente novamente.";
		});
	}

	//function's
	$scope.loadCustomers = function () {
	
		ClientService.loadCustomers($scope.pag_index).then(function(response){
			$scope.customers = response.data;
			if ($scope.customers.length == 0 && $scope.pag_index > 0){
				$scope.pag_index--;
				$scope.loadCustomers();
			}
			$scope.loadPagesCount();
		},function(){
			$scope.errorMsg = "Ops, aconteceu um erro na sua solicitação, por favor, tente novamente.";
		});
	};

	$scope.loadPagesCount = function(){
		ClientService.loadPagesCount().then(function(response){
			if (response.data) {
				$scope.pagesCount = response.data;
				console.log($scope.pagesCount);
			 }else
			 	$.jGrowl("Erro ao carregar total de páginas");
		},function(){
			$.jGrowl("Erro ao carregar total de páginas");
		});
	};

	$scope.nextPag = function(){
		$scope.pag_index++;
		$scope.loadCustomers();
	};

	$scope.previousPag = function(){
		$scope.pag_index--;
		$scope.loadCustomers();
	};

	$scope.post = function(client){
		if (validationSubmit('form'))  {
			$scope.client.photo = $("#photo").prop("src");
			ClientService.post(client)
			.then(function success(response){
				if(response.data){
					$.jGrowl("Concluído com sucesso!");
					$scope.customers.push(response.data);
				} else 
					$.jGrowl("Erro ao concluír, tente novamente!");
			}, function error(response){
				$.jGrowl("Erro ao concluír o cliente, tente novamente!");
			});
		}
		
	};

	$scope.delete = function(clientId){
		$.confirm({
			title: 'Atenção',
			content: 'Tem certeza que deseja excluír o cliente ?',
			animation: 'Rotate',
			buttons: {
				confirm: {
					text: 'Confirmar',
		            btnClass: 'btn-warning',
		            keys: ['enter', 'shift'],
		            action: function(){
						//request 
						ClientService.delete(clientId)
						.then(function success(response){
							if (response.data == "deleted") {
								$scope.loadCustomers();
								$.jGrowl("Deletado com sucesso!");
							} else {
								$.jGrowl("Erro ao excluir o cliente, tente novamente!");
							}
						}, function error(response){
							$.jGrowl("Erro ao excluir o cliente, tente novamente!");
						});		
						//end request
		        	}
				},
				cancel: {
					text: 'Cancelar',
		            btnClass: 'btn-dark',
		            keys: ['enter', 'shift']
				}
			}	
		});
	};

	//load states	
	$scope.satesLoad = function(){
		AddressService.satesLoad()
		.then(function sucess(response){
			$scope.states = response.data;
		}, function error(){
			$.jGrowl("Erro ao carregar lista de estados.");
		});
	};

	//load cities
	$scope.citiesLoad = function(stateId){
		AddressService.citiesLoad(stateId)
		.then(function sucess(response){
			$scope.cities = response.data;
			document.getElementById("city").options[0].disabled = true;
		},function error(){
			$.jGrowl("Erro ao carregar lista de cidades");
		});			
	};

	//ready document jquery
	$(function(){
		$("#file").change(function(event){
			
			let nome = $(this).val();
			let extensao = nome.split(".")[1].toUpperCase();
			
			
			if (extensao != "JPEG" && extensao != "PNG" && extensao != "JPG") {
				$.jGrowl("O arquivo selecionado não é uma foto, selecione um arquivo com extensão jpeg, png ou jpg");
			} else {
				
				var reader = new FileReader();
				reader.onloadend = function (event) {
					$("#photo").attr("src",event.target.result);
				};
				reader.readAsDataURL(event.target.files[0]);
			}
		});	
	});
});