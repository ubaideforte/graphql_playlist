const { Schema, model } = require("mongoose");

const AuthorSchema = new Schema({
  name: String,
  age: Number,
  //   books: Array,
});

module.exports = model("Authors", AuthorSchema);
