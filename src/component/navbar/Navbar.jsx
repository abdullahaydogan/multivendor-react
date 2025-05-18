import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom"; 

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Logout", "Login", "Profile"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate(); 

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLoginRedirect = () => {
    //    navigate to '/logIn' page
    navigate("/logIn");
    handleCloseUserMenu(); // closed Menu  
  };

  const handleProfileRedirect = () => {
    //  navigate to '/'
    navigate("/profile");
    handleCloseUserMenu(); // closed Menu  
  };

  const handleAccountRedirect = () => {
    //  sayfasına navigate to '/account'
    navigate("/account");
    handleCloseUserMenu(); // closed Menu  
  };

  const handleDashboardRedirect = () => {
    //  sayfasına navigate to '/dashboard'
    navigate("/dashboard");
    handleCloseUserMenu(); // closed Menu  
  };

  const handleLogout = () => {
    alert("Logged out");
    handleCloseUserMenu(); // Menu closed 
    // Remove the JWT token from local storage or cookies
    localStorage.removeItem("authToken"); // or cookies.remove("authToken");
    // Redirect the user to the login page
    navigate("/logIn");
    // Close the menu
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#ffff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "flex-end" }}>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center", color: "black" }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Abdullah" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={
                    setting === "Login"
                      ? handleLoginRedirect
                      : setting === "Profile"
                      ? handleProfileRedirect
                      : setting === "Account"
                      ? handleAccountRedirect
                      : setting === "Dashboard"
                      ? handleDashboardRedirect
                      : setting === "Logout"
                      ? handleLogout
                      : handleCloseUserMenu
                  }
                >
                  <Typography sx={{ textAlign: "center", color: "black" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
