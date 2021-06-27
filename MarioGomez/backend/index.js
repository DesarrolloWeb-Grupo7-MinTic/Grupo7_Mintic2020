const variables = require("./variables.jsx");
const express = require("express");
const mongoose = require("mongoose");
const UserSchema = require("./user.js");

const app = express();
const router = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect(
  `mongodb+srv://${variables.username}:${variables.password}@cluster0.7nxtf.mongodb.net/MinTic2020?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const dicValues = (req) => {
  let temp = {};
  Object.keys(req.body).forEach((key) => {
    temp[key] = req.body[key];
  });
  return temp;
};

router.get("/", function (req, res) {
  res.send("Inicio de mi API");
});

router.get("/getusers", function (req, res) {
  UserSchema.find((err, datos) => {
    err && console.log(err);
    res.send(datos);
  });
});

router.post("/createuser", function (req, res) {
  let newUser = new UserSchema({
    documentType: req.body.documentType,
    documentNumber: req.body.documentNumber,
    name: req.body.name,
    lastname: req.body.lastname,
    street: req.body.street,
    email: req.body.email,
    phone: req.body.phone,
    cellphone: req.body.cellphone,
    link: req.body.link,
    profileDescription: req.body.profileDescription,
  });
  newUser.save((err, datos) => {
    err && console.log(err);
    res.send("Usuario Guardo correctamente");
  });
});

router.put("/edituser", function (req, res) {
  let modifiedValues = dicValues(req);
  const myQuery = { documentNumber: req.body.documentNumber };

  UserSchema.updateOne(myQuery, modifiedValues, (err, datos) => {
    err && console.log(err);
    datos.n >= 1
      ? res.send("Se modifico el usuario con exito")
      : res.send("No hay usuario asociado a ese numero de cedula");
  });
});

router.delete("/deleteuser", function (req, res) {
  const myQuery = { documentNumber: req.body.documentNumber };
  UserSchema.find(myQuery, function (err, docs) {
    docs.length >= 1
      ? UserSchema.deleteOne(myQuery, (err) => {
          err ? console.log(err) : res.send("Se Elimino el usuario con exito");
        })
      : res.send("Hubo un error inesperado");
  });
});

app.use(router);
app.listen(3500, () => {
  console.log("Servidor activo");
});
