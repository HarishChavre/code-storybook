import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button, Alert, Link } from "@mui/material";
import { motion } from "framer-motion";
import { registerUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setError("");
      setSuccess("");
      await registerUser({ name, email, password });
      setSuccess("Registered successfully! Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={styles.box}>
          <Typography variant="h4" sx={styles.logo}>
            Code Storybook
          </Typography>
          <Typography variant="body1" sx={styles.subtitle}>
            Create your account
          </Typography>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
          <TextField
            label="Name"
            fullWidth
            sx={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            sx={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            sx={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" fullWidth sx={styles.button} onClick={handleRegister}>
            Register
          </Button>

         
          <Typography sx={{ mt: 3, color: "#bbb" }}>
            Already have an account?{" "}
            <Link
              sx={{ color: "red", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
              onClick={() => navigate("/login")}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

const styles = {
  box: {
    p: 5,
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    textAlign: "center",
    background: "#1f1f1f",
    color: "#fff",
  },
  logo: {
    fontWeight: "bold",
    color: "#00bcd4",
    mb: 1,
  },
  subtitle: {
    color: "#bbb",
    mb: 3,
  },
  input: {
    mb: 2,
    bgcolor: "#2a2a2a",
    borderRadius: "8px",
    "& .MuiInputBase-input": { color: "#fff" },
    "& .MuiInputLabel-root": { color: "#ccc" },
  },
  button: {
    mt: 1,
    py: 1.5,
    fontWeight: "bold",
    backgroundColor: "#00bcd4",
    "&:hover": { backgroundColor: "#00acc1" },
  },
};

export default Register;
