import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import { submitStory } from "../utils/api";

const SubmitStory = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [feedback, setFeedback] = useState({ open: false, message: "", severity: "success" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setFeedback({ open: true, message: "Please fill in all fields", severity: "error" });
      return;
    }
    try {
      await submitStory({ title, description });
      setFeedback({ open: true, message: "Story submitted!", severity: "success" });
      setTitle("");
      setDescription("");
    } catch (error) {
      setFeedback({ open: true, message: "Failed to submit", severity: "error" });
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Submit a New Story
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 600 }}
      >
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={6}
          required
        />
        <Button type="submit" variant="contained">
          Submit Story
        </Button>
      </Box>
      <Snackbar
        open={feedback.open}
        autoHideDuration={4000}
        onClose={() => setFeedback({ ...feedback, open: false })}
      >
        <Alert severity={feedback.severity}>{feedback.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default SubmitStory;
