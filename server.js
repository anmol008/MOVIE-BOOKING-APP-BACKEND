const express = require("express");
const app = express();

const db = require("./models");
const PORT = 8085;
const cors = require("cors");
const bodyParser = require('body-parser');
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const router = require("express").Router();



const artistRouter = require("./routes/artist.routes")(router);
const genreRouter = require("./routes/genre.routes")(router);
const movieRouter = require("./routes/movie.routes")(router);
const userRouter = require("./routes/user.routes")(router);
app.use("/api", movieRouter, genreRouter, artistRouter);
app.use("/auth", userRouter);
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Upgrad Movie booking application development.",
  });
});

app.listen(PORT, () => {
  console.log("Connection Established on PORT ", PORT);
});
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  }); 