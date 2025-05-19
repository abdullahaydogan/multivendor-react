import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "./ProductApiServices";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  Snackbar,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchBar from "../../component/serchbar/SearchBar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const IconBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
  padding: "8px 8px 0 8px",
});

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleAddToFavorites = (product) => {
    const newFavorites = [...favorites, product];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setSnackbarMessage(`"${product.name}" favorilere eklendi!`);
    setOpenSnackbar(true);
  };

  const handleAddToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const alreadyInCart = storedCart.some(item => item.id === product.id);

    if (alreadyInCart) {
      alert("Bu ürün zaten sepette.");
      return;
    }

    const updatedCart = [...storedCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setSnackbarMessage(`"${product.name}" sepete eklendi!`);
    setOpenSnackbar(true);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error}</Alert>;

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", p: 2 }}>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
      />

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <StyledCard>
              <IconBox>
                <IconButton onClick={() => handleAddToFavorites(product)}>
                  <FavoriteIcon />
                </IconButton>
                <IconButton onClick={() => handleAddToCart(product)}>
                  <ShoppingCartIcon />
                </IconButton>
              </IconBox>
              <CardMedia
                component="img"
                image={`data:image/jpeg;base64,${product.photo}`}
                alt={product.name}
                sx={{
                  height: 220,
                  objectFit: "contain",
                  backgroundColor: "#fff",
                  p: 1,
                }}
              />
              <CardContent>
                <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#3f51b5" }}>
                    {product.name}
                  </Typography>
                </Link>
                <Typography variant="body2" color="text.secondary">
                  <strong>Stock:</strong> {product.stock}
                </Typography>
                <Typography variant="body2" sx={{ color: "#28a745", fontWeight: "bold" }}>
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Category:</strong> {product.category}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default ProductList;
