const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    votes: { type: Number, default: 0 },
    comments: [
      {
        user: String,
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", StorySchema);
