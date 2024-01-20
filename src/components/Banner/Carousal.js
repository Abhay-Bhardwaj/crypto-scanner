import { makeStyles } from '@mui/styles'
import axios from 'axios';
import React, { useEffect } from 'react'
import { TrendingCoins } from '../../config/api';
import { useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import 'react-alice-carousel/lib/alice-carousel.css';


const useStyles=makeStyles({
    carousal:{
        height: '50%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
      },

})

export function numberWithCommas(x) {
    if (x !== undefined) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return '';
    }
  }
  
const Carousal = () => {
    const [trending, setTrending]=useState([]);
    const classes=useStyles();

    const {currency, symbol}= CryptoState();

    const fetchTrendingCoins= async(currency)=>{
        const {data}= await axios.get(TrendingCoins(currency));
        setTrending(data);
    };
    useEffect(() => {
        fetchTrendingCoins(currency);
    }, [currency]);

    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h>=0;
        return(
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
                <img src={coin?.image} alt={coin.name} height="80" style={{
                    marginBottom: 10,
                }}/>
                <span>{coin?.symbol}
                    &nbsp;
                    <span style={{color: profit>0?"rgb(14,203,129)" : "red"}}> {profit && "+" } {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{fontSize: 22, fontWeight: 500,}}>
                    {symbol}{numberWithCommas(coin?.current_price.toFixed(2))}
                </span>

            </Link>
        )
    })

  return (
    <div className={classes.carousal}>
        <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableButtonsControls
        disableDotsControls
        responsive={
            {
                0: {items: 2},
                512: {items: 4,
                    itemsFit: 'contain'},
            }
        }
        items={items}
        autoPlay

        />
    </div>
  )
}

export default Carousal