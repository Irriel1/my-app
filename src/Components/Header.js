import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, ButtonGroup, Button } from '@mui/material';
import { AccountCircle, Language, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { useAuth0 } from '@auth0/auth0-react';
import { useLanguage } from '../languages/LanguageContext';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { language, setLanguage } = useLanguage();

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.body.style.backgroundColor = newDarkMode ? '#59411c' : '#fff';
    document.body.style.color = newDarkMode ? '#fff' : '#59411c';
    document.body.classList.toggle('dark-mode', newDarkMode);
    console.log('Dark mode is now', newDarkMode ? 'enabled' : 'disabled');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuOpen = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    handleLanguageMenuClose();
  };

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    const isDarkMode = storedDarkMode === 'true';
    setIsDarkMode(isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, []);

  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: isDarkMode ? 'dark-mode' : 'light-mode' }}>
      <Toolbar>
        <ButtonGroup variant="h6" aria-label="text button group" sx={{ flexGrow: 1, textAlign: 'left', marginLeft: (theme) => theme.spacing(4) }}>
          <Button component={Link} to="/">
            Domovská stránka
          </Button>
          <Button component={Link} to="/shopping-list">
            Nákupní seznam
          </Button>
          <Button component={Link} to="/shopping-lists">
            Seznamy nákupních seznamů
          </Button>
        </ButtonGroup>
        <IconButton color="inherit" onClick={toggleDarkMode}>
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <IconButton color="inherit" onClick={handleLanguageMenuOpen}>
          <Language />
        </IconButton>
        <Menu anchorEl={languageAnchorEl} open={Boolean(languageAnchorEl)} onClose={handleLanguageMenuClose}>
          <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('cs')}>Česky</MenuItem>
        </Menu>
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <AccountCircle />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>Profil uživatele</MenuItem>
          <MenuItem>
            <LoginButton />
            <LogoutButton />
            <Profile />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
