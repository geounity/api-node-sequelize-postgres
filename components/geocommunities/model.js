const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: String,
  level: Number,
  in_geo: {
    // Dentro de otra geocomunidad
    type: Schema.ObjectId,
    ref: "Geocommunity"
  },
  debates: Array,
  statics: Array,
  aims: Array
});

const model = mongoose.model("Geocommunity", mySchema);
module.exports = model;
