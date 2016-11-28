/**
 * Created by mohsennabian on 11/12/16.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("SearchController", SearchController)


    function SearchController(MovieService,$routeParams) {


            console.log("hello from controller")
            var vm=this;
            vm.title=$routeParams.title;
            vm.searchMovieByTitle=searchMovieByTitle;

            if (vm.title!=null)
            {
                vm.searchMovieByTitle(vm.title)
            }


            function searchMovieByTitle(title) {
                console.log(title);
                var url="http://www.omdbapi.com/?s="+title;

                response=MovieService.searchMovieByTitle(url)

                response
                    .success(function(result){
                        vm.movies=result.Search
                    })

            }
    }


})();