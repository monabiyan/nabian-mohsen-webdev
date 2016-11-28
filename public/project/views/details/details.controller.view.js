/**
 * Created by mohsennabian on 11/12/16.
 */


(function(){
    angular
        .module("MovieApp")

        .controller("DetailsController", DetailsController)



    function DetailsController(MovieService,$routeParams) {
        var vm=this;
        var imdbID=$routeParams.imdbID;
        vm.title=$routeParams.title;


        function init(){
            var url="http://www.omdbapi.com/?i="+imdbID;
            response=MovieService.searchMovieByImdbID(url);
            response
                .success(function(result){
                    vm.movie=result
                })
        }
        init();




    }

})();