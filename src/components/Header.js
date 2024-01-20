import React from 'react'
import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";

const useStyles = makeStyles({
    title: {
        flex: 1,
        color: 'orange',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        cursor: 'pointer',
    }
})

const Header = () => {
    const classes = useStyles();
    const history = useNavigate();

    const {currency, setCurrency,user} = CryptoState();
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography 
                            onClick={() => history("/")} 
                            className={classes.title}
                            variant='h6'
                        >
                            Crypto Screener
                        </Typography>
                        <Select variant="outlined"
                            style={{
                                width: 100,
                                height: 40,
                                marginRight: 15,
                            }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={"INR"}>INR</MenuItem>
                            <MenuItem value={"USD"}>USD</MenuItem>

                        </Select>
                        {user ? <UserSidebar /> : <AuthModal />}
        
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header;
