// src/components/Sidebar.jsx
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddBoxIcon from "@mui/icons-material/AddBox";
import InventoryIcon from "@mui/icons-material/Inventory";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HelpIcon from "@mui/icons-material/Help";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo3.png";
import { Shop } from "@mui/icons-material";

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();

  const menuSections = [
    {
      title: "SHOP",
      items: [
        { text: "Home", icon: <HomeIcon />, path: "/" },

        { text: "My Products", icon: <InventoryIcon />, path: "/productList" },
        { text: "Cart", icon: <Shop />, path: "/cartpage" },
        { text: "Favorites", icon: <FavoriteIcon />, path: "/favorites" },
        { text: "Contact", icon: <ContactMailIcon />, path: "/contact" },
        { text: "Add Products", icon: <AddBoxIcon />, path: "/productCreate" },
      ],
    },
    {
      title: "HELP CENTER",
      items: [{ text: "Ask AI", icon: <HelpIcon />, path: "/ai" }],
    },
  ];

  return (
<Drawer
  variant="permanent"
  sx={{
    width: 240,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: {
      width: 240,
      boxSizing: "border-box",
      backgroundColor: "#1a1d2e",
      color: "white",
    },
  }}
>


      {/* ✅ Yeni logo alanı */}
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <img
          src={Logo}
          alt="KOU Bazaar Logo"
          style={{ width: "180px", height: "auto" }}
        />
      </Box>

      {/* Menü bölümleri */}
      {menuSections.map((section, idx) => (
        <Box key={idx}>
          <Typography variant="subtitle2" sx={{ pl: 2, pt: 1, color: "#888" }}>
            {section.title}
          </Typography>
          <List>
            {section.items.map((item) => (
              <Tooltip title={item.text} placement="right" key={item.text}>
                <ListItem button onClick={() => navigate(item.path)}>
                  <ListItemIcon sx={{ color: "white" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </Tooltip>
            ))}
          </List>
          <Divider sx={{ bgcolor: "#444" }} />
        </Box>
      ))}
    </Drawer>
  );
};

export default Sidebar;
