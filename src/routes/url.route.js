const express = require("express");
const { handleGenerateShortURL } = require("../controllers/url.controller");
const router = express.Router();

router.post("/short-url", handleGenerateShortURL);

module.exports = router;
