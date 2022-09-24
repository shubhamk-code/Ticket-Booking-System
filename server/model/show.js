const mongoose = require("mongoose");

const show = new mongoose.Schema({
    movieId: String,
    show: Date,
    time: String,
    platinumRows: { type: Array, "default": [] },
    platinumRate: String,
    goldRows: { type: Array, "default": [] },
    goldRate: String,
    silverRows: { type: Array, "default": [] },
    silverRate: String,
    bookedSeats: { type: Array, "default": [] }
});

module.exports = mongoose.model("show", show);
