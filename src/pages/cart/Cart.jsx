import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, IconButton, Button, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  marginBottom: "16px",
  padding: "16px",
  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)", // Daha belirgin gölge
  borderRadius: "16px", // Daha yuvarlak köşeler
  color:"#2C3E50",
  backgroundColor: "#fff",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)", // Hoverda daha yoğun gölge
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: "120px",
  height: "120px",
  objectFit: "cover", // Resmi daha uygun şekilde kesme
  marginRight: "20px",
  borderRadius: "12px", // Resim köşelerini yuvarlama
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "12px",
  borderRadius: "25px", // Butonları daha yuvarlak hale getirmek
  padding: "12px 24px",
  fontWeight: "bold",
  textTransform: "none",
  backgroundColor: "#1a73e8",  // Sidebar ile uyumlu renk (örneğin, mavi)
  color: "#fff",
  "&:hover": {
    backgroundColor: "#0f5bb5", // Hoverda daha koyu mavi
  },
}));



const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = storedCart.map(item => ({
      ...item,
      quantity: item.quantity && !isNaN(item.quantity) && item.quantity > 0 ? item.quantity : 1,
    }));
    setCartItems(updatedCart);

    const total = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalQuantity = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalPrice(total);
    setTotalQuantity(totalQuantity);
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const newTotal = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const newTotalQuantity = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalPrice(newTotal);
    setTotalQuantity(newTotalQuantity);
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const newTotal = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const newTotalQuantity = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalPrice(newTotal);
    setTotalQuantity(newTotalQuantity);
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const newTotal = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const newTotalQuantity = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalPrice(newTotal);
    setTotalQuantity(newTotalQuantity);
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "16px" }}>
        <Typography variant="h5" color="textSecondary" align="center" style={{ fontWeight: "600" }}>
          Your cart is empty.
        </Typography>
        <Link to="/productList">
          <StyledButton variant="contained" fullWidth>
            Go to Products
          </StyledButton>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px" }}>
      <Typography variant="h4" color="primary" gutterBottom align="center" style={{ fontWeight: "700" }}>
        Your Cart
      </Typography>
      <Grid container direction="column" spacing={2} style={{paddingLeft:"60px", paddingRight:"60px"}}>
        {cartItems.map((item) => (
          <Grid item key={item.id}>
            <StyledCard>
              <StyledCardMedia
                component="img"
                image={`data:image/jpeg;base64,${item.photo}`}
                alt={item.name}
              />
              <CardContent style={{ flex: 1 }}>
                <Typography variant="h6" color="primary" style={{ fontWeight: "600" }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: ${item.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Quantity: {item.quantity}
                </Typography>
                <div>
                  <StyledButton
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    +
                  </StyledButton>
                  <StyledButton
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    -
                  </StyledButton>
                </div>
              </CardContent>
              <IconButton
                onClick={() => handleRemoveFromCart(item.id)}
                color="secondary"
                aria-label="remove from cart"
                style={{ marginTop: "auto"}}
              >
                <DeleteIcon />
              </IconButton>
            </StyledCard>
            <Divider />
          </Grid>
        ))}
      </Grid>
      <div style={{ marginTop: "16px" }}>
        <Typography variant="h6" color="primary" align="center" style={{ fontWeight: "600" }}>
          Total Items: {totalQuantity}
        </Typography>
        <Typography variant="h5" color="primary" align="center" style={{ fontWeight: "700" }}>
          Total Price: ${totalPrice.toFixed(2)}
        </Typography>
        <StyledButton
          variant="contained"
          style={{ marginTop: "16px"}}
          fullWidth
        >
          Proceed to Checkout
        </StyledButton>
      </div>
    </div>
  );
};

export default Cart;