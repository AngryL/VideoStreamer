const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const logger = require("morgan");

const indexRouter = require("./routes/index.js");
const videosRouter = require("./routes/videos.js");


var app = express();

app.use(express.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/", indexRouter)
app.use("/", videosRouter)



app.listen(3000)


module.exports = app;
