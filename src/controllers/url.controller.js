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
    await Url.create({
      shortId: shortId,
      redirectURL: url,
      visitHistory: [],
    });
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

const handleRedirectShortUrl = async (req, res) => {
  const { shortURL } = req.params;

  if (!shortURL) {
    res.json({
      status: 400,
      message: "Url required",
    });
  } else {
    try {
      // Find the URL entry by shortId
      const urlEntry = await Url.findOne({ shortId: shortURL });

      if (!urlEntry) {
        return res.status(404).json({ success: false, message: "Invalid URL" });
      }

      // Get the real user IP
      const userIP = req.headers["x-forwarded-for"] || req.ip;

      // Push new visitor entry with timestamp & IP address
      urlEntry.visitHistory.push({
        timestamp: Date.now(),
        ip: userIP || null, // Stores visitor's IP
      });

      // Save updated URL entry
      await urlEntry.save();

      // Redirect to the actual URL
      res.redirect(urlEntry.redirectURL);
    } catch (error) {
      console.error("Error tracking visit:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
};

module.exports = { handleGenerateShortURL, handleRedirectShortUrl };
