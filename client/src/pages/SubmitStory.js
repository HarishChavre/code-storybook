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
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [feedback, setFeedback] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

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
      const formData = new FormData();
      formData.append("name", name);
      formData.append("title", title);
      formData.append("description", description);
      if (image) formData.append("image", image);

      const res = await axios.post("http://localhost:5000/stories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFeedback({
        open: true,
        message: "Your story has been submitted successfully!",
        severity: "success",
      });

      // Reset form
      setName("");
      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Submission failed:", error);
      setFeedback({
        open: true,
        message: "Something went wrong. Please try again.",
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

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField label="Your Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
            <TextField label="Story Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />
            <TextField
              label="Your Story"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={6}
              required
              fullWidth
            />

            {/* Image upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginTop: "10px" }}
            />
            {preview && (
              <Box
                component="img"
                src={preview}
                alt="Preview"
                sx={{ width: "100%", mt: 2, borderRadius: 2 }}
              />
            )}

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
        <Alert onClose={() => setFeedback({ ...feedback, open: false })} severity={feedback.severity} sx={{ width: "100%" }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SubmitStory;
