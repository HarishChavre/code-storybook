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
  Paper,
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

  
  const fetchStory = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/${id}`);
      setStory(res.data);
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


  const handleVote = async (type) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setFeedback({ open: true, message: "Login required to vote", severity: "error" });
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE}/${id}/vote`,
        { type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStory((prev) => ({ ...prev, votes: res.data.votes }));
    } catch (err) {
      console.error(err);
      setFeedback({ open: true, message: "Failed to vote", severity: "error" });
    }
  };

  
  const handleAddComment = async () => {
    if (!comment.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setFeedback({ open: true, message: "Login required to comment", severity: "error" });
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE}/${id}/comment`,
        { user: "You", text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStory((prev) => ({ ...prev, comments: res.data }));
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
     
      <Typography variant="h3" sx={{ mb: 2 }}>
        {story.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        By {story.name} | Votes: {story.votes || 0}
      </Typography>

      
      <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
        {story.description}
      </Typography>

     
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <Button variant="contained" color="success" onClick={() => handleVote("up")}>
          Upvote
        </Button>
        <Button variant="contained" color="error" onClick={() => handleVote("down")}>
          Downvote
        </Button>
      </Box>

      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Comments ({story.comments?.length || 0})
        </Typography>

        {(story.comments || []).length === 0 && (
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            No comments yet. Be the first to comment!
          </Typography>
        )}

        {(story.comments || []).map((c, i) => (
          <Paper
            key={i}
            elevation={1}
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 2,
              backgroundColor: "#f5f5f5",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              {c.user}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              {c.text}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
            </Typography>
          </Paper>
        ))}
      </Box>

    
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
