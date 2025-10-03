const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const storyController = require("../controllers/storyController");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), storyController.createStory);
router.get("/", storyController.getAllStories);
router.post("/:id/vote", storyController.voteStory);
router.post("/:id/comment", storyController.addComment);

module.exports = router;
