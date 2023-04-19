import React from 'react';
import Navbar from '../components/NavBar';
import CheckoutComponent from '../components/CheckoutComp';

function Checkout() {
  return (
    <div className="checkout">
      <Navbar />
      <CheckoutComponent />
    </div>
  );
}

export default Checkout;
