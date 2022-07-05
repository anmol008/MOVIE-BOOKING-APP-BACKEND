const dbConfigUrl = require("../config/db.config");
const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfigUrl.url;




db.user = require("./user.model")(mongoose);
db.artist = require("./artist.model")(mongoose);
db.genre = require("./genre.model")(mongoose);
db.movie = require("./movie.model")(mongoose);

module.exports = db;