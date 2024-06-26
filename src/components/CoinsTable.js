import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Container, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Banner/Carousal';

const useStyles=makeStyles({
    row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#131111",
        },
        fontFamily: "Montserrat",
      },

      

});
  

const CoinsTable = () => {
    const [coins, setCoins]=useState([]);
    const [loading, setLoading]=useState(false);
    const {currency, symbol}= CryptoState();
    const [search, setSearch]=useState('');
    const [page, setPage]=useState(1);
    const history = useNavigate();

    useEffect(() => {
      const fetchCoins= async ()=>{
          setLoading(true);
          const {data} = await axios.get(CoinList(currency));
          setCoins(data);
          setLoading(false);
      };
        fetchCoins();
    }, [currency]);
    const handleSearch=()=>{
            return coins.filter((coin)=>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
    };


const classes=useStyles();

  return (
        <Container style={{textAlign: "center" }}>
            <Typography
                variant='h4'
                style={{margin: 18, fontFamily: 'Montserrat'}}
            >
                Cryptocurrency Prices by Market Cap
            </Typography>

            <TextField
                label="Search for a Cryptocurrency"
                variant="outlined"
                style={{
                    color: "white",
                    marginBottom: 20,
                    width: "100%",
                    fontFamily: 'Montserrat',
                }}
                InputProps={{
                    style: {
                        color: 'white',
                      },
                  }}
                  InputLabelProps={{
                    style: {
                      color: 'gold',
                    },
                  }}
                onChange={(e) => setSearch(e.target.value)}
                />

            <TableContainer>
                {loading ? (
                        <LinearProgress style={{backgroundColor: "orangered" }} />
                    ):(
                        <Table>
                            <TableHead style={{
                                backgroundColor: "#EEBC1D",
                            }}>
                                <TableRow>
                                    {[ 'Coin', 'Price', '24h Change', 'Market Cap'].map((head)=>(
                                    <TableCell
                                    style={{color: "black", fontWeight:"700", fontFamily: 'Montserrat'}}
                                    key={head}
                                    align={head==="Coin" ? "left" : "right"}
                                    >{head}
                                    </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>{handleSearch().slice((page-1)*10,(page-1)*10+10).map((row)=>{
                                const profit= row.price_change_percentage_24h>0;

                                return(
                                    <TableRow
                                    onClick={()=> history(`/coins/${row.id}`)}
                                    className={classes.row}
                                    key={row.name}
                                    >
                                        <TableCell component='th'
                                        scope='row'
                                        style={{display: "flex", gap: 15, fontFamily: 'Montserrat'}}
                                        >
                                            <img
                                            src={row?.image}
                                            alt={row.name}
                                            height='50'
                                            style={{marginRight: 10}}
                                            />
                                            <div
                                            style={{display: "flex", flexDirection: "column"}}
                                            >
                                                <span 
                                                    style={{color:"white",textTransform: "uppercase", fontSize: 22, fontFamily: 'Montserrat'}}
                                                >
                                                    {row.symbol}
                                                </span>
                                                <span style={{color:"darkgrey"}}>{row.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell align='right' style={{color:"white"}}>
                                            {symbol}{" "}
                                            {numberWithCommas(row.current_price.toFixed(2))}
                                
                                        </TableCell>
                                        <TableCell
                                            align='right'
                                            style={{
                                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                fontWeight: 500,
                                                fontFamily: 'Montserrat'
                                            
                                            }}
                                            >
                                                {profit && "+"} {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>
                                        <TableCell align='right' style={{color:"white"}}>
                                            {symbol}{" "} {numberWithCommas(row.market_cap.toString().slice(0, -6))} M
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                            </TableBody>

                        </Table>
                    )}

            </TableContainer>
            <Pagination 
            style={{backgroundColor: "#EEBC1D",padding: 5, width:"100%",  display: "flex", justifyContent: "center"}}
            count={(handleSearch()?.length/10).toFixed(0)}
            classes={{ul: classes.pagination}}
            onChange={(_,value)=> {setPage(value);
            window.scroll(0,450);}}
            />

        </Container>
  )
}

export default CoinsTable