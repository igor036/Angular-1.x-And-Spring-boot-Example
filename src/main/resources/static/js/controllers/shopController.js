app.controller("shopController", function($scope, BookService) {

	//var's
	$scope.pag_index = 1;
	$scope.cart = [];

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

	$scope.hideModal = function() {
		$(".min-modal").hide("fast");
	};


	$(".close-modal").click(function() {
		$scope.hideModal();
	});

	$scope.addToCart = function() {
		
		let item = { 
				"book": $scope.book, 
				"amount": $scope.amount
			};

		$scope.cart.push(item);
		$scope.hideModal();
		$.jGrowl("O livro foi adicionado ao carrinho de compras!");
	};

	$scope.showCart = function(){
		$("#shop").hide("fast");
		$("#cart").show("fast");
	};

	$scope.showShop = function(){
		$("#cart").hide("fast");
		$("#shop").show("fast");
	};

	$scope.removeFromCart = function(item){
		$scope.cart = $scope.cart.filter(function(arg){
			return arg.book.id != item.book.id;
		});
	};
});