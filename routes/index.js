var express = require("express");
var router = express.Router();

let getVideoFileNames = require("../controllers/videoStreamer.js")
  .videoFileNames;

// fileNames.array.forEach(fileName => {
//   fileNamesString += `<li>${fileName}</li>`
// })

/* GET home page. */
router.get("/", function(req, res) {
  let videoFileNamaes = getVideoFileNames();
  videoFileNamaes.then(fileNames => {
    console.log("Rendering page... ", fileNames);
    res.render("index.ejs", { videoFileNames: fileNames });
  });
});

module.exports = router;
