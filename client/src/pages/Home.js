
import React, { useEffect, useState } from "react";
import { Container, Grid, CircularProgress, Box, Typography, Button } from "@mui/material";
import StoryCard from "../components/StoryCard";
import { fetchStories } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      
      <Box
        sx={{
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          mb: 6,
          textAlign: "center",
          height: { xs: 300, md: 400 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          backgroundImage: `url(/code_story_cover.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
    
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0, 0, 0, 0.5)",
          }}
        />

       
        <Box sx={{ position: "relative", zIndex: 1, px: 3 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            Welcome to Code Storybook
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Discover, share, and learn from real code stories 
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/submit")}
            sx={{
              backgroundColor: "#00bcd4",
              color: "#fff",
              fontWeight: "bold",
              px: 3,
              py: 1.5,
              borderRadius: "10px",
              "&:hover": { backgroundColor: "#00acc1" },
            }}
          >
            Share Your Story
          </Button>
        </Box>
      </Box>

      
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
