// src/components/LoginPage.jsx

import React, { useState } from 'react';
import { Paper, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer.jsx';
import { loginUser } from '../utils/tokenUtils';

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Login button clicked");
    setLoading(true);

    const result = await loginUser(email, password);

    if (result.success) {
      console.log(result.message);
      if (onLoginSuccess) {
        await onLoginSuccess();
      }
      navigate('/dashboard');
    } else {
      alert(result.message);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#1976d2'
      }}
    >
      <Footer />
      <div>
        <Typography variant="h4" gutterBottom color='white' fontWeight={'bolder'}>
          ¡Bienvenido!
        </Typography>
      </div>

      <Paper elevation={3} style={{ padding: 20, width: 300 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          style={{ marginTop: 10 }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </Button>
      </Paper>
    </div>
  );
};

export default LoginPage;
