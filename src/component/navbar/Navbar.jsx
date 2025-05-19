import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import TranslateIcon from "@mui/icons-material/Translate";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../utils/authService";
import logo from "../../assets/projeLogo2.png";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [langAnchorEl, setLangAnchorEl] = useState(null);
  const navigate = useNavigate();
  const user = getUserInfo();

  const cartCount = JSON.parse(localStorage.getItem("cart"))?.length || 0;
  const isLoggedIn = Boolean(user);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLangClick = (event) => setLangAnchorEl(event.currentTarget);
  const handleLangClose = () => setLangAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/logIn");
    handleMenuClose();
  };

  const handleLanguageChange = (langCode) => {
    alert(`Language switched to ${langCode.toUpperCase()}`);
    handleLangClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#fff",
        color: "#333",
        boxShadow: 1,
        left: "240px", // sidebar genişliği kadar sağdan başlasın
        width: "calc(100% - 240px)", // sidebar dışında kalan kısmı kapsasın
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        {" "}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img src={logo} alt="logo" height="35" />
          <Typography variant="h6" sx={{ fontWeight: "bold", ml: 1 }}>
            KOU Bazaar
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={() => navigate("/cartpage")}>
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Tooltip title="Language">
            <IconButton onClick={handleLangClick}>
              <TranslateIcon />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={langAnchorEl}
            open={Boolean(langAnchorEl)}
            onClose={handleLangClose}
          >
            <MenuItem onClick={() => handleLanguageChange("en")}>
              🇬🇧 English
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange("tr")}>
              🇹🇷 Türkçe
            </MenuItem>
          </Menu>

          <IconButton>
            <SettingsIcon />
          </IconButton>
          <Typography>{user?.username || "Guest"}</Typography>
          <Tooltip title="Account">
            <IconButton onClick={handleMenuClick}>
              <Avatar>{user?.username?.[0]?.toUpperCase() || "A"}</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {isLoggedIn ? (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            ) : (
              <MenuItem onClick={() => navigate("/logIn")}>Login</MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
