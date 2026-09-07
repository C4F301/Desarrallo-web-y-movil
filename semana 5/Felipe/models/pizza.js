
//significado: extrae el modulo mon de la libreria mongoose, si esta entre llaves es porque es un modulo que no es por defecto, si no que es un modulo que se exporta de manera individual
//const {mon} = require('mongoose');


//significado: extrae modulo por defecto de la liberia mongoose
const mongoose = require('mongoose');
const pizzaSchema = new mongoose.Schema({
    nombre: String,
    ingredientes: [String],
    precio: Number
});

module.exports = mongoose.model('Pizza', pizzaSchema);