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

  const dataTestIdFunc = (i) => ({
    idSeller: `seller_orders__element-order-id-${i}`,
    status: `seller_orders__element-delivery-status-${i}`,
    date: `seller_orders__element-order-date-${i}`,
    totalPrice: `seller_orders__element-card-price-${i}`,
    address: `seller_orders__element-card-address-${i}`,
  });

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
          dataTestId={ dataTestIdFunc }
        />
      ))}
    </div>
  );
}

export default SellerOrders;
