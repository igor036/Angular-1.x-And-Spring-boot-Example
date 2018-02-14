app.controller("shopController", function($scope, $routeParams, $location, BookService , ClientService, ShopService) {

	load();	

	//var's
	$scope.pag_index = 1;
	$scope.clients = [];

	if(sessionStorage.getItem('cart'))
		$scope.cart = JSON.parse(sessionStorage.getItem('cart'));
	else
		$scope.cart = [];

	//function's
	$scope.loadCart = function(){
		$scope.sale = [];
		$scope.cart.forEach(function(item){
			BookService.book(item.book.id).then(function(response){
				$scope.sale.push( {book: response.data, amount: item.amount} );
			});
		});
	};

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

		for (var i = 0; i < $scope.cart.length; i++) {
			if ($scope.cart[i].book.id == $scope.book.id) {
				$scope.cart[i].amount += $scope.amount; 
				exist = true;
			}
		}

		if (!exist) {

			let item = { 
				book: {id: $scope.book.id} , 
				amount: $scope.amount
			};

			$scope.cart.push(item);
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

	$scope.goToCart = function(){
		sessionStorage.setItem('cart', JSON.stringify($scope.cart));
		$location.path("/cart");
	};

	$scope.removeFromCart = function(item){
		
		$scope.cart = [];
		$scope.sale = $scope.sale.filter(function(arg){
			
			if (arg.book.id != item.book.id) {
				$scope.cart.push({book: arg.book.id, amount: arg.amount});
				return true;
			}
		});

		sessionStorage.setItem('cart', JSON.stringify($scope.cart));
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
		$scope.client = client;
		$scope.clients = [];
		$scope.search = client.name;
		console.log($scope.client);
	};
	
	$scope.total = function(){

		let totalValue =  0;
		$scope.sale.forEach(function(item) {
			totalValue += item.amount * item.book.price;
		});

		return totalValue;
	};

	$scope.purchase = function(){
		$.confirm({
			title: 'Atenção',
			content: '<h3><b>Confira os dados da compra!</b></h3><br/>'+
					 '<b>Client: </b>'+$scope.client.name+"<br/>"+
					 '<b>Total de itens: </b>'+$scope.cart.length+"<br/>"+
					 '<b>Total da compra: </b>R$'+$scope.total(),

			animation: 'Rotate',
			buttons: {
				confirm: {
					text: 'Confirmar',
		            btnClass: 'btn-warning',
		            keys: ['enter', 'shift'],
		            action: function(){
						
						let sale = {
							products: $scope.cart,
							client: {id: $scope.client.id} 
						};

						ShopService.purchase(sale).then(function(){
							$.jGrowl("Compra finalizada com sucesso!");
						});
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