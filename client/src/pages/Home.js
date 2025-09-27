import React, { useEffect, useState } from "react";
import { Container, Grid, CircularProgress } from "@mui/material";
import StoryCard from "../components/StoryCard";
import { fetchStories } from "../utils/api";

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

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
