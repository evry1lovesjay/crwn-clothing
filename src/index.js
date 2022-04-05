import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import { UserProvider } from './contexts/user.context';

import { ProductsProvider } from './contexts/products.context';

import { CartProvider } from './contexts/cart.context';

import './index.scss';
// import reportWebVitals from './reportWebVitals';


//UserProvider context wraps around our app component, so every other component can have access to its content.
render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();