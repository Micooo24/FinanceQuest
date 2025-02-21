


import React, { useState } from 'react';
import { Box, Typography, Button, Modal, Fade, Backdrop, Grid, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const storeItems = [
  { name: 'Rice (5kg)', type: 'Need', price: 300 },
  { name: 'Eggs (1 dozen)', type: 'Need', price: 200 },
  { name: 'Canned Tuna', type: 'Need', price: 90 },
  { name: 'Vegetables (per set)', type: 'Need', price: 150 },
  { name: 'Instant Noodles', type: 'Want', price: 25 },
  { name: 'Soft Drinks (1.5L)', type: 'Want', price: 80 },
  { name: 'Chips (Large)', type: 'Want', price: 120 }
];

const Modal8GroceryGame = ({ onCheckout }) => {
  const [cart, setCart] = useState({});
  const budget = 2000;

  const handleQuantityChange = (item, amount) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      const currentQty = newCart[item.name] || 0;
      const newQty = Math.max(0, currentQty + amount);
      if (newQty === 0) delete newCart[item.name];
      else newCart[item.name] = newQty;
      return newCart;
    });
  };

  const totalSpent = Object.entries(cart).reduce((sum, [itemName, qty]) => {
    const item = storeItems.find(i => i.name === itemName);
    return sum + (item.price * qty);
  }, 0);

  return (
    <Modal open={true} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } } }}>
      <Fade in={true}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '600px',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
            textAlign: 'center'
          }}
        >
          <Typography variant="h6" sx={{ fontFamily: 'Cinzel, serif', fontWeight: 'bold', mb: 2 }}>🛒 Grocery Selection</Typography>
          <Typography variant="body1" sx={{ fontFamily: 'Fraunces, serif', mb: 2 , color: '#000'}}>Choose your items wisely! Stay within your ₱2,000 budget.</Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 , color: '#000'}}>Remaining Budget: ₱{budget - totalSpent}</Typography>
          
          <Grid container spacing={2} justifyContent="center">
            {storeItems.map((item) => (
              <Grid item xs={12} sm={6} key={item.name}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, border: '1px solid black', borderRadius: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' , color: '#000'}}>{item.name} - ₱{item.price}</Typography>
                  <Box>
                    <IconButton size="small" onClick={() => handleQuantityChange(item, -1)}><Remove /></IconButton>
                    <Typography variant="body2" sx={{ display: 'inline', mx: 1 , color: '#000'}}>{cart[item.name] || 0}</Typography>
                    <IconButton size="small" onClick={() => handleQuantityChange(item, 1)}><Add /></IconButton>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          
          <Button 
            variant="contained" 
            sx={{ mt: 3, backgroundColor: '#8c2fc7', color: '#fff', fontFamily: 'Cinzel, serif' }}
            onClick={() => onCheckout(totalSpent)}
          >
            Checkout
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Modal8GroceryGame;