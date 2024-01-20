import { Container, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React from 'react'
import Carousal from './Carousal';

const useStyles=makeStyles({
    banner:{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/banner.png'})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    }, 
    bannerContent:{
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 25,
        justifyContent: 'space-around',
    },
    tagline:{
        display: 'flex',
        height: '40%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const Banner = () => {
    const classes=useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography variant='h2' 
                style={{
                    fontWeight: 'bold',
                    marginBottom: 25,
                    fontFamily: 'Montserrat',
                }}>
                    Crypto Screener
                </Typography>
                <Typography variant='subtitle2' 
                style={{
                    color: 'darkgray',
                    textTransform: 'uppercase',
                    fontFamily: 'Montserrat',
                }}>
                    Get all the info about crypto coins
                </Typography>
            </div>
            <Carousal />
        </Container>
        
    </div>
  )
}

export default Banner