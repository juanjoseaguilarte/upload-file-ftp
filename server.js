const express = require("express");
const cors = require("cors");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

require("dotenv").config();

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
    host: process.env.HOST,
    user: process.env.USERS,
    password: process.env.PASSWORD,
    port: process.env.PORT,
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
