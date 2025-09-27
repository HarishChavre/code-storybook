import React from "react";
import { Card, CardContent, CardActions, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const StoryCard = ({ story }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {story.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {story.description.substring(0, 100)}…
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: "auto" }}>
        <Button component={Link} to={`/story/${story._id}`} size="small">
          View Story
        </Button>
      </CardActions>
    </Card>
  );
};

export default StoryCard;
