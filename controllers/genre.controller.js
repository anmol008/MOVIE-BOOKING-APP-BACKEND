const Genre = require("../models").genre;

exports.findAllGenres = (req, res) => {
  Genre.find({})
  .then(data => {
    res.send(data);
    })
    
    .catch((err) => {
      res.status(500).send({
        message: "Some Error Occured while fetching genres",
      });
    });
}; 