import './App.css';
import {Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import  Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import { ThemeProvider, makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material';

const theme = createTheme();

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
  <ThemeProvider theme={theme}>
    <div className={classes.App}>
      <Header/>
      <Routes>
        <Route path='/' Component={Homepage} exact/>
        <Route path='/coins/:id' Component={CoinPage} />
      </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;
