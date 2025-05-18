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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchBar from "../../component/serchbar/SearchBar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s, box-shadow 0.3s",
  maxWidth: 220,
  margin: "0 auto",
  position: "relative",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  },
}));

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "8px",
  right: "8px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    color: theme.palette.primary.main,
  },
}));

const FavoriteIconStyled = styled(FavoriteIcon)(({ theme }) => ({
  transition: "all 0.3s ease-in-out",
  color: "#757575",
  "&:hover": {
    color: "red",
  },
}));

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
      const matchesQuery = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "" || product.category === selectedCategory;

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
    setSnackbarMessage(`"${product.name}" favorilerinize eklendi!`);
    setOpenSnackbar(true);
  };

  const handleAddToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const isProductInCart = storedCart.some(item => item.id === product.id);

    if (isProductInCart) {
      alert("Bu ürün zaten sepetinizde.");
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
    <div style={{ padding: "16px", backgroundColor: "#f9f9f9" }}>
         <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
      />
      <Grid container spacing={2} alignItems="stretch">
        {filteredProducts.map((product) => (
          <Grid
            item
            xs={12}
            sm={2} // Her satırda 6 ürün olacak şekilde düzenlendi
            md={2}
            key={product.id}
            style={{ flexBasis: "16.666%" }}
            mb={4}
          >
            <StyledCard>
              {product.photo && (
                <CardMedia
                  component="img"
                  image={`data:image/jpeg;base64,${product.photo}`}
                  alt={product.name}
                  sx={{
                    width: "100%",
                    height: "250px",
                    borderRadius: "8px",
                    objectFit: "contain",
                    backgroundColor: "white",
                  }}
                />
              )}
              <CardContent>
                <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                  <Typography variant="h6" component="div" color="primary">
                    {product.name}
                  </Typography>
                </Link>
                <Typography variant="body2" color="text.secondary">
                  <strong>Stock:</strong> {product.stock}
                </Typography>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ fontWeight: "bold", fontSize: "1em" }}
                >
                  Price:{" "}
                  <span style={{ color: "#28a745" }}>
                    ${product.price.toFixed(2)}
                  </span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Category:</strong> {product.category}
                </Typography>
              </CardContent>
              <IconButtonStyled
                onClick={() => handleAddToCart(product)}
                aria-label="add to cart"
              >
                <ShoppingCartIcon />
              </IconButtonStyled>
              <IconButtonStyled
                style={{
                  right: "40px",
                }}
                onClick={() => handleAddToFavorites(product)}
                aria-label="add to favorites"
              >
                <FavoriteIconStyled />
              </IconButtonStyled>
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
    </div>
  );
};

export default ProductList;
