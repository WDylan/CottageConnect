const express = require("express");
const router = express.Router();
const pictureController = require("../controllers/pictureController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
});

router.get("/", pictureController.findAll);
router.get("/picture/:id", pictureController.findById);
router.get("/image/:imageName", pictureController.getImage);
router.get("/cottage/:id", pictureController.findCottagePicture);
router.post("/", upload.single("photo"), pictureController.create);
router.put("/picture/:id", pictureController.update);
router.delete("picture/:id", pictureController.delete);

module.exports = router;
