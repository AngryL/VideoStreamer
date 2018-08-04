const fs = require("fs");
const util = require("util");
const path = require("path");

const readDirectory = util.promisify(fs.readdir);

let directoryPath = path.join(__dirname, "../", "videos");

let videoFileNames = readDirectory(directoryPath);

function getVideoFileNames() {
  let videoFileNames = readDirectory(directoryPath);
  return videoFileNames
}

class StreamVideo {
  constructor() {}

  streamVideo(req, res) {
    console.log("Request Headers... " +JSON.stringify(req.headers))
    let videoTitle = req.query.video;
    let videoFilePath = path.join(directoryPath, videoTitle);
    const stat = fs.statSync(videoFilePath);
    const fileSize = stat.size;
    const range = req.headers.range;
  
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize -1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(videoFilePath, { start: start, end: end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      };
  
      console.log("Head: ", head)
  
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      console.log("No Range")
  
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4"
      };
      res.writeHead(200, head);
      fs.createReadStream(videoFilePath).pipe(res);
    }
  }

  streamRanges(req, res) {

  }

  streamFull(req, res) {

  }
}

module.exports = { videoFileNames: getVideoFileNames, videoStream: StreamVideo };
