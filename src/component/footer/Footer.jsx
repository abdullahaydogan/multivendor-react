// src/component/footer/Footer.jsx
import React from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { Link } from "react-router-dom";

const drawerWidth = 300;

const Footer = () => {
  const navLinks = [
    { label: "Home",      to: "/" },
    { label: "About Us",  to: "/aboutUs" },
    { label: "Contact Us",to: "/contactUs" },
    { label: "Ask AI", to: "/ai" }
  ];

  const socialLinks = [
    { icon: <Facebook />, href: "https://facebook.com" },
    { icon: <Twitter />,  href: "https://twitter.com" },
    { icon: <Instagram />,href: "https://instagram.com" },
    { icon: <LinkedIn />, href: "https://linkedin.com" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        ml: `${drawerWidth}px`,
        backgroundColor: "#1a1d2e",
        color: "white",
        py: 6,
        px: 2,
        mt: 10,
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Navigation */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Navigation
          </Typography>
          <Box>
            {navLinks.map(({ label, to }) => (
              <Link key={to} to={to} style={linkStyle}>
                {label}
              </Link>
            ))}
          </Box>
        </Grid>

        {/* Social */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box>
            {socialLinks.map((social, i) => (
              <IconButton
                key={i}
                color="inherit"
                href={social.href}
                target="_blank"
                sx={socialIconStyle}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Grid>

        {/* Contact */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Contact
          </Typography>
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Email:</strong> contact@example.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Phone:</strong> +1 234 567 890
            </Typography>
            <Typography variant="body2">
              <strong>Address:</strong> 1234 Some St, Some City, Country
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" align="center" sx={{ color: "#aaa" }}>
          &copy; {new Date().getFullYear()} KOU Bazaar. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  display: "block",
  marginBottom: "8px",
  fontSize: "0.9rem",
  transition: "color 0.3s",
  "&:hover": {
    color: "#1a73e8",
  },
};

const socialIconStyle = {
  color: "#fff",
  mr: 1,
  transition: "background 0.3s",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
};

export default Footer;
