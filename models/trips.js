const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    departure: { type: String, required: true, trim: true },
    arrival: { type: String, required: true, trim: true },

    // Date + heure du départ (sert à afficher l'heure et filtrer la journée)
    date: { type: Date, required: true },

    // Prix affiché
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

// Index (cohérent avec le schéma)
tripSchema.index({ departure: 1, arrival: 1, date: 1 });

module.exports = mongoose.model("Trip", tripSchema);