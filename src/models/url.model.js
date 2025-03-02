const { Mongoose, default: mongoose } = require("mongoose");

const UrlSchema = new Mongoose(
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
        timestamp: { type: Number, trim: true },
        location: { type: String, trim: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const urlModel = mongoose.model("urlSchema", UrlSchema);

module.exports = urlModel;
