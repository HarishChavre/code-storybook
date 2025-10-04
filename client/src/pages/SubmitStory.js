import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  Paper,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const SubmitStory = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [feedback, setFeedback] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !title || !description) {
      setFeedback({
        open: true,
        message: "Please fill in all fields before submitting.",
        severity: "warning",
      });
      return;
    }

    try {
      
      const token = localStorage.getItem("token");
      if (!token) {
        setFeedback({
          open: true,
          message: "You must be logged in to submit a story.",
          severity: "error",
        });
        return;
      }

      
      const res = await axios.post(
        "https://code-storybook.onrender.com/stories",
        { name, title, description },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      setFeedback({
        open: true,
        message: "Your story has been submitted successfully!",
        severity: "success",
      });

  
      setName("");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Submission failed:", error);
      setFeedback({
        open: true,
        message: error.response?.data?.message || "Something went wrong. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
            Share Your Story
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, textAlign: "center", color: "text.secondary" }}>
            Everyone has a story to tell. Write yours and inspire others.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              label="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Story Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Your Story"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={6}
              required
              fullWidth
            />

            <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }}>
              Submit
            </Button>
          </Box>
        </Paper>
      </motion.div>

      <Snackbar
        open={feedback.open}
        autoHideDuration={4000}
        onClose={() => setFeedback({ ...feedback, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setFeedback({ ...feedback, open: false })}
          severity={feedback.severity}
          sx={{ width: "100%" }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SubmitStory;
