import React, { useState, useEffect } from 'react';
import { addProduct } from '../../api/ProductApiServices';
import { getAllCategories } from '../../api/CategoryApiServices';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const ProductCreate = () => {
  const [productName, setProductName] = useState('');
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState('');           
  const [categories, setCategories] = useState([]);            
  const [photo, setPhoto] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Sayfa açıldığında kategorileri çek
  useEffect(() => {
    (async () => {
      try {
        const cats = await getAllCategories();
        setCategories(cats);
      } catch (err) {
        console.error('Kategori yüklenirken hata:', err);
      }
    })();
  }, []);

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('stock', String(stock));
    formData.append('price', String(price));
    formData.append('categoryId', String(categoryId));        
    if (photo) {
      formData.append('photoFile', photo);
    }

    try {
      const response = await addProduct(formData);
      if (response.status === 200) {
        setSuccess(true);
        // formu resetle
        setProductName('');
        setStock(0);
        setPrice(0);
        setCategoryId('');
        setPhoto(null);
      }
    } catch (err) {
      const msg = err.response?.data?.title || 'Bir hata oluştu.';
      setError(msg);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3, mb: 9 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: '#3f51b5', fontWeight: 'bold' }}
        >
          Add Product
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>Ürün başarıyla eklendi!</Alert>}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                variant="outlined"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  label="Category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Stock"
                type="number"
                variant="outlined"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
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
                <Button variant="outlined" component="span" fullWidth>
                  Upload Photo
                </Button>
              </label>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
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
