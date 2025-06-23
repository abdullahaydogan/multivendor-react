import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsByCategoryId } from "../../api/ProductApiServices";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Snackbar,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
  boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  position: "relative",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.24)",
  },
}));

const IconBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  display: "flex",
  gap: theme.spacing(1),
  zIndex: 1,
}));

export default function FilteredProductByCategory({ selectedCategoryId }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const favs = localStorage.getItem("favorites");
    return favs ? JSON.parse(favs) : [];
  });
  const [cart, setCart] = useState(() => {
    const crt = localStorage.getItem("cart");
    return crt ? JSON.parse(crt) : [];
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!selectedCategoryId) return;
    getProductsByCategoryId(selectedCategoryId)
      .then((data) => setProducts(data))
      .catch(() => {
        setSnackbarMessage("Ürünler alınamadı.");
        setSnackbarOpen(true);
      });
  }, [selectedCategoryId]);

  const handleAddToFavorites = (product) => {
    if (favorites.some((f) => f.id === product.id)) {
      setSnackbarMessage("Zaten favorilerinizde mevcut.");
    } else {
      setFavorites((prev) => [...prev, product]);
      setSnackbarMessage(`"${product.name}" favorilere eklendi!`);
    }
    setSnackbarOpen(true);
  };

  const handleAddToCart = (product) => {
    if (cart.some((c) => c.id === product.id)) {
      setSnackbarMessage("Ürün zaten sepette.");
    } else {
      setCart((prev) => [...prev, product]);
      setSnackbarMessage(`"${product.name}" sepete eklendi!`);
    }
    setSnackbarOpen(true);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box mb={4} display="flex" justifyContent="center">
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Ürün ara..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            width: { xs: "100%", sm: "60%", md: "40%" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
              backgroundColor: "#f9f9f9",
              transition: "all 0.3s ease",
              "&:hover": { backgroundColor: "#ffffff" },
            },
          }}
        />
      </Box>

      {filtered.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary">
          Ürün bulunamadı.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {filtered.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <StyledCard>
                <IconBox>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavorites(product);
                    }}
                    size="small"
                    sx={{ bgcolor: "rgba(255,255,255,0.8)" }}
                  >
                    <FavoriteIcon
                      color={
                        favorites.some((f) => f.id === product.id)
                          ? "error"
                          : "inherit"
                      }
                    />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    size="small"
                    sx={{ bgcolor: "rgba(255,255,255,0.8)" }}
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                </IconBox>

                <CardMedia
                  component="img"
                  height="200"
                  image={
                    product.photo
                      ? `data:image/jpeg;base64,${product.photo}`
                      : "/placeholder.png"
                  }
                  alt={product.name}
                  sx={{ objectFit: "contain", backgroundColor: "#ffffff" }}
                />

                <CardContent sx={{ p: 0 }}>
                  <Box
                    sx={{
                      backgroundColor: "#f5f9fc",
                      p: 2,
                      borderTop: "1px solid #e0e0e0",
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      sx={{ color: "#1a1d2e" }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={800}
                      color="success.main"
                    >
                      ${product.price.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Kategori: {product.category?.name || "Belirtilmemiş"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Stok: {product.stock}
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
