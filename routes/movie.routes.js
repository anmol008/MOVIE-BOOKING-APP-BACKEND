module.exports = (router) => {
    const movieController = require("../controllers/movie.controller");
  
    router.get("/movies", movieController.findAllMovies);
  
    
    router.get("/movies/:movieId", movieController.findOne);
    router.get("/movies:id/shows", movieController.findShows);
    return router;
  }