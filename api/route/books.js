var express = require("express");
var monk = require("monk");

var url = "localhost:27017/TestDb";
var router = express.Router();

router.get("/api/books", async (req, res, next) => {
  const db = monk(url);
  const collection = db.get("Books");
  const data = collection.find({});
  data
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((error) => {
      next(error);
    });
});
router.get("/api/books/:id", async (req, res, next) => {
  const db = monk(url);
  const collection = db.get("Books");
  const newId = db.id(req.params.id);
  const data = collection.findOne({ _id: db.id(newId) });
  data
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => {
      next(error);
    });
});
router.post("/api/books", async (req, res, next) => {
  const db = monk(url);
  const collection = db.get("Books");
  const book = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  collection
    .insert(book)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      next(error);
    });
});
router.put("/api/books", async (req, res, next) => {
  const db = monk(url);
  const collection = db.get("Books");
  const updatedid = req.body.id;
  const book = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  collection
    .update({ _id: db.id(updatedid) }, { $set: book })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      next(error);
    });
});
router.delete("/api/books", async (req, res, next) => {
  const db = monk(url);
  const collection = db.get("Books");
  collection
    .remove({ _id: db.id(req.body.id) })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
