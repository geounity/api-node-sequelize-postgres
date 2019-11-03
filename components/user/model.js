const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: String,
  lastname: String,
  service: String,
  link: String,
  id_doc_firestore: String,
  photo: String,
  datebirth: Date,
  showAge: Boolean,
  showName: Boolean
})

const model = mongoose.model('User', mySchema)
module.exports = model