const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
  username: String,
  email: String,
  name: String,
  lastname: String,
  service: String,
  id_doc_firestore: String,
  photo: String,
  datebirth: Date
})

const model = mongoose.model('User', mySchema)
module.exports = model