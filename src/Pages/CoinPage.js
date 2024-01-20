import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/api';
import axios from 'axios';
import { styled } from '@mui/system';
import CoinInfo from '../components/Banner/CoinInfo';
import { LinearProgress, Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ReactHtmlParser from 'html-react-parser';
import { numberWithCommas } from '../components/Banner/Carousal';


const useStyles = makeStyles((theme) =>({ 
  heading: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontfamily: "Montserrat",
  },
  description: {
    width: '100%',
    fontfamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: 'justify',
  },
  marketData: {
    alignSelf: 'start',
    padding: 25,
    paddingTop: 10,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      alignItems: 'start',
    },

  }

}));


const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Sidebar = styled('div')(({ theme }) => ({
  width: '30%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 25,
  borderRight: '2px solid grey',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    borderRight: 'none',
  },
}));

const CoinPage = () => {
  const {id}=useParams();
  const [coin, setCoin]=useState();
  const {currency, symbol}= CryptoState();
  useEffect(() => {
    const fetchCoins= async ()=>{
      const {data} = await axios.get(SingleCoin(id));
      setCoin(data);
    };
    fetchCoins();

  }, [id]);

  const classess=useStyles();

  if(!coin) return <LinearProgress style={{backgroundColor: 'gold'}} />;


  return (
      <Container>
        <Sidebar>
          <img 
          src={coin?.image?.large}
          alt={coin?.name}
          height='200'
          style={{marginBottom: 20}}
          />
          <Typography variant='h4' className={classess.heading}>
            {coin?.name}
          </Typography>
          <Typography variant='subtitle1' className={classess.description}>
            {coin?.description?.en && typeof coin.description.en === 'string' ? ReactHtmlParser(coin.description.en.split('. ')[0]) : ''}
          </Typography>
          <div className={classess.marketData}>
            <span style={{display: 'flex', padding:'10 10 10 10'}}>
              <Typography variant="h5" className={classess.heading}>
                Rank:
              </Typography>
              &nbsp;&nbsp;
              <Typography variant="h6" 
              style={{
                fontFamily: 'Montserrat',
              }}
                >
                {coin?.market_cap_rank}
              </Typography>
            </span>
            <span style={{display: 'flex'}}>
              <Typography variant="h5" className={classess.heading}>
                Current Price:
              </Typography>
              &nbsp;&nbsp;
              <Typography variant="h6" 
              style={{
                fontFamily: 'Montserrat',
              }}
                >
                {symbol}{" "} 
                {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
              </Typography>
            </span>
            <span style={{display: 'flex'}}>
              <Typography variant="h5" className={classess.heading}>
                Market Cap:
              </Typography>
              &nbsp;&nbsp;
              <Typography variant="h6" 
              style={{
                fontFamily: 'Montserrat',
              }}
                >
                {symbol}{" "}
                {coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6)} M
              </Typography>
            </span>
          </div>
        </Sidebar>
        <CoinInfo coin={coin} />
      </Container>
  );
};

export default CoinPage;
