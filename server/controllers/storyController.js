const Story = require("../models/Story");

exports.getStories = async (req, res) => {
  const stories = await Story.find().sort({ createdAt: -1 });
  res.json(stories);
};

exports.getStory = async (req, res) => {
  const story = await Story.findById(req.params.id);
  if (!story) return res.status(404).json({ message: "Not found" });
  res.json(story);
};

exports.createStory = async (req, res) => {
  const { title, description } = req.body;
  const story = new Story({ title, description });
  await story.save();
  res.status(201).json(story);
};
