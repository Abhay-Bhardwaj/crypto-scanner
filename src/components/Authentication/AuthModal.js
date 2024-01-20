import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { makeStyles } from '@mui/styles';
import { AppBar, Backdrop, Fade, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import GoogleButton from 'react-google-button';
import { auth, signInwithGoogle } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { CryptoState } from '../../CryptoContext';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      color: 'white',
      borderRadius: 10,

    },
    google: {
      padding: 10,
      paddingTop: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      borderRadius: 10,
      fontSize: 16,
    },
    
  }));

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] =useState(0);
  const {setUser, setAlert}=CryptoState();

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider= new GoogleAuthProvider();
  const signInwithGoogle = async () => {
    await signInWithPopup(auth, googleProvider).then((result) => {
      setAlert({open:true, message:`Sign Up Succesful, Welcome ${result.user.email}`, type:"success"});
      setUser(result.user);
      
      handleClose();
    }).catch((error) => {
      setAlert({open:true, message:error.message, type:"error"});
      return ;
    });
  };


  return (
    <div>
      <Button variant="contained" style={{
        width: 85,
        height: 40,
        marginLeft:15,
        backgroundColor: "#EEBC1D",
      }} onClick={handleOpen}>Login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        // closeAfterTransition
        // slots={{ backdrop: Backdrop }}
        // slotProps={{
        //   backdrop: {
        //     timeout: 500,
        //   },
        // }}
        >
        <Fade in={open}>
            <div className={classes.paper}>
                <AppBar position="static"
                    style={{
                        backgroundColor: "transparent",
                        color:"white",
                        borderRadius: 10,
                    }}>
                        <Tabs value={value}
                            onChange={handleChange}
                            variant="fullWidth"
                            textColor="white"
                            style={{borderRadius: 10}}>
                            <Tab label="Login"/>
                            <Tab label="Register"/>
                        </Tabs>
                </AppBar>
                {value===0 && <Login handleClose={handleClose}/>}
                {value===1 && <SignUp handleClose={handleClose}/>}

                <Box className={classes.google}>
                  <span>OR</span>
                  <GoogleButton
                    style={{width: '100%', height: 50, marginTop: 10}}
                    onClick={signInwithGoogle}
                    />
                </Box>
            </div>

        </Fade>
      </Modal>
    </div>
  );
}