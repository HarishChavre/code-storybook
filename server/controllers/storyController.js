const Story = require("../models/Story");

// Create story
exports.createStory = async (req, res) => {
  try {
    const { name, title, description } = req.body;
    if (!name || !title || !description)
      return res.status(400).json({ message: "All fields required" });

    const story = await Story.create({ name, title, description });
    res.status(201).json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all stories
exports.getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single story by ID
exports.getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Vote story
exports.voteStory = async (req, res) => {
  try {
    const { type } = req.body;
    let update = {};
    if (type === "up") update = { $inc: { votes: 1 } };
    else if (type === "down") update = { $inc: { votes: -1 } };
    else return res.status(400).json({ message: "Invalid vote type" });

    const story = await Story.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json({ votes: story.votes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add comment
exports.addComment = async (req, res) => {
  try {
    const { user, text } = req.body;
    if (!user || !text) return res.status(400).json({ message: "All fields required" });

    const story = await Story.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: { user, text } } },
      { new: true }
    );
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json(story.comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
