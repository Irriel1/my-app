import React, { useState, useEffect, useNavigate } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle, Settings, Brightness4, Brightness7 } from '@mui/icons-material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) { return <div>Loading ...</div> }


  return (
    <AppBar position="static" sx={{ backgroundColor: darkMode ? '#333' : '#964B00' }}>
      <Toolbar>
        
        <ButtonGroup variant="h6" aria-label="text button group" sx={{ flexGrow: 1, textAlign: "left", marginLeft: (theme) => theme.spacing(4) }}>
          <Button component={Link} to="/">Domovská stránka</Button>
          <Button component={Link} to="/shopping-list">Nákupní seznam</Button>
          <Button component={Link} to="/shopping-lists">Seznamy nákupních seznamů</Button>
        </ButtonGroup>
        <IconButton color="inherit" onClick={toggleDarkMode}>
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profil uživatele</MenuItem>
          <MenuItem><LoginButton/>
          <LogoutButton/>     
          <Profile/></MenuItem>
        </Menu>
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;