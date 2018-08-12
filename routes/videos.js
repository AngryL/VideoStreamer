const express = require("express");
const router = express.Router();
const streamer = require("../controllers/videoStreamer.js").videoStream
const videoStreamer = new streamer()

router.get("/videos", function(req, res) {
  videoStreamer.streamVideo(req, res)
});

module.exports = router;