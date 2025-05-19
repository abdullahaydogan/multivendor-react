import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import { getUserInfo } from "../../utils/authService";
import ProductList from "../productList/ProductList";
import PromoBanner from "../../component/promoBanner/PromoBanner";
import ProductOfTheDay from "../../component/productOfTheDay/ProductOfTheDay";


const Home = () => {
  const user = getUserInfo();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("allProducts");
    if (stored) setProducts(JSON.parse(stored));
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 2, px: 4 }}>
      <Box sx={{ backgroundColor: "#f4f6f8", p: 3, borderRadius: 3 }}>

   
        

        {/* Rol bazlı mesaj */}
        {user?.role && (
          <Typography
            align="center"
            sx={{
              fontWeight: "bold",
              my: 3,
              color:
                user.role === "Admin"
                  ? "green"
                  : user.role === "Saler"
                  ? "orange"
                  : "blue",
            }}
          >
            {user.role === "Admin" && "Admin olarak giriş yaptınız. Yönetim yetkileriniz aktif."}
            {user.role === "Saler" && "Satıcı paneline hoş geldiniz!"}
            {user.role === "User" && "Ürünleri keşfetmeye başlayabilirsiniz 🎉"}
          </Typography>
        )}

        {/* 🟪 Kampanya & Günün Ürünü */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PromoBanner />
          
          </Grid>
          <Grid item xs={12} md={6}>
            <ProductOfTheDay products={products} />
          </Grid>
        </Grid>


        {/* 📦 Ürün listesi */}
        <Box sx={{ mt: 5 }}>
          <ProductList setAllProducts={setProducts} />
        </Box>

  
      </Box>
    </Container>
  );
};

export default Home;
