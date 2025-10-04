// Navbar.jsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CodeIcon from "@mui/icons-material/Code";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    onLogout(); 
    navigate("/login"); 
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 }}>
          <CodeIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Code Storybook
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {user && (
          <Button color="inherit" component={Link} to="/submit">
            Submit Story
          </Button>
        )}
        {!user ? (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        ) : (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
