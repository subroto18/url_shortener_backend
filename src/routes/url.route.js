const express = require("express");
const {
  handleGenerateShortURL,
  handleRedirectShortUrl,
} = require("../controllers/url.controller");
const router = express.Router();

router.post("/short-url", handleGenerateShortURL);

router.get("/:shortURL", handleRedirectShortUrl);

module.exports = router;
