/**
 * Created by mohsennabian on 11/12/16.
 */
(function() {
    angular
        .module("MovieApp")
        .factory("MovieService", MovieService);

    function MovieService($http) {

        var api = {
            "searchMovieByTitle": searchMovieByTitle,
            "searchMovieByImdbID": searchMovieByImdbID

        };
        return api;


        function searchMovieByTitle(url) {
            return $http.get(url);
        }

        function searchMovieByImdbID(url) {
            return $http.get(url);
        }
    }


})();