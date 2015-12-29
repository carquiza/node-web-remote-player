app.controller('playerController', ['$scope', '$http', function($scope, $http){
	$scope.player_status = "";
	$scope.filenames = ["aa",'bb','adsfasdf'];

	$http.get('../files').then(
		function (res){
			$scope.filenames = res.data;
		},
		function (err){
			$scope.player_status = err;
		}
	);
}]);