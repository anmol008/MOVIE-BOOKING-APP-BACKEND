module.exports = (router) => {
    const genreController = require("../controllers/genre.controller");
  
    router.get("/genre", genreController.findAllGenres);
  
    
    return router;
  } 