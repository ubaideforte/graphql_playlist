const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
  title: String,
  genre: String,
  rating: Number,
});

module.exports = model("Books", BookSchema);
