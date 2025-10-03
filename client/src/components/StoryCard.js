import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  IconButton,
  Badge,
} from "@mui/material";
import { Link } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";

const StoryCard = ({ story, onVote }) => {
  const [votes, setVotes] = useState(story.votes || 0);

  const handleVote = (type) => {
    let newVotes = votes;
    if (type === "up") newVotes += 1;
    if (type === "down") newVotes -= 1;
    setVotes(newVotes);
    if (onVote) onVote(story._id, type); // Optional backend call
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {story.imageUrl && (
        <img
          src={story.thumbnailUrl || story.imageUrl}
          alt={story.title}
          style={{
            width: "100%",
            height: 160,
            objectFit: "cover",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {story.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {story.description.length > 100
            ? story.description.substring(0, 100) + "…"
            : story.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <div>
          <IconButton size="small" onClick={() => handleVote("up")}>
            <ThumbUpIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => handleVote("down")}>
            <ThumbDownIcon fontSize="small" />
          </IconButton>
          <Typography
            component="span"
            variant="body2"
            sx={{ ml: 0.5, verticalAlign: "middle" }}
          >
            {votes}
          </Typography>
        </div>

        <div>
          <Badge
            badgeContent={story.comments?.length || 0}
            color="primary"
            sx={{ mr: 1 }}
          >
            <CommentIcon fontSize="small" />
          </Badge>
          <Button component={Link} to={`/story/${story._id}`} size="small">
            View Story
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default StoryCard;
