import React, { useState } from "react";
import { signUp } from "./SignUpApiServices";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert,
  Grid,
  ThemeProvider,
  createTheme,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AccountCircle, Email, Lock } from "@mui/icons-material";

// Lacivert tema renkleri
const theme = createTheme({
  palette: {
    primary: {
      main: "#003366", // Lacivert renk
    },
    secondary: {
      main: "#ffffff", // Beyaz renk
    },
    background: {
      default: "#f4f6f9", // Açık gri zemin
    },
    text: {
      primary: "#003366", // Lacivert metin
      secondary: "#333333", // Koyu gri metin
    },
  },
});

// Stilize edilmiş bileşenler
const AnimatedButton = styled(Button)(({ theme }) => ({
  transition: "background-color 0.3s ease, transform 0.3s ease",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "scale(1.05)",
  },
  borderRadius: "8px",
  padding: "12px 24px",
}));

const AnimatedContainer = styled(Container)(() => ({
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
  backgroundColor: theme.palette.grey[100],
  borderRadius: "4px",
  transition: "all 0.3s ease",
  "&:focus": {
    backgroundColor: theme.palette.common.white,
    borderColor: theme.palette.primary.main,
  },
  "&:hover": {
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    transform: "scale(1.02)",
  },
  input: {
    color: theme.palette.text.primary,
  },
}));

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [roles, setRoles] = useState(["user"]); // Default role can be 'user'
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRoleChange = (e) => {
    setRoles([e.target.value]); // Only allow one role selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordRepeat) {
      setError("Passwords do not match!");
      return;
    }
    setError("");
    setSuccess(false);

    try {
      const response = await signUp({
        firstName,
        lastName,
        userName: username,
        email,
        password,
        roles,
      });

      if (response.status === 200) {
        setSuccess(true);
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setPasswordRepeat("");
        setRoles(["user"]);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AnimatedContainer maxWidth="sm">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          Create Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="First Name"
                variant="outlined"
                margin="normal"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                InputProps={{
                  startAdornment: <AccountCircle sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Last Name"
                variant="outlined"
                margin="normal"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                InputProps={{
                  startAdornment: <AccountCircle sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                InputProps={{
                  startAdornment: <AccountCircle sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputProps={{
                  startAdornment: <Email sx={{ mr: 1 }} />,
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: <Lock sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Repeat Password"
                variant="outlined"
                margin="normal"
                type="password"
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
                required
                InputProps={{
                  startAdornment: <Lock sx={{ mr: 1 }} />,
                }}
              />
            </Grid>

            {/* Role Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Role</InputLabel>
                <Select
                  value={roles[0]}
                  onChange={handleRoleChange}
                  label="Role"
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="saler">Saler</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              </Grid>
            )}

            {success && (
              <Grid item xs={12}>
                <Alert severity="success" sx={{ mt: 2 }}>
                  Registration successful!
                </Alert>
              </Grid>
            )}

            <Grid item xs={12}>
              <AnimatedButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
              >
                Sign Up
              </AnimatedButton>
            </Grid>
          </Grid>
        </Box>

        <Typography variant="body2" sx={{ mt: 2, color: "#006699" }}>
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/logIn"
            sx={{
              fontWeight: "bold",
              textDecoration: "underline",
              color: "primary.main",
              "&:hover": {
                color: "primary.dark",
                transition: "color 0.3s ease",
              },
            }}
          >
            Log In
          </Link>
        </Typography>
      </AnimatedContainer>
    </ThemeProvider>
  );
};

export default SignUp;
