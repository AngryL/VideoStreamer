const express = require("express");
const router = express.Router();
const path = require("path");
const streamer = require("../controllers/videoStreamer.js").videoStream
const videoStreamer = new streamer()


let directoryPath = path.join(__dirname, "../", "videos");

router.get("/videos", function(req, res) {
  videoStreamer.streamVideo(req, res)
});

module.exports = router;