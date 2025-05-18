import React from "react";
import { Typography } from "@mui/material";

const ChatHeader = () => {
  return (
    <Typography
      variant="h5"
      color="#3c4043"
      fontWeight="bold"
      backgroundColor="#f8f9fa"
      sx={{ textAlign: "center", marginBottom: 0, padding: "16px 0" }}
    >
      Ask KOU BAZAAR AI
    </Typography>
  );
};

export default ChatHeader;