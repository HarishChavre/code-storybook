import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button, Alert, Link } from "@mui/material";
import { motion } from "framer-motion";
import { loginUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");
      const data = await loginUser({ email, password });
      
     
      localStorage.setItem("token", data.token);

      
      const userData = { email }; 
      localStorage.setItem("user", JSON.stringify(userData));
      onLogin(userData); 

      navigate("/"); 
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "User not registered or invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <Box sx={styles.box}>
          <Typography variant="h4" sx={styles.logo}>Code Storybook</Typography>
          <Typography variant="body1" sx={styles.subtitle}>Login to your account</Typography>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <TextField label="Email" fullWidth sx={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" fullWidth sx={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button variant="contained" fullWidth sx={styles.button} onClick={handleLogin}>Login</Button>

          <Typography sx={{ mt: 3, color: "#bbb" }}>
            Don't have an account?{" "}
            <Link sx={{ color: "red", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                  onClick={() => navigate("/register")}>
              Register
            </Link>
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

const styles = {
  box: { p: 5, borderRadius: "16px", boxShadow: "0 8px 20px rgba(0,0,0,0.2)", textAlign: "center", background: "#1f1f1f", color: "#fff" },
  logo: { fontWeight: "bold", color: "#00bcd4", mb: 1 },
  subtitle: { color: "#bbb", mb: 3 },
  input: { mb: 2, bgcolor: "#2a2a2a", borderRadius: "8px", "& .MuiInputBase-input": { color: "#fff" }, "& .MuiInputLabel-root": { color: "#ccc" } },
  button: { mt: 1, py: 1.5, fontWeight: "bold", backgroundColor: "#00bcd4", "&:hover": { backgroundColor: "#00acc1" } },
};

export default Login;
