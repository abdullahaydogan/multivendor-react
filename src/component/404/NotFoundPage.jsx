// src/component/404/NotFoundPage.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: '20px', color: '#FF6347' }}>
        404 - Sayfa Bulunamadı
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '30px', color: '#555' }}>
        Üzgünüz, aradığınız sayfa mevcut değil.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ fontWeight: 'bold' }}
      >
        Anasayfaya Dön
      </Button>
    </Box>
  );
};

export default NotFoundPage;
