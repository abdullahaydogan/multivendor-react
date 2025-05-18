import React from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { Link } from 'react-router-dom';  

const Footer = () => {
  return (
    <Box
    sx={{
      backgroundColor: "#2C3E50",
      color: "white",
      padding: "40px 20px",
      width: "100%", 
      boxSizing: "border-box",
       marginTop: "100px"
    }}
    
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Footer Sol Kısmı */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            Hızlı Bağlantılar
          </Typography>
          <Box>
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/about" style={linkStyle}>About Us</Link>
            <Link to="/services" style={linkStyle}>Services</Link>
            <Link to="/contact" style={linkStyle}>Contact Us</Link>
          </Box>
        </Grid>

        {/* Footer Orta Kısmı */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            Follow Us
          </Typography>
          <Box>
            <IconButton
              color="inherit"
              href="https://facebook.com"
              target="_blank"
              sx={socialIconStyle}
            >
              <Facebook />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://twitter.com"
              target="_blank"
              sx={socialIconStyle}
            >
              <Twitter />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://instagram.com"
              target="_blank"
              sx={socialIconStyle}
            >
              <Instagram />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://linkedin.com"
              target="_blank"
              sx={socialIconStyle}
            >
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>

        {/* Footer Sağ Kısmı */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            İletişim
          </Typography>
          <Box>
            <Typography variant="body2" sx={{ marginBottom: "10px" }}>
              <strong>Email:</strong> contact@example.com
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: "10px" }}>
              <strong>Phone:</strong> +1 234 567 890
            </Typography>
            <Typography variant="body2">
              <strong>Address:</strong> 1234 Some St, Some City, Some Country
            </Typography>
          </Box>
        </Grid>

        {/* Footer Alt Kısmı */}
        <Grid item xs={12}>
          <Typography variant="body2" align="center" sx={{ marginTop: "20px" }}>
            &copy; {new Date().getFullYear()} KOU Bazaar. All Rights Reserved.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const socialIconStyle = {
  marginRight: "10px",
  '&:hover': {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
};

// Define linkStyle
const linkStyle = {
  color: "white",
  textDecoration: "none",
  display: "block", // To make each link take up full width
  marginBottom: "10px", // Space between links
  '&:hover': {
    color: "#1a73e8", // Change color on hover
  },
};

export default Footer;
