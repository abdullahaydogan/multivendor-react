import React from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1a1d2e",
        color: "white",
        py: 6,
        px: 2,
        mt: 10,
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Sol */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Hızlı Bağlantılar
          </Typography>
          <Box>
            {["/", "/about", "/services", "/contact"].map((path, index) => (
              <Link to={path} key={index} style={linkStyle}>
                {linkLabels[index]}
              </Link>
            ))}
          </Box>
        </Grid>

        {/* Orta */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Bizi Takip Edin
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

        {/* Sağ */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            İletişim
          </Typography>
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Email:</strong> contact@example.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Phone:</strong> +1 234 567 890
            </Typography>
            <Typography variant="body2">
              <strong>Address:</strong> 1234 Some St, Some City, Some Country
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Alt */}
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "#aaa" }}
        >
          &copy; {new Date().getFullYear()} KOU Bazaar. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

const linkLabels = ["Home", "About Us", "Services", "Contact Us"];

const socialLinks = [
  { icon: <Facebook />, href: "https://facebook.com" },
  { icon: <Twitter />, href: "https://twitter.com" },
  { icon: <Instagram />, href: "https://instagram.com" },
  { icon: <LinkedIn />, href: "https://linkedin.com" },
];

const linkStyle = {
  color: "white",
  textDecoration: "none",
  display: "block",
  marginBottom: "8px",
  fontSize: "0.9rem",
  transition: "color 0.3s",
  ":hover": {
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
