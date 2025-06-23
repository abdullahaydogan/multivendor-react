import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../api/ProductApiServices";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Divider,
  Stack,
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (storedCart.some(item => item.id === product.id)) {
      alert("Ürün zaten sepette.");
      return;
    }
    storedCart.push(product);
    localStorage.setItem('cart', JSON.stringify(storedCart));
    alert(`"${product.name}" sepete eklendi!`);
  };

  const handleAddToFavorites = () => {
    const storedFavs = JSON.parse(localStorage.getItem('favorites')) || [];
    if (storedFavs.some(item => item.id === product.id)) {
      alert("Ürün zaten favorilerde.");
      return;
    }
    storedFavs.push(product);
    localStorage.setItem('favorites', JSON.stringify(storedFavs));
    alert(`"${product.name}" favorilere eklendi!`);
  };

  if (loading) return <CircularProgress sx={{ display: "block", margin: "100px auto" }} />;
  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;
  if (!product) return <Typography sx={{ mt: 4 }}>Ürün bulunamadı.</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Card sx={{ p: 2, borderRadius: 3, boxShadow: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image={product.photo ? `data:image/jpeg;base64,${product.photo}` : "/placeholder.png"}
              alt={product.name}
              sx={{ width: "100%", borderRadius: 3, objectFit: "contain", maxHeight: 400, backgroundColor: "#f9f9f9" }}
            />
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Kategori: {product.category?.name || "Bilinmiyor"}
            </Typography>
            <Typography variant="h5" color="primary" fontWeight="700" sx={{ mb: 2 }}>
              ${product.price.toFixed(2)}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              <strong>Stok Durumu:</strong> {product.stock > 0 ? `${product.stock} adet` : "Stokta yok"}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                sx={{ flexGrow: 1 }}
              >
                Sepete Ekle
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<FavoriteBorderIcon />}
                onClick={handleAddToFavorites}
                sx={{ flexGrow: 1 }}
              >
                Favorilere Ekle
              </Button>
            </Stack>

            <Divider sx={{ mb: 3 }} />
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default ProductDetail;
