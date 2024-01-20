import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = ({handleClose}) => {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    const {setAlert}=CryptoState();

    const handleSubmit= async()=>{
        
        if(!email || !password || !confirmPassword){
            setAlert({open:true, message:"Please fill all the fields", type:"error"});
            return;
        }
        if(password!==confirmPassword){
            setAlert({open:true, message:"Password do not match", type:"error"});
            return;
        }
        try{
            const result= await createUserWithEmailAndPassword(
                                auth,
                                email, 
                                password);
            setAlert({open:true, message:`Welcome ${result.user.email}`, type:"success"});
            handleClose();
        } catch (error){
            setAlert({open:true, message:error.message, type:"error"});
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleSubmit();
        }
      };
  return (
    <Box p={3}
        style={{display:"flex", flexDirection:"column", gap:"20px"}}>
            <TextField
                label="Enter Email"
                type='email'
                variant="outlined"
                size="large"
                value={email}
                onChange={(e)=>setEmail(e.target.value)} 
                onKeyDown={handleKeyDown}
                 fullWidth/>
                
            <TextField
                label="Enter Password"

                variant="outlined"
                size="large"
                value={password}
                onChange={(e)=>setPassword(e.target.value)} 
                onKeyDown={handleKeyDown}
                 fullWidth/>
            <TextField
                label="Enter Confirm Password"
                type='password'
                variant="outlined"
                size="large"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)} 
                onKeyDown={handleKeyDown} fullWidth/>
            <Button variant="contained"
                size="large"
                style={{backgroundColor: "#EEBC1D", color:"black"}}
                onClick={handleSubmit}
                fullWidth>
                     Login</Button>
    </Box>
  )
}

export default SignUp