// src/pages/SignUp.jsx
import React, { useState } from "react";
import { signUp } from "./SignUpApiServices";
import {
  Container, TextField, Button, Typography, Box, Link, Alert,
  Grid, ThemeProvider, createTheme, Select, MenuItem, InputLabel, FormControl
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AccountCircle, Email, Lock } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: { main: "#003366" },
    secondary: { main: "#ffffff" },
    background: { default: "#f4f6f9" },
    text: { primary: "#003366", secondary: "#333333" },
  },
});

const AnimatedButton = styled(Button)(({ theme }) => ({
  transition: "all 0.3s ease",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "scale(1.05)",
  },
  borderRadius: "8px",
  padding: "12px 24px",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: "4px",
  input: { color: theme.palette.text.primary },
}));

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: "", lastName: "", userName: "", email: "",
    password: "", passwordRepeat: "", roles: ["user"]
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setForm({ ...form, roles: [e.target.value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.passwordRepeat) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await signUp(form);
      if (response.status === 201) {
        setSuccess(true);
        setForm({ firstName: "", lastName: "", userName: "", email: "", password: "", passwordRepeat: "", roles: ["user"] });
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "bold" }}>
          Create Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {["firstName", "lastName", "userName", "email"].map((field, i) => (
              <Grid item xs={12} key={i}>
                <StyledTextField
                  fullWidth label={field.replace(/^\w/, (c) => c.toUpperCase())}
                  name={field} value={form[field]} onChange={handleChange}
                  required variant="outlined" margin="normal"
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <StyledTextField
                fullWidth type="password" label="Password"
                name="password" value={form.password} onChange={handleChange}
                required variant="outlined" margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth type="password" label="Repeat Password"
                name="passwordRepeat" value={form.passwordRepeat} onChange={handleChange}
                required variant="outlined" margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Role</InputLabel>
                <Select value={form.roles[0]} onChange={handleRoleChange} label="Role">
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="saler">Saler</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {error && <Grid item xs={12}><Alert severity="error">{error}</Alert></Grid>}
            {success && <Grid item xs={12}><Alert severity="success">Registration successful!</Alert></Grid>}

            <Grid item xs={12}>
              <AnimatedButton type="submit" fullWidth variant="contained">Sign Up</AnimatedButton>
            </Grid>
          </Grid>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link component={RouterLink} to="/logIn">Log In</Link>
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
