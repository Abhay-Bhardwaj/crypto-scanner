import React from 'react';
import { CryptoState } from '../CryptoContext';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const CryptoAlert = () => {
  const { alert, setAlert } = CryptoState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ open: false });
  };

  return (
    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity={alert.type} elevation={6} variant="filled">{alert.message}</MuiAlert>
    </Snackbar>
  );
}

export default CryptoAlert;
