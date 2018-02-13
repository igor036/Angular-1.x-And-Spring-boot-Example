app.controller("shopController", function($scope, BookService , ClientService) {

	load();	

	//var's
	$scope.pag_index = 1;
	$scope.clients = [];
	$scope.sale = {	
			client: NaN,
			products: []
		}

	//function's
	$scope.loadBooks = function() {
		BookService.loadBooks($scope.pag_index).then(function(response) {
			$scope.books = response.data;
			if ($scope.books.length == 0 && $scope.pag_index > 1) {
				$scope.pag_index--;
				$scope.loadBooks();
			}
			$scope.loadPagesCount();
		}, function() {
			$scope.errorMsg = "Ops, aconteceu um erro na sua solicitação, por favor, tente novamente.";
		});
	};

	$scope.loadPagesCount = function() {
		BookService.loadPagesCount().then(function(response) {
			if (response.data >= 0) {
				$scope.pagesCount = response.data;
			} else
				$.jGrowl("Erro ao carregar total de páginas");
		}, function() {
			$.jGrowl("Erro ao carregar total de páginas");
		});
	};

	$scope.nextPag = function() {
		$scope.pag_index++;
		$scope.loadBooks();
	};

	$scope.previousPag = function() {
		$scope.pag_index--;
		$scope.loadBooks();
	};

	$scope.showModal = function(book, event) {
		//event.pageX
		$scope.book = book;
		$scope.amount = 1;
		$(".min-modal")
			.show("fast")
			.offset({left: event.pageX, top: event.pageY});
	};

	$scope.addToCart = function() {

		var exist = false;

		for (var i = 0; i < $scope.sale.products.length; i++) {
			if ($scope.sale.products[i].book.id == $scope.book.id) {
				$scope.sale.products[i].amount += $scope.amount; 
				exist = true;
			}
		}

		if (!exist) {

			let item = { 
				"book": $scope.book, 
				"amount": $scope.amount
			};

			$scope.sale.products.push(item);
			$scope.hideModal();

		}
		
		$.jGrowl("O livro foi adicionado ao carrinho de compras!");
	};

	$scope.hideModal = function() {
		$(".min-modal").hide("fast");
	};


	$(".close-modal").click(function() {
		$scope.hideModal();
	});

	$scope.showCart = function(){
		$("#shop").hide("fast");
		$("#cart").show("fast");
		$scope.hideModal();
	};

	$scope.showShop = function(){
		$("#cart").hide("fast");
		$("#shop").show("fast");
	};

	$scope.removeFromCart = function(item){
		$scope.sale.products = $scope.sale.products.filter(function(arg){
			return arg.book.id != item.book.id;
		});
		$.jGrowl("Removido com sucesso!");
	};

	$scope.clientSearch = function(search){
		if (search) {
			ClientService.clientSearch(search).then(function(response){
				if (response.data) {
					$scope.clients = response.data;
				 }
			});
		} else 
			$scope.clients = [];
	};

	$scope.selectClient = function(client){
		console.log(client);
		$scope.sale.client = client;
		$scope.clients = [];
		$scope.search = client.name;
	};
	
	$scope.total = function(){

		let totalValue =  0;
		$scope.sale.products.forEach(function(product) {
			totalValue += product.amount * product.book.price;
		});

		return totalValue;
	};

	$scope.purchase = function(){

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
						$scope.sale = $scope.sale;
		        	}
				},
				cancel: {
					text: 'Cancelar',
		            btnClass: 'btn-dark',
		            keys: ['enter', 'shift']
				}
			}	
		});

		$scope.sale = $scope.sale;
	};

	/*
	 * ------------------ draged modal ---------------------
	 */

	var isDragging = false;
	var primaryLocation;

	$("#shop")
	.mousedown(function(event) {
		isDragging = true;
		primaryLocation =  {
			left: event.pageX,
			top: event.pageY 
		};

	})
	.mousemove(function(event) {

		if(isDragging) {
			
			let modal = $(".min-modal");
			let location = {
				left: event.pageX - modal.width()/2,
				top:  event.pageY - modal.height()/2 
			};

			/* not work
			let location = {
				left: modal.offset().left + event.pageX - primaryLocation.left,
				top:  modal.offset().top + event.pageY - primaryLocation.top
			};
			*/

			modal.offset(location);
		}
	 })
	.mouseup(function() {
		isDragging = false;
		console.log("up");
	});

});