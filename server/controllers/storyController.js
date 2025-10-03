const Story = require("../models/Story");
const sharp = require("sharp");
const path = require("path");


exports.createStory = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const { name, title, description } = req.body;

    if (!name || !title || !description)
      return res.status(400).json({ message: "All fields required" });

    let imageUrl = null;
    let thumbnailUrl = null;

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
      const thumbPath = `uploads/thumb_${req.file.filename}`;
      await sharp(req.file.path).resize({ width: 300 }).toFile(thumbPath);
      thumbnailUrl = `/uploads/thumb_${req.file.filename}`;
    }

    const story = await Story.create({
      name,
      title,
      description,
      imageUrl,
      thumbnailUrl,
      votes: 0,
      comments: [],
    });

    res.status(201).json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.voteStory = async (req, res) => {
  try {
    const { type } = req.body; 

    let update = {};
    if (type === "up") update = { $inc: { votes: 1 } };
    else if (type === "down") update = { $inc: { votes: -1 } };
    else return res.status(400).json({ message: "Invalid vote type" });

    const story = await Story.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true } 
    );

    if (!story) return res.status(404).json({ message: "Story not found" });

    res.json({ votes: story.votes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


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
