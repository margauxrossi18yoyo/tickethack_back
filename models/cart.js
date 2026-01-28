const mongoose = require("mongoose"); //On importe Mongoose, la librairie qui permet à Node.js de communiquer avec MongoDB.

const cartSchema = new mongoose.Schema( //On crée un schéma appelé cartSchema.
  {
    trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true }
  }, 
     // trip = Nom du champ dans le panier. Un panier contient un trajet.
     // type: mongoose.Schema.Types.ObjectId = Ce champ ne contient pas un texte, mais l’ID d’un document Mongo. On ne copie pas toutes les infos du trajet, on garde que l'identifiant
     // ref: "trips" = Ça dit à Mongoose : “Cet ObjectId correspond à un document de la collection trips”
     // required: true = Un item du panier doit obligatoirement être lié à un trajet.
  { timestamps: true }
  //Mongo ajoute une option automatiquement : - createdAt → date d’ajout au panier
  // -updatedAt → date de dernière modification
  // Utile pour trier les éléments du panier.
);

module.exports = mongoose.model("carts", cartSchema);
// On crée le modèle carts.
//Ça permet ensuite d’écrire dans les routes : Cart.create(...) ; Cart.find(...) ; Cart.deleteOne(...)
//Et Mongo créera (si besoin) une collection appelée carts


//le panier contient une liste d’items, chaque item pointe vers un Trip.