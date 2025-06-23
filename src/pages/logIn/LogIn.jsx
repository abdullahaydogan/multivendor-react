import React, { useState } from "react";
import { loginUser } from "../../api/LogInApiServices";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Container, TextField, Button, Typography, Box,
  Alert, Grid, Link
} from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const primaryColor = "#003366";

const AnimatedButton = styled(Button)({
  transition: "all 0.3s ease",
  backgroundColor: primaryColor,
  color: "white",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#005588",
    transform: "scale(1.05)",
  },
});

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(username, password);
      localStorage.setItem("authToken", data.token);
      navigate("/");
    } catch (err) {
      setError("Giriş başarısız, lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6, textAlign: "center",marginTop: "64px" }}>
      <Typography variant="h4" gutterBottom sx={{ color: primaryColor, fontWeight: "bold" }}>
        Log In
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        {error && <Alert severity="error">{error}</Alert>}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth label="Username" value={username}
              onChange={(e) => setUsername(e.target.value)} required
              InputProps={{ startAdornment: <AccountCircle sx={{ mr: 1 }} /> }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth type="password" label="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} required
              InputProps={{ startAdornment: <Lock sx={{ mr: 1 }} /> }}
            />
          </Grid>

          <Grid item xs={12}>
            <AnimatedButton type="submit" fullWidth variant="contained">Login</AnimatedButton>
          </Grid>
        </Grid>
      </Box>

      <Typography variant="body2" sx={{ mt: 2 }}>
        Don't have an account?{" "}
        <Link component={RouterLink} to="/signUp" sx={{ fontWeight: "bold" }}>
          Sign Up
        </Link>
      </Typography>
    </Container>
  );
};

export default LogIn;
