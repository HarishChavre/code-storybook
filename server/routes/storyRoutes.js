const express = require("express");
const router = express.Router();
const { getStories, getStory, createStory } = require("../controllers/storyController");

router.get("/", getStories);
router.get("/:id", getStory);
router.post("/", createStory);

module.exports = router;
