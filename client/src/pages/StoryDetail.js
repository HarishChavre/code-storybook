import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Divider,
} from "@mui/material";
import { fetchStoryById } from "../utils/api";

const StoryDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load story from backend
  const loadStory = async () => {
    try {
      const data = await fetchStoryById(id);
      setStory(data);
    } catch (error) {
      console.error("Failed to load story:", error);
      setStory(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStory();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!story) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          Story not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {story.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Created: {new Date(story.createdAt).toLocaleString()}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ whiteSpace: "pre-wrap" }}>
          <Typography variant="body1">{story.description}</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default StoryDetail;
