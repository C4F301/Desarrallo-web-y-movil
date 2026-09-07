const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
    nombre: String,
    ingredientes: [String],
    precio: Number
});

module.exports = mongoose.model('Pizza', pizzaSchema);