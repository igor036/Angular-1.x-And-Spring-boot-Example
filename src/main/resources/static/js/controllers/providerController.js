app.controller("providerController",function($scope, $routeParams,ProviderService, AddressService){
	
	load();

	//variable's and object's
	$scope.config_text = {headers: { 'Accept': 'text/plain'}};
	$scope.config_json = {headers: {'Content-Type': 'application/json'}};
	$scope.pag_index = 1;

	//load providers for edit
	if($routeParams.id){
		
		ProviderService.provider($routeParams.id).then(function(response){
			if (response.data) {
				$("#submit").val("Editar fornecedor");
				$("#msg").html("Editar fornecedor");
				$scope.provider = response.data;
				
				//!!field accepts string only
				$scope.citiesLoad($scope.provider.city.state.id);
				$scope.stateId = ""+$scope.provider.city.state.id;

				//!!
				
				//load photo
				$("#photo").prop("src",$scope.provider.photo);
				
			 }else
				$scope.errorMsg = "Fornecedor não encontrado!";
		},function(){
			$scope.errorMsg = "Ops, aconteceu um erro na sua solicitação, por favor, tente novamente.";
		});
	}

	//function's
	$scope.loadProviders = function (){
		ProviderService.loadProviders($scope.pag_index).then(function(response){
			$scope.providers = response.data;
			if ($scope.providers.length == 0 && $scope.pag_index > 0){
				$scope.pag_index--;
				$scope.loadProviders();
			}
			$scope.loadPagesCount();
		},function(){
			$scope.errorMsg = "Ops, aconteceu um erro na sua solicitação, por favor, tente novamente.";
		});
	};

	$scope.loadPagesCount = function(){
		ProviderService.loadPagesCount().then(function(response){
			if (response.data) {
				$scope.pagesCount = response.data;
			 }else
			 	$.jGrowl("Erro ao carregar total de páginas");
		},function(){
			$.jGrowl("Erro ao carregar total de páginas");
		});
	};

	$scope.nextPag = function(){
		$scope.pag_index++;
		$scope.loadProviders();
	};

	$scope.previousPag = function(){
		$scope.pag_index--;
		$scope.loadProviders();
	};

	$scope.post = function(provider){
		
		if (validationSubmit('form'))  {
			
			$scope.provider.photo = $("#photo").prop("src");
			ProviderService.post($scope.provider).then(function success(response){
				if(response.data){
					$.jGrowl("Concluído com sucesso!");
					$scope.customers.push(response.data);
				} else 
					$.jGrowl("Erro ao concluír, tente novamente!");
			}, function error(response){
				$.jGrowl("Erro ao concluír o fornecedor, tente novamente!");
			});
		}
		
	};

	$scope.delete = function(providerId){
		$.confirm({
			title: 'Atenção',
			content: 'Tem certeza que deseja excluír o fornecedor ?',
			animation: 'Rotate',
			buttons: {
				confirm: {
					text: 'Confirmar',
		            btnClass: 'btn-warning',
		            keys: ['enter', 'shift'],
		            action: function(){
						//request 
						ProviderService.delete(providerId)
						.then(function success(response){
							if (response.data == "deleted") {
								$scope.loadProviders();
								$.jGrowl("Deletado com sucesso!");
							} else {
								$.jGrowl("Erro ao excluir o fornecedor, tente novamente!");
							}
						}, function error(response){
							$.jGrowl("Erro ao excluir o fornecedor, tente novamente!");
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