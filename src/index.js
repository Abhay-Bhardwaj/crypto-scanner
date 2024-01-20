import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import CryptoContext from './CryptoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <CryptoContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </CryptoContext>
);

