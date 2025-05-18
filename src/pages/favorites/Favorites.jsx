import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s, box-shadow 0.3s",
  maxWidth: 240,
  margin: "0 auto",
  position: "relative",
  borderRadius: "12px", // Yuvarlak köşeler
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#ffffff",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
  },
}));

const RemoveButton = styled(Button)(({ theme }) => ({
  marginTop: "16px",  // Butonun kartın altına yakın konumlanmasını sağlar
  backgroundColor: "#f44336",
  color: "#fff",
  borderRadius: "8px",
  fontWeight: "bold",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: "#d32f2f",
  },
  transition: "background-color 0.3s",
}));

const ProductName = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  fontWeight: "600",
  color: theme.palette.primary.main,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const Price = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: "700",
  color: "#4caf50",
  marginTop: "8px",
}));

const Category = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  color: "#757575",
}));

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFromFavorites = (productId) => {
    const updatedFavorites = favorites.filter((product) => product.id !== productId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
        My Favorites
      </Typography>
      <Grid container spacing={3}>
        {favorites.length === 0 ? (
          <Typography variant="h6" sx={{ color: "#888" }}>No favorites added yet.</Typography>
        ) : (
          favorites.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <StyledCard>
                {product.photo && (
                  <CardMedia
                    component="img"
                    image={`data:image/jpeg;base64,${product.photo}`}
                    alt={product.name}
                    sx={{
                      width: "100%",
                      height: "200px",
                      borderRadius: "12px",
                      objectFit: "contain",
                      backgroundColor: "#fafafa",
                    }}
                  />
                )}
                <CardContent sx={{ padding: "16px" }}>
                  <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                    <ProductName variant="h6">{product.name}</ProductName>
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Stock:</strong> {product.stock}
                  </Typography>
                  <Price variant="body2">
                    ${product.price.toFixed(2)}
                  </Price>
                  <Category variant="body2">
                    <strong>Category:</strong> {product.category}
                  </Category>
                </CardContent>
                <RemoveButton onClick={() => handleRemoveFromFavorites(product.id)} fullWidth>
                  Remove from Favorites
                </RemoveButton>
              </StyledCard>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default Favorites;
