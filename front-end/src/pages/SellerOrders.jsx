import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrdersCard from '../components/OrdersCard';
import NavBar from '../components/NavBar';

function SellerOrders() {
  const [Orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    try {
      const api = axios.create({
        baseURL: 'http://localhost:3001',
      });
      const { id } = JSON.parse(localStorage.getItem('user')) || '';
      const { data } = await api.get(`/sales/seller/${id}`);
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div>
      <NavBar />
      {Orders.map((sale, index) => (
        <OrdersCard
          key={ index }
          index={ index }
          id={ sale.id }
          status={ sale.status }
          deliveryAddress={ sale.deliveryAddress }
          deliveryNumber={ sale.deliveryNumber }
          saleDate={ sale.saleDate }
          totalPrice={ sale.totalPrice }
        />
      ))}
    </div>
  );
}

export default SellerOrders;
