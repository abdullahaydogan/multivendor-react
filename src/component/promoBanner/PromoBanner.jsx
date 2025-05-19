import React from "react";
import { Box, Typography } from "@mui/material";

const PromoBanner = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#ffecb3",
        padding: 2,
        borderRadius: 2,
        mb: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ff9800" }}>
        🎉 Bugüne Özel %30 İndirim!
      </Typography>
      <Typography variant="body2">
        Seçili ürünlerde sepette otomatik indirim uygulanır.
      </Typography>
    </Box>
  );
};

export default PromoBanner;
