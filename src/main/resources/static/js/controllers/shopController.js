app.controller("shopController",function($scope,BookService) {

    //var's
    $scope.pag_index = 1;

    //function's
    $scope.loadBooks = function (){
		BookService.loadBooks($scope.pag_index).then(function(response){
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
		BookService.loadPagesCount().then(function(response){
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
});