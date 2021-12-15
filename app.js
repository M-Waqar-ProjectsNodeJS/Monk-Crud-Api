var express = require("express");
var cors = require("cors");
var morgan = require("morgan");
var bookRouter = require("./api/route/books");

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/", bookRouter);

app.use((req, res, next) => {
  const error = new Error("Route not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

const port = 3000;
app.listen(port, (error) => {
  if (error) console.log(`Error: ${error}`);
  else console.log(`Server is listening on Port: ${port}`);
});
