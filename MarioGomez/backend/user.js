const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  documentType: String,
  documentNumber: String,
  name: String,
  lastname: String,
  street: String,
  email: String,
  phone: String,
  cellphone: String,
  link: String,
  link: String,
  profileDescription: String,
});

module.exports = mongoose.model("user", UserSchema, "users");
