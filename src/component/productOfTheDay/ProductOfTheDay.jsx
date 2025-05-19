import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";

const ProductOfTheDay = ({ products }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products.length > 0) {
      const randomIndex = Math.floor(Math.random() * products.length);
      setProduct(products[randomIndex]);
    }
  }, [products]);

  if (!product) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        🌟 Günün Ürünü
      </Typography>
      <Card>
        <CardMedia
          component="img"
          image={`data:image/jpeg;base64,${product.photo}`}
          alt={product.name}
          sx={{ height: 220, objectFit: "contain", backgroundColor: "#fff", p: 1 }}
        />
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.category}
          </Typography>
          <Typography variant="body2" sx={{ color: "#28a745", fontWeight: "bold" }}>
            ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductOfTheDay;
