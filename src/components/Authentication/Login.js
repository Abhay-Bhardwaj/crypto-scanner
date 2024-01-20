import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const Login = ({handleClose}) => {

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const {setAlert}=CryptoState();

    const handleSubmit=async()=>{
      if(!email || !password){
        setAlert({open:true, message:"Please fill all the fields", type:"error"});
        return;
      }

      try{
        const result= await signInWithEmailAndPassword(
                            auth,
                            email, 
                            password);
        setAlert({open:true, message:`Login Successful, Welcome ${result.user.email}`, type:"success"});
        handleClose();
      }catch(error){
        setAlert({open:true, message:error.message, type:"error"});
      }
    };
  
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleSubmit();
      }
    };
  return (
    <Box p={3} autoComplete="on"
    style={{display:"flex", flexDirection:"column", gap:"20px"}}>
        <TextField
            type='email'
            label="Enter Email"
            variant="outlined"
            size="large"

            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="on" fullWidth/>
        <TextField
            type='password'
            label="Enter Password"
            variant="outlined"
            size="large"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="on" fullWidth/>

        <Button variant="contained"
            size="large"
            style={{backgroundColor: "#EEBC1D", color:"black"}}
            onClick={handleSubmit}
            type="submit"
            fullWidth>
                 Login</Button>
</Box>
  )
}

export default Login