// src/pages/home/Home.jsx
import React, { useState, useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import { getUserInfo } from "../../utils/authService";
import PromoBanner from "../../component/promoBanner/PromoBanner";
import HeroCarousel from "../../component/heroCarousel/HeroCarousel";
import ProductList from "../productList/ProductList";
import {
  getProductsByCategoryId,
  getProducts,
} from "../../api/ProductApiServices";

const Home = ({ selectedCategoryId, onCategorySelect }) => {
  const user = getUserInfo();
  const [products, setProducts] = useState([]);

  // Seçili kategoriye göre veya tüm ürünler
  useEffect(() => {
    (async () => {
      try {
        const data = selectedCategoryId
          ? await getProductsByCategoryId(selectedCategoryId)
          : await getProducts();
        setProducts(data);
      } catch {
        setProducts([]);
      }
    })();
  }, [selectedCategoryId]);

  return (
    <Container maxWidth="xl" sx={{ mt: 12, px: 3 }}>
      {/* {user?.role === "User" && (
        <Typography
          align="center"
          sx={{
            color: "primary.main",
            fontWeight: "600",
            my: 3,
            fontSize: { xs: "1rem", sm: "1.2rem" },
          }}
        >
          🎉 Ürünleri keşfetmeye başlayabilirsiniz
        </Typography>
      )}

      {user?.role && user.role !== "User" && (
        <Typography
          align="center"
          sx={{
            fontWeight: "700",
            mb: 4,
            color:
              user.role === "Admin"
                ? "success.main"
                : user.role === "Saler"
                ? "warning.main"
                : "primary.main",
            fontSize: { xs: "1.1rem", sm: "1.3rem" },
          }}
        >
          {user.role === "Admin" &&
            "Admin olarak giriş yaptınız. Yönetim yetkileriniz aktif."}
          {user.role === "Saler" && "Satıcı paneline hoş geldiniz!"}
        </Typography>
      )} */}
      <PromoBanner />
      <HeroCarousel onCategorySelect={onCategorySelect} />

      <ProductList products={products} />
    </Container>
  );
};

export default Home;
