import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, deleteProduct } from "../ProductApiServices";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete the product?")) {
      try {
        await deleteProduct(id);
        alert("Product deleted successfully");
        navigate("/products");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleUpdate = () => {
    navigate(`/product/${id}/update`);
  };

  if (loading) return <CircularProgress sx={{ display: "block", margin: "auto" }} />;
  if (error) return <Alert severity="error">Error: {error}</Alert>;
  if (!product) return <p className="not-found">Product not found.</p>;

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
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
          <Typography variant="h4" component="div" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1">
            <strong>Stock:</strong> {product.stock}
          </Typography>
          <Typography variant="body1">
            <strong>Price:</strong> ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="body1">
            <strong>Category:</strong> {product.category}
          </Typography>
        </CardContent>
        <div style={{ padding: "16px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            sx={{ mr: 2 }}
          >
            Update
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default ProductDetail;
