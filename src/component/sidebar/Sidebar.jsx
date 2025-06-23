// src/component/sidebar/Sidebar.jsx
import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import {
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  ExpandLess,
  ExpandMore,
  Home as HomeIcon,
  Favorite as FavoriteIcon,
  AddBox as AddBoxIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../api/CategoryApiServices";

const drawerWidth = 300;  // ← Burayı büyüttük

const Sidebar = ({ onCategorySelect }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [openShop, setOpenShop] = useState(true);
  const [openCategories, setOpenCategories] = useState(false);

  useEffect(() => {
    getAllCategories()
      .then((cats) => setCategories(cats))
      .catch(() => setCategories([]));
  }, []);

  const handleCategoryClick = (id) => {
    onCategorySelect?.(id);
    navigate("/filteredProductsByCategory");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1a1d2e",
          color: "white",
          paddingTop: 2,
        },
      }}
    >
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <img
          src="src/assets/logo3.png"
          alt="Logo"
          style={{ width: 160 }}
        />
      </Box>

      <Typography
        variant="subtitle2"
        sx={{ pl: 3, mb: 1, color: "#888", letterSpacing: 1, fontWeight: "bold" }}
      >
        SHOP
      </Typography>

      <List disablePadding>
        <ListItemButton onClick={() => setOpenShop((o) => !o)}>
          <ListItemIcon sx={{ color: "white" }}>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Shop" />
          {openShop ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openShop} timeout="auto" unmountOnExit>
          <List disablePadding sx={{ pl: 4 }}>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemIcon sx={{ color: "white" }}><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/cartpage")}>
              <ListItemIcon sx={{ color: "white" }}><CategoryIcon /></ListItemIcon>
              <ListItemText primary="Cart" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/favorites")}>
              <ListItemIcon sx={{ color: "white" }}><FavoriteIcon /></ListItemIcon>
              <ListItemText primary="Favorites" />
            </ListItemButton>

            <ListItemButton onClick={() => setOpenCategories((o) => !o)}>
              <ListItemIcon sx={{ color: "white" }}><CategoryIcon /></ListItemIcon>
              <ListItemText primary="Categories" />
              {openCategories ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCategories} timeout="auto" unmountOnExit>
              <List disablePadding sx={{ pl: 4 }}>
                {categories.length > 0
                  ? categories.map((c) => (
                      <ListItemButton
                        key={c.id}
                        sx={{ pl: 4 }}
                        onClick={() => handleCategoryClick(c.id)}
                      >
                        <ListItemText primary={c.name} />
                      </ListItemButton>
                    ))
                  : (
                    <ListItemText
                      sx={{ pl: 4, color: "#bbb", fontStyle: "italic" }}
                      primary="No categories found"
                    />
                  )
                }
              </List>
            </Collapse>

            <ListItemButton onClick={() => navigate("/productCreate")}>
              <ListItemIcon sx={{ color: "white" }}><AddBoxIcon /></ListItemIcon>
              <ListItemText primary="Add Products" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      <Divider sx={{ bgcolor: "#444", my: 2 }} />

      <Typography
        variant="subtitle2"
        sx={{ pl: 3, mb: 1, color: "#888", letterSpacing: 1, fontWeight: "bold" }}
      >
        HELP CENTER
      </Typography>
      <List>
        <ListItemButton onClick={() => navigate("/ai")}>
          <ListItemIcon sx={{ color: "white" }}><CategoryIcon /></ListItemIcon>
          <ListItemText primary="Ask AI" />
        </ListItemButton>
         <ListItemButton onClick={() => navigate("/contactUs")}>
          <ListItemIcon sx={{ color: "white" }}><ContactSupportIcon /></ListItemIcon>
          <ListItemText primary="Contact Us" />
        </ListItemButton>
         <ListItemButton onClick={() => navigate("/aboutUs")}>
          <ListItemIcon sx={{ color: "white" }}><ContactSupportIcon /></ListItemIcon>
          <ListItemText primary="About Us" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
