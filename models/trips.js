const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  date: { type: Date, required: true },     // date/heure du départ
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Trip", tripSchema);