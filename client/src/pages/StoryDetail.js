import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:5000/stories";

const StoryDetails = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [feedback, setFeedback] = useState({ open: false, message: "", severity: "success" });

  // Fetch story details
  const fetchStory = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      const found = res.data.find((s) => s._id === id);
      setStory(found);
    } catch (err) {
      console.error(err);
      setFeedback({ open: true, message: "Failed to load story", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStory();
  }, [id]);

  // Voting
  const handleVote = async (type) => {
    try {
      const res = await axios.post(`${API_BASE}/${id}/vote`, { type });
      setStory({ ...story, votes: res.data.votes });
    } catch (err) {
      console.error(err);
      setFeedback({ open: true, message: "Failed to vote", severity: "error" });
    }
  };

  // Add comment
  const handleAddComment = async () => {
    if (!comment.trim()) return;
    try {
      const res = await axios.post(`${API_BASE}/${id}/comment`, { user: "You", text: comment });
      setStory({ ...story, comments: res.data });
      setComment("");
      setFeedback({ open: true, message: "Comment added!", severity: "success" });
    } catch (err) {
      console.error(err);
      setFeedback({ open: true, message: "Failed to add comment", severity: "error" });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!story) {
    return <Typography sx={{ textAlign: "center", mt: 6 }}>Story not found.</Typography>;
  }

  return (
    <Container sx={{ py: 6 }}>
      {/* Title & Author */}
      <Typography variant="h3" sx={{ mb: 2 }}>
        {story.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        By {story.name} | Votes: {story.votes || 0}
      </Typography>

      {/* Images */}
      {story.thumbnailUrl && (
        <Box
          component="img"
          src={`http://localhost:5000${story.thumbnailUrl}`}
          alt="Thumbnail"
          sx={{ width: 200, mb: 2, borderRadius: 2 }}
        />
      )}
      {story.imageUrl && (
        <Box
          component="img"
          src={`http://localhost:5000${story.imageUrl}`}
          alt="Story"
          sx={{ width: "100%", mb: 4, borderRadius: 2 }}
        />
      )}

      {/* Description */}
      <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
        {story.description}
      </Typography>

      {/* Voting */}
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <Button variant="contained" color="success" onClick={() => handleVote("up")}>
          Upvote
        </Button>
        <Button variant="contained" color="error" onClick={() => handleVote("down")}>
          Downvote
        </Button>
      </Box>

      {/* Comments Section */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Comments
        </Typography>
        {(story.comments || []).length === 0 && (
          <Typography color="text.secondary">No comments yet.</Typography>
        )}
        {(story.comments || []).map((c, i) => (
          <Box
            key={i}
            sx={{
              mb: 1,
              p: 1.5,
              border: "1px solid #ccc",
              borderRadius: 1,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="subtitle2">{c.user}</Typography>
            <Typography variant="body2">{c.text}</Typography>
          </Box>
        ))}
      </Box>

      {/* Add Comment */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Add a comment"
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddComment}>
          Comment
        </Button>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={feedback.open}
        autoHideDuration={3000}
        onClose={() => setFeedback({ ...feedback, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={feedback.severity}>{feedback.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default StoryDetails;
