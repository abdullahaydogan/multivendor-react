import React, { useState, useEffect, useMemo } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  IconButton,
  Snackbar,
  Box,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { Link as RouterLink } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
  boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  position: "relative",
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

export default function ProductList({ products }) {
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

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
    if (cart.some((item) => item.id === product.id)) {
      setSnackbarMessage("Ürün zaten sepette.");
    } else {
      setCart((prev) => [...prev, product]);
      setSnackbarMessage(`"${product.name}" sepete eklendi!`);
    }
    setSnackbarOpen(true);
  };

  const filtered = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [products, searchQuery]
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Search Bar */}
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
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <StyledCard>
                <CardActionArea component={RouterLink} to={`/product/${product.id}`}>
                  <IconBox>
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToFavorites(product);
                      }}
                      aria-label="Favorilere ekle"
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
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                      aria-label="Sepete ekle"
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
                    sx={{
                      objectFit: "contain",
                      backgroundColor: "#ffffff",
                    }}
                  />

                  <CardContent sx={{ p: 0 }}>
                    <Box
                      sx={{
                        backgroundColor: "#f5f5f5",
                        p: 2,
                        borderTop: "1px solid #e0e0e0",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                      }}
                    >
                      {/* Ürün Adı (sidebar rengi) */}
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        sx={{ color: "#1a1d2e" }}
                      >
                        {product.name}
                      </Typography>

                      {/* Fiyat (yeşil renk) */}
                      <Typography
                        variant="h6"
                        fontWeight={800}
                        color="success.main"
                      >
                        ${product.price.toFixed(2)}
                      </Typography>

                      {/* Kategori ve Stok Etiketleri */}
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Chip
                          label={product.category?.name || "Kategori yok"}
                          size="small"
                          color="primary"
                          sx={{ fontWeight: 500 }}
                        />
                        <Chip
                          label={`Stok: ${product.stock}`}
                          size="small"
                          variant="outlined"
                          sx={{ fontWeight: 500 }}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
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
