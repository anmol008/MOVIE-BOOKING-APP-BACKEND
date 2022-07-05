module.exports = (router) => {
    const artistController = require("../controllers/artist.controller");
  
    router.get("/artist", artistController.findAllArtists);
  
    
    return router;
  } 