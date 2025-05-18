import React, { useState } from 'react';
import { shareProduct } from './ProductCreateApi';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Grid,
  Paper,
} from '@mui/material';

export const ProductCreate = () => {
  const [productName, setProductName] = useState('');
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('stock', stock);
    formData.append('price', price);
    formData.append('category', category);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await shareProduct(formData);

      if (response.status === 200) {
        setSuccess(true);
        setProductName('');
        setStock(0);
        setPrice(0);
        setCategory('');
        setPhoto(null);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.title || 'Bir hata oluştu.';
      setError(errorMessage);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ padding: 4, borderRadius: 2, boxShadow: 3,mb:9 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#3f51b5", fontWeight: "bold" }}
        >
          Add Product
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">Ürün başarıyla eklendi!</Alert>}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                variant="outlined"
                margin="normal"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category"
                variant="outlined"
                margin="normal"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Stock"
                variant="outlined"
                margin="normal"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                variant="outlined"
                margin="normal"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="photo-upload"
                type="file"
                onChange={handlePhotoChange}
                required
              />
              <label htmlFor="photo-upload">
                <Button variant="outlined" component="span" sx={{ mt: 2, width: '100%' }}>
                  Add File
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductCreate;
