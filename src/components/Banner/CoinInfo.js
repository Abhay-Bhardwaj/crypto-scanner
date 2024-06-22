import React, { useEffect, useState } from 'react'
import{ CryptoState } from '../../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../../config/api';
import LinearProgress from '@mui/material/LinearProgress';
import { CircularProgress, ThemeProvider, createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Line } from 'react-chartjs-2';
import { chartDays } from '../../config/data';
import SelectButton from '../SelectButton';




const darktheme = createTheme({ 
  palette: {
    primary: {
      main: '#fff',
    },
     type: 'dark' 
    },

  });

  const usestyles = makeStyles((theme) => ({
    container:{
      width: '75%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: '25px',
      padding: '40',
      [theme.breakpoints.up('md')]: {
        width: '100%',
        marginTop: '0px',
        padding: '20px', 
        paddingtop: '0px',
      },
    },
  }));


const CoinInfo = ({coin}) => {
  const [historicalData, setHistoricalData] = useState();
  const [days,setDays] = useState(1);
  const {currency} = CryptoState();
  const [loading, setLoading] = useState(false);
  
  const fetchHistoricalData = async () => {
    setLoading(true);
    const {data} = await axios.get(HistoricalChart(coin.id, days, currency.toLowerCase()));
    setHistoricalData(data.prices);
    setLoading(false);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  const classess = usestyles();
  if (loading) {
    return <LinearProgress style={{backgroundColor: 'gold'}} />;
  }

    
  return (
    <ThemeProvider theme={darktheme}>
      <div className={classess.container}>
        {
          !historicalData?(
            <CircularProgress style={{color: 'gold'}} size={250} thickness={1} />
          ):(
            <>
              <Line 
                data={{
                  labels: historicalData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time = 
                      date.getHours() > 12
                        ?`${date.getHours()}:${date.getMinutes()} PM`
                        :`${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                  }),
                  datasets: [
                    {
                      data: historicalData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} days ) in ${currency}`,
                      borderColor: '#eebc1d',
                    },
                  ],
                }}
                options={{
                  elements:{
                    point:{
                      radius: 1,
                    }
                  }
                }}

              />
              <div  
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: '20px',
                }}>
                {chartDays.map((day) => (
                  <SelectButton key={day.value}
                      onClick={()=>setDays(day.value)}
                      selected={days === day.value}
                      >{day.label}</SelectButton>
                ))}
              </div>
            </>
          )
        }

      </div>
    </ThemeProvider>
  )
}
  

export default CoinInfo