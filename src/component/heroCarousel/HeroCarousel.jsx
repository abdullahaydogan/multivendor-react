// src/component/heroCarousel/HeroCarousel.jsx
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { getAllCategories } from "../../api/CategoryApiServices";
import { useNavigate } from "react-router-dom";

// Resimler import
import elektronikImg from "../../assets/categories/elektronik.jpeg";
import beyazesyaImg from "../../assets/categories/beyazeşya.jpeg";
import mobilyaImg from "../../assets/categories/mobilya 2.jpeg";
import takiImg from "../../assets/categories/takı1.jpg";
import kitap from "../../assets/categories/kitap.jpg";
import giyim from "../../assets/categories/giyim.jpg";
import spor from "../../assets/categories/spor.jpg";
import mutfak from "../../assets/categories/mutfak.jpg";
import ofis from "../../assets/categories/ofis.jpg";
import oyuncak from "../../assets/categories/oyuncak.jpg";

const categoryImages = {
  1: elektronikImg,
  2: beyazesyaImg,
  3: mobilyaImg,
  4: kitap,  
  5: giyim,
  6: spor,
  7: mutfak,
  8: ofis,
  9: oyuncak,
  10: takiImg,
  16: takiImg,
};

export default function HeroCarousel({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    getAllCategories()
      .then((cats) => setCategories(cats))
      .catch(() => setCategories([]));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: dots => (
      <Box
        component="ul"
        sx={{
          position: "absolute",
          bottom: 16,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 1,
          listStyle: "none",
          p: 0,
          m: 0,
        }}
      >
        {dots}
      </Box>
    ),
    customPaging: i => (
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.5)",
          "&.slick-active": {
            backgroundColor: theme.palette.secondary.main,
          },
        }}
      />
    ),
  };

  return (
    <Box sx={{ mb: 4, position: "relative" }}>
      <Slider {...settings}>
        {categories.map(cat => (
          <Box
            key={cat.id}
            sx={{
              position: "relative",
              height: { xs: 100, md: 400 },
              backgroundImage: `url(${categoryImages[cat.id] || elektronikImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay gradyan */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))",
              }}
            />

            {/* İçerik */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: { xs: "center", md: "flex-start" },
                textAlign: { xs: "center", md: "left" },
                px: { xs: 2, md: 8 },
              }}
            >
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  mb: 2,
                  textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                }}
              >
                {cat.name}
              </Typography>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
