app.controller("bookController",function($scope, $http, $routeParams){
	
	load();

	//variable's and object's
	$scope.config_text = {headers: { 'Accept': 'text/plain'}};
	$scope.config_json = {headers: {'Content-Type': 'application/json'}};
	$scope.pag_index = 1;

	//load client for edit
	if($routeParams.id){
		$http({
			method: "GET",
			url: "/books/"+$routeParams.id,
		}).then(function(response){
			if (response.data) {
				$("#submit").val("Editar cliente");
				$("#msg").html("Editar cliente");
				$scope.book = response.data;
				
				//load photo
				$("#photo").prop("src",$scope.book.photo);
				
			 }else
				$scope.errorMsg = "Livro não encontrado!";
		},function(){
			$scope.errorMsg = "Ops, aconteceu um erro na sua solicitação, por favor, tente novamente.";
		});
	}

	//function's
	$scope.loadBooks = function (){
		$http({
			method: "GET",
			url: "/books?pagIndex="+$scope.pag_index,
		}).then(function(response){
			$scope.books = response.data;
			if ($scope.books.length == 0 && $scope.pag_index > 1){
				$scope.pag_index--;
				$scope.loadBooks();
			}
			$scope.loadPagesCount();
		},function(){
			$scope.errorMsg = "Ops, aconteceu um erro na sua solicitação, por favor, tente novamente.";
		});
	};

	$scope.loadPagesCount = function(){
		$http({
			method: "GET",
			url: "/books/pagesCount",
		}).then(function(response){
			if (response.data >= 0) {
				$scope.pagesCount = response.data;
			 }else
			 	$.jGrowl("Erro ao carregar total de páginas");
		},function(){
			$.jGrowl("Erro ao carregar total de páginas");
		});
	};

	$scope.nextPag = function(){
		$scope.pag_index++;
		$scope.loadBooks();
	};

	$scope.previousPag = function(){
		$scope.pag_index--;
		$scope.loadBooks();
	};

	$scope.post = function(book){
		console.log(book);
		if (validationSubmit('form'))  {
			$scope.book.photo = $("#photo").prop("src");
			$http
			.post("/books/save/", book, $scope.config_json)
			.then(function success(response){
				if(response.data){
					$.jGrowl("Concluído com sucesso!");
					$scope.books.push(response.data);
				} else 
					$.jGrowl("Erro ao concluír, tente novamente!");
			}, function error(response){
				$.jGrowl("Erro ao concluír o cliente, tente novamente!");
			});
		}
		
	};

	$scope.delete = function(bookId){
		$.confirm({
			title: 'Atenção',
			content: 'Tem certeza que deseja excluír o livro ?',
			animation: 'Rotate',
			buttons: {
				confirm: {
					text: 'Confirmar',
		            btnClass: 'btn-warning',
		            keys: ['enter', 'shift'],
		            action: function(){
						//request 
						console.log(bookId);
						$http
						.delete("/books/"+bookId, $scope.config_text)
						.then(function success(response){
							if (response.data == "deleted") {
								$scope.loadBooks();
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

	$scope.providerSearch = function(search){
		if (search) {
			$http({
				method: "GET",
				url: "/providers/search?name="+search,
			}).then(function(response){
				if (response.data) {
					$scope.providers = response.data;
				 }
			});
		} else 
			$scope.providers = [];
	};
	
	$scope.selectProvider = function(provider){
		$scope.book.provider = provider;
		$scope.providers = [];
		$scope.search = provider.name;
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