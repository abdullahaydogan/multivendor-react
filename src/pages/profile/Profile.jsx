// src/pages/Profile.jsx
import React from "react";
import { Box, Typography, Container, Paper, Divider, Button } from "@mui/material";
import { getUserInfo } from "../../utils/authService";

const Profile = () => {
  const user = getUserInfo();

  if (!user) return <Typography>Unauthorized</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        {/* 👤 Kullanıcı Profil Bilgisi */}
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1"><strong>Username:</strong> {user.username}</Typography>
        <Typography variant="body1"><strong>Role:</strong> {user.role}</Typography>

        <Divider sx={{ my: 3 }} />

        {/* 🛠️ Hesap Bilgisi (Account Info) */}
        <Typography variant="h5" gutterBottom>
          Account Information
        </Typography>
        <Typography variant="body2"><strong>Email:</strong> example@email.com</Typography>
        <Typography variant="body2"><strong>Full Name:</strong> Abdullah Aydogan</Typography>

        {/* 🔐 Şifre Değiştir (placeholder buton) */}
        <Box sx={{ mt: 2 }}>
          <Button variant="outlined" color="primary" fullWidth>
            Change Password
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
