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
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
const pages = ["My Posts", "write", "About"];
const settings = ["account", "logout"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
  const { user } = React.useContext(Context);
  return (
    <AppBar position="fixed" style={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Link to="/" style={{ color: "black", textDecoration: "none" }}>
              THE BLOG
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              style={{ color: "black" }}
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
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Link
                to={user ? `/myposts` : "/login"}
                style={{ color: "black", textDecoration: "none" }}
              >
                <MenuItem key="myposts" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">My Posts</Typography>
                </MenuItem>
              </Link>
              <Link
                to={user === null ? `/login` : "/write"}
                style={{ color: "black", textDecoration: "none" }}
              >
                <MenuItem key="write" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Write</Typography>
                </MenuItem>
              </Link>
              <Link
                to={`/about`}
                style={{ color: "black", textDecoration: "none" }}
              >
                <MenuItem key="about" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">About</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Link to="/" style={{ color: "black", textDecoration: "none" }}>
              THE BLOG
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link
              to={user ? `/myposts` : "/login"}
              style={{ color: "black", textDecoration: "none" }}
            >
              <MenuItem key="myposts" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">My Posts</Typography>
              </MenuItem>
            </Link>
            <Link
              to={user ? `/write` : "/login"}
              style={{ color: "black", textDecoration: "none" }}
            >
              <MenuItem key="write" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Write</Typography>
              </MenuItem>
            </Link>
            <Link
              to={`/about`}
              style={{ color: "black", textDecoration: "none" }}
            >
              <MenuItem key="about" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">About</Typography>
              </MenuItem>
            </Link>
          </Box>
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
                  />
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
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Link
                      to={`/${setting}`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <div>
              <Link
                to="/login"
                style={{ color: "black", textDecoration: "none" }}
              >
                LOGIN
              </Link>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
