import React from "react";
import { Container, Typography, Box } from "@mui/material";
import ProductList from "../productList/ProductList";

const Home = () => {
  return (
    <Container maxWidth="sx" sx={{ mt: 1 }}>
      <Box
        sx={{
         
          backgroundColor: "#f9f9f9", // Eğer arka plan rengini aktif etmek isterseniz
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: "#3f51b5",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Products
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{
            marginBottom: 3,
            color: "#666",
          }}
        >
          Explore our collection of amazing products.
        </Typography>
        {/* Ürün listesi bileşeni */}
        <ProductList />
      </Box>
    </Container>
  );
};

export default Home;
