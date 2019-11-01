const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
  type: String,
  public: Boolean,
  title: String,
  images: Array,
  char_min: Number,
  char_max: Number,
  user_id: {
    type: Schema.ObjectId,
    ref: "User"
  },
  geocommunity_uuid: {
    type: Schema.ObjectId,
    ref: "Geocommunity"
  }
});
