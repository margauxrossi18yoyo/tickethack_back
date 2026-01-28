//quand tu “Purchase”, tu transformes les items du panier en bookings.

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);