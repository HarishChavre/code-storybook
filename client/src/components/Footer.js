// Footer.jsx
import React from "react";
import { Box, Typography, Link, Stack, IconButton } from "@mui/material";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/" },
    { icon: <FaTwitter />, url: "https://twitter.com/" },
    { icon: <FaLinkedin />, url: "https://linkedin.com/" },
    { icon: <FaInstagram />, url: "https://instagram.com/" },
  ];

  return (
    <Box component="footer" sx={styles.footer}>
      {/* Logo and simple text */}
      <Typography variant="h6" sx={styles.logo}>
        Code Story
      </Typography>
      <Typography variant="body2" sx={styles.textMuted}>
        A platform where developers share stories through code.
      </Typography>

      {/* Social Icons */}
      <Stack direction="row" spacing={1} sx={{ mt: 2, justifyContent: "center" }}>
        {socialLinks.map((item, index) => (
          <IconButton
            key={index}
            component="a"
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={styles.socialIcon}
          >
            {item.icon}
          </IconButton>
        ))}
      </Stack>

      {/* Bottom Text */}
      <Typography variant="body2" sx={styles.bottomText}>
        © {new Date().getFullYear()} Code Story. All rights reserved.
      </Typography>
    </Box>
  );
};

/* Styles */
const styles = {
  footer: {
    bgcolor: "#1f1f1f",
    color: "#fff",
    p: 4,
    textAlign: "center",
    borderTop: "1px solid #333",
  },
  logo: {
    fontWeight: "bold",
    color: "#00bcd4",
    mb: 1,
  },
  textMuted: {
    color: "#bbb",
    fontSize: "0.9rem",
  },
  socialIcon: {
    color: "#fff",
    "&:hover": { color: "#00bcd4" },
  },
  bottomText: {
    color: "#888",
    fontSize: "0.8rem",
    mt: 3,
  },
};

export default Footer;
