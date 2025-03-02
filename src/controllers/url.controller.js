const { nanoid } = require("nanoid");
const Url = require("../models/url.model");
const validateURL = require("../validators/url.validate");
const handleGenerateShortURL = async (req, res) => {
  const { url } = req.body;
  const shortId = nanoid(8);

  if (!url) {
    res.json({
      status: 400,
      message: "Url required",
    });
  } else if (validateURL(url)) {
    //   await Url.create({
    //     shortId: shortId,
    //     redirectURL: url,
    //     visitHistory: [],
    //   });
    return res.json({
      short_url: shortId,
    });
  } else {
    res.json({
      status: 400,
      message: "Invalid Url. Try with valid one",
    });
  }
};

module.exports = { handleGenerateShortURL };
