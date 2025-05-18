import React, { useState } from "react";
import { loginUser } from "./LogInApiServices"; // Ensure the import path is correct
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AccountCircle, Lock } from "@mui/icons-material";

// Ana tema rengini lacivert olarak belirliyoruz
const primaryColor = "#003366";
const secondaryColor = "#006699";

const AnimatedButton = styled(Button)(({ theme }) => ({
  transition: "background-color 0.3s ease, transform 0.3s ease",
  
  backgroundColor: primaryColor,
  color: "white",
  "&:hover": {
    backgroundColor: secondaryColor,
    transform: "scale(1.05)",
  },
  borderRadius: "8px",
}));

const AnimatedContainer = styled(Container)(() => ({
  
  height:"65%",
  width:"auto",
  marginTop: "32px",
  textAlign: "center",
  opacity: 0,
  animation: "fadeIn 1s forwards",
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  borderRadius: "4px",
  transition: "all 0.3s ease",
  "&:focus": {
    backgroundColor: "#ffffff",
    borderColor: primaryColor,
  },
  "&:hover": {
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    transform: "scale(1.02)",
  },
}));

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Initialize the navigate function from react-router-dom
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      console.log("Login successful:", data);

      localStorage.setItem("authToken", data.token);

      // After successful login, navigate to the HomePage
      navigate("/home");

      alert("Giriş başarılı!");
    } catch (error) {
      console.error("Giriş hatası:", error);
      setError("Giriş başarısız, lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <AnimatedContainer maxWidth="sm">
      <Typography variant="h4" gutterBottom sx={{ color: primaryColor, fontWeight: "bold" }}>
        Log In
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        {error && (
          <Grid item xs={12}>
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          </Grid>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledTextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              type="text"
              required
              onChange={(event) => setUsername(event.target.value)}
              InputProps={{
                startAdornment: <AccountCircle sx={{ mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              required
              onChange={(event) => setPassword(event.target.value)}
              InputProps={{
                startAdornment: <Lock sx={{ mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <AnimatedButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
            >
              Login
            </AnimatedButton>
          </Grid>
        </Grid>
      </Box>

      <Typography variant="body2" sx={{ mt: 2, color: secondaryColor }}>
        Don't you have an account?{" "}
        <Link
          component={RouterLink}
          to="/signUp"
          sx={{
            fontWeight: "bold",
            textDecoration: "underline",
            color: primaryColor,
            "&:hover": {
              color: "#1976d2",
              transition: "color 0.3s ease",
            },
          }}
        >
          Sign Up
        </Link>
      </Typography>
    </AnimatedContainer>
  );
};

export default LogIn;
