const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    redirectURL: {
      type: String,
      required: true,
      trim: true,
    },
    visitHistory: [
      {
        timestamp: { type: Number }, // trim is not needed for Number type
        location: { type: String, trim: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UrlModel = mongoose.model("Url", UrlSchema);

module.exports = UrlModel;
