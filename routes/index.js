var express = require('express');
var router = express.Router();

const Trip = require("../models/trips");
const Cart = require("../models/cart");
const Booking = require("../models/booking");

// 1) recherche de trajets, page d'accueil
//POST /trips/search
//Body: { departure, arrival, date: "YYYY-MM-DD" }
//Retour: { result: true, trips: [...] } ou { result: true, trips: [] }
router.post("/trips/search", (req, res) => {
  const { departure, arrival, date } = req.body;

  // si un champ manque → pas de recherche
  if (!departure || !arrival || !date) {
    return res.json({ result: false, trips: [] });
  }

  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  Trip.find({
    departure: departure.trim(),
    arrival: arrival.trim(),
    date: { $gte: start, $lte: end },
  })
    .sort({ date: 1 })
    .then((trips) => {
      if (trips.length > 0) {
        res.json({ result: true, trips: trips });
      } else {
        res.json({ result: false, trips: [] });
      }
    });
});



// 2) Ajouter au panier 
router.post("/cart", (req, res) => {
  if (!req.body.tripId) {
    return res.json({ result: false });
  }

  Cart.create({ trip: req.body.tripId })
    .then(() => {
      res.json({ result: true });
    });
});


// 3) Get cart
router.get("/cart", (req, res) => {
  Cart.find()
    .populate("trip")
    .then((data) => {
      if (data.length > 0) {
        res.json({ result: true, cart: data });
      } else {
        res.json({ result: false, cart: [] });
      }
    });
});



// 4)supprimer item CART avec la croix
// DELETE /cart/:id
// id de l'item cart et non pas le trip
router.delete("/cart/:id", (req, res) => {
  Cart.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ result: true });
    });
});


// 5) PURCHASE avec le bouton Purchase
 //POST /cart/purchase
 //Convertit tout le panier en bookings puis vide le panier car envoie apres dans mybookings
 router.post("/cart/purchase", (req, res) => {
  Cart.find().then(cartItems => {

    if (cartItems.length > 0) {

      cartItems.forEach(item => {
        Booking.create({ trip: item.trip });
      });

      Cart.deleteMany().then(() => {
        res.json({ result: true });
      });

    } else {
      res.json({ result: false });
    }

  });
});


// 6) page Bookings
 // GET /bookings
router.get("/bookings", (req, res) => {
  Booking.find()
    .populate("trip")
    .then((data) => {
      if (data.length > 0) {
        res.json({ result: true, bookings: data });
      } else {
        res.json({ result: false, bookings: [] });
      }
    });
});

module.exports = router;
 