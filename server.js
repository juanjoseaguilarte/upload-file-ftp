const express = require("express");
const cors = require("cors");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/upload/"));
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, 'image.jpeg');
  },
});
const upload = multer({ storage });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/upload", upload.single("file"), (req, res) => {
  const config = {
    host: "home496283475.1and1-data.host",
    user: "u74894069",
    password: "H7u91e53!!",
    port: 21,
  };

  const Client = require("ftp");
  const { addAbortSignal } = require("stream");
  const c = new Client();
    
  c.on("ready", function () {
    c.put(
      __dirname + "/upload/image.jpeg",
      "/public/image.jpeg",
      function (err) {
        if (err) throw err;
        c.end();
      }
    );
  });

    c.connect(config);
    res.redirect("/");
});

app.listen(8080, () => console.log("Servidor arrancado"));
