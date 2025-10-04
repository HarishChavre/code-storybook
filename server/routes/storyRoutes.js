const express = require("express");
const router = express.Router();
const { createStory, getAllStories, getStoryById, voteStory, addComment } = require("../controllers/storyController");
const auth = require("../middleware/auth");

// Routes
router.get("/", getAllStories);          // Get all stories
router.get("/:id", getStoryById);        // Get single story
router.post("/", auth, createStory);     // Create story (auth required)
router.post("/:id/vote", auth, voteStory);    // Vote (auth required)
router.post("/:id/comment", auth, addComment); // Comment (auth required)

module.exports = router;
