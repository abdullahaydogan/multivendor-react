import React, { useState, useEffect, useRef } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Box,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home,
  AddBox,
  Inventory,
  Favorite,
  ShoppingCart,
  People,
  ContactMail,
  Help,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/projeLogo1.png";
import SmallLogo from "../../assets/projeLogo1.png";

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: "#2C3E50",
    color: "white",
    width: "300px",
    paddingTop: "20px",
    transition: "width 0.3s",
  },
}));

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null); 
  const buttonRef = useRef(null); 

  const toggleSidebar = () => {
    setOpen(!open);
    console.log("Sidebar toggled, open:", !open);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const menuItems = [
    { text: "Home", icon: <Home sx={{ color: "white" }} />, path: "/" },
    {
      text: "Add Products",
      icon: <AddBox sx={{ color: "white" }} />,
      path: "/productCreate",
    },
    {
      text: "My Products",
      icon: <Inventory sx={{ color: "white" }} />,
      path: "/productList",
    },
    {
      text: "Favorites",
      icon: <Favorite sx={{ color: "white" }} />,
      path: "/favorites",
    },
    {
      text: "Cart",
      icon: <ShoppingCart sx={{ color: "white" }} />,
      path: "/cartpage",
    },
    {
      text: "Contact Us",
      icon: <ContactMail sx={{ color: "white" }} />,
      path: "/contact",
    },
    {
      text: "Ask AI",
      icon: <Help sx={{ color: "white" }} />, // Burada Help ikonu kullanılıyor.
      path: "/ai",
    },
  ];

  // Dışarıdaki tıklamaları dinleyip sidebar'ı kapatma işlemi
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false); // Sidebar'ı kapat
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
     <IconButton
  onClick={toggleSidebar}
  ref={buttonRef} // IconButton referansı
  sx={{
    color: "black",
    position: "fixed",
    top: "20px",
    left: open ? "300px" : "70px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  
    "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
    transition: "left 0.3s",
  }}
>
  <MenuIcon />
</IconButton>


      <CustomDrawer
        ref={sidebarRef} // Sidebar referansı
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            width: open ? "300px" : "70px",
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
            cursor: "pointer",
          }}
          onClick={() => handleNavigation("/")}
        >
          {open ? (
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "260px", height: "auto" }}
            />
          ) : (
            <img
              src={SmallLogo}
              alt="Logo"
              style={{ width: "80px", height: "auto" }}
            />
          )}
        </Box>

        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <Tooltip title={open ? "" : item.text} placement="right">
                <ListItem button onClick={() => handleNavigation(item.path)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {open && <ListItemText primary={item.text} />}
                </ListItem>
              </Tooltip>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </CustomDrawer>
    </>
  );
};

export default Sidebar;
