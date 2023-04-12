import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Products from './pages/Products';
import CustomerOrder from './pages/CustomerOrder';
import './App.css';
import CustomerOrderDetails from './pages/CustomerOrderDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import SellerOrders from './pages/SellerOrders';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import SellerOrderDetails from './pages/SellerOrderDetails';

function App() {
  return (
    <main className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/customer/orders" component={ CustomerOrder } />
        <Route exact path="/customer/checkout" component={ Checkout } />
        <Route exact path="/seller/orders/:id" component={ SellerOrderDetails } />
        <Route exact path="/customer/orders/:id" component={ CustomerOrderDetails } />
        <Route exact path="/seller/orders" component={ SellerOrders } />
        <Route exact path="/admin/manage" component={ Admin } />
      </Switch>
    </main>
  );
}

export default App;
