// src/pages/contact/ContactUs.jsx
import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  Paper,
  IconButton,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

export default function ContactUs() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const infos = [
    {
      label: "Email",
      value: "contact@yourdomain.com",
      icon: <EmailOutlinedIcon />,
    },
    {
      label: "Phone",
      value: "+1 (234) 567-8901",
      icon: <PhoneOutlinedIcon />,
    },
    {
      label: "Address",
      value: "123 Main St, City, Country",
      icon: <LocationOnOutlinedIcon />,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Başlık */}
      <Typography
        variant={isSm ? "h4" : "h3"}
        align="center"
        gutterBottom
        sx={{
          color: theme.palette.primary.main,
          fontWeight: 700,
          mb: 6,
        }}
      >
        Contact Us
      </Typography>

      {/* Kartlar */}
      <Grid container spacing={4}>
        {infos.map(({ label, value, icon }) => (
          <Grid item xs={12} sm={4} key={label}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 2,
                textAlign: "center",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  mx: "auto",
                  mb: 2,
                  borderRadius: "50%",
                  backgroundColor: theme.palette.secondary.main,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  disableRipple
                  sx={{
                    color: "#fff",
                  }}
                >
                  {icon}
                </IconButton>
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 1, color: theme.palette.text.primary }}
              >
                {label}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.text.secondary }}
              >
                {value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Alt not */}
      <Box mt={8} textAlign="center">
        <Typography
          variant="subtitle1"
          sx={{ color: theme.palette.text.secondary }}
        >
          We’re here to help you 24/7. Feel free to reach out via any of the above channels.
        </Typography>
      </Box>
    </Container>
  );
}
