import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ResponsiveAppBar from './NavBar.jsx';
import { Typography, Container, Grid, Box, TextField, Button } from '@mui/material';

export default function ContactPage() {
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSubmit = () => {
    console.log("Email:", email);
    console.log("Message:", message);
    alert("Mensaje enviado. ¡Gracias por contactarnos!");
    setEmail('');
    setMessage('');
  };

  return (
    <div>
      <ResponsiveAppBar />
      <Container maxWidth="md" sx={{ marginTop: '40px' }}>
        <Typography variant="h4" textAlign="center" fontWeight="bolder" gutterBottom>
          Contacto
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ImageList cols={3} rowHeight={164}>
              {itemData.map((item) => (
                <ImageListItem key={item.img} gap={10}>
                  <img
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
              <Typography variant="h6" fontWeight="bold">
                Contáctanos
              </Typography>
              <TextField
                label="Correo Electrónico"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Mensaje"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ marginTop: 2 }}
              >
                Enviar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
];
