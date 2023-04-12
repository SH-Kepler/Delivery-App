import axios from 'axios';
import React, { useEffect, useState } from 'react';
import OrdersCard from '../components/OrdersCard';
import Navbar from '../components/NavBar';

export default function CustomerOrder() {
  const { token, id } = JSON.parse(localStorage.getItem('user'));
  const [orders, pullOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      try {
        const PORT = 3001;
        const api = axios.create({
          baseURL: `http://localhost:${PORT}`,
        });
        const headers = { headers: { authorization: token } };
        const { data } = await api.get(`/sales/orders/${id}`, headers);
        pullOrders(data);
      } catch (error) {
        console.log(error);
      }
    }
    getOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataTestIdFunc = (i) => ({
    idCustomer: `customer_orders__element-order-id-${i}`,
    status: `customer_orders__element-delivery-status-${i}`,
    date: `customer_orders__element-order-date-${i}`,
    totalPrice: `customer_orders__element-card-price-${i}`,
    address: `seller_orders__element-card-address-${i}`,
  });

  return (
    <div>
      <Navbar />
      <div>
        { orders.length !== 0 ? orders.map((sale) => (
          <OrdersCard
            key={ sale.id }
            id={ sale.id }
            status={ sale.status }
            saleDate={ sale.saleDate }
            totalPrice={ sale.totalPrice }
            dataTestId={ dataTestIdFunc }
          />)) : <h2>Você ainda não possui pedidos! Faça o primeiro!</h2> }
      </div>
    </div>
  );
}
