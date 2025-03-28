// src/components/NavBar.jsx

import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { removeToken } from '../utils/tokenUtils';

const pages = [
  { name: 'Inicio', path: '/dashboard' },
  { name: 'Contacto', path: '/contacto' },
  { name: 'Log out', path: '/login', Icon: <LogoutIcon /> } 
];

function ResponsiveAppBar({ onLogout }) {
  const navigate = useNavigate();

  const logOut = () => {
    removeToken(); // Remove token using tokenUtils
    console.log('Token removed from session.');
    if (onLogout) {
      onLogout();
    }
    navigate('/login'); // Redirect to login page
  };

  return (
    <AppBar sx={{ width: '100%' }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters sx={{ width: '100%' }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Act2Web
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => {
                  if (page.name === 'Log out') {
                    logOut(); // Log out when "Log out" is clicked
                  } else {
                    navigate(page.path); // Navigate to other pages
                  }
                }}
                endIcon={page.Icon}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
