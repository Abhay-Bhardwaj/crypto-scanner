import './App.css';
import {Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import  Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CryptoAlert from './components/Alert';
import { makeStyles } from '@mui/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const useStyles = makeStyles({
  App: {
    backgroundColor: '#14161a',
    color: '#fff',
    minHeight: '100vh',
  },
});


function App() {
  
  const classes = useStyles();
return (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline/>
    <div className={classes.App}>
      <Header/>
      <Routes>
        <Route path='/' Component={Homepage} exact/>
        <Route path='/coins/:id' Component={CoinPage} />
      </Routes>
    </div>
    <CryptoAlert />
    </ThemeProvider>
  );
}

export default App;
