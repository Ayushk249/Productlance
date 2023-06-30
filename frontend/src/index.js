// entry point of react
import {PayPalScriptProvider} from "@paypal/react-paypal-js"
import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { Provider } from 'react-redux';
import store from './store.js';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreens from './screens/ShippingScreens';
import PaymentScreens from './screens/PaymentScreens';
import PrivateRoute from './components/PrivateRoute';
import OrderScreens from './screens/OrderScreens';
import AfterOrderScreen from './screens/AfterOrderScreen';
import ProfileScreen from "./screens/ProfileScreen";



const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>} />
      <Route path='/product/:productID' element={<ProductScreen/>} />
      <Route path ='/cart' element={<CartScreen/>}/>
      <Route path ='/login' element= {<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>

      <Route path='' element={<PrivateRoute/>}>
          <Route path ='/shipping' element= {<ShippingScreens/>}/>
          <Route path ='/payment' element= {<PaymentScreens/>}/>
          <Route path ='/placeorder' element= {<OrderScreens/>}/>
          <Route path ='/orders/:id' element= {<AfterOrderScreen/>}/>
          <Route path = '/profile' element= {<ProfileScreen/>}/>
      </Route>
      
    </Route>
    
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* redux provider */}

    <Provider store ={store}>
        {/* paypal provider */}
        <PayPalScriptProvider deferLoading={true}>
            {/* router provider */}
            <RouterProvider router={router}/>
            </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
