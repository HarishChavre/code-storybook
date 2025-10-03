import React, { useEffect, useState } from "react";
import { Container, Grid, CircularProgress, Box, Typography, Button } from "@mui/material";
import StoryCard from "../components/StoryCard";
import { fetchStories } from "../utils/api";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ hook

  useEffect(() => {
    const loadStories = async () => {
      try {
        const data = await fetchStories();
        setStories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadStories();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          p: 6,
          mb: 6,
          borderRadius: "16px",
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          color: "white",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Welcome to Code Storybook
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Discover, share, and learn from real code stories 🚀
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/submit")} // ✅ route hit
          sx={{
            backgroundColor: "#fff",
            color: "#2a5298",
            fontWeight: "bold",
            px: 3,
            py: 1,
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          Share Your Story
        </Button>
      </Box>

      {/* Story Grid */}
      <Grid container spacing={3}>
        {stories.map((story) => (
          <Grid item xs={12} sm={6} md={4} key={story._id}>
            <StoryCard story={story} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
