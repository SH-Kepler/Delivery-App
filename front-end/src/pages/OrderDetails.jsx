import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { fetchSales, fetchUpdateStatusSale } from '../requests/index';

function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState({ seller: {} });
  const [items, setItems] = useState([]);
  const [statusSale, setStatusSale] = useState('');

  const { id } = useParams();

  const getSales = async () => {
    const response = await fetchSales(id);
    setOrderDetails(response);
    setItems(response.products);
  };

  const formatDate = (date) => {
    const dateFormat = new Date(date).toLocaleString('pt-BR');
    return dateFormat;
  };

  const handleStatus = async (newStatus) => {
    const response = await fetchUpdateStatusSale(id, newStatus);
    setStatusSale(response);
  };

  useEffect(() => {
    getSales();
    handleStatus();
  }, [statusSale]);

  return (
    <div>
      <NavBar />
      <h1>Detalhes do Pedido</h1>
      <span
        data-testid="customer_order_details__element-order-details-label-order-id"
      >
        {`Pedido ${`000${id}`}`}
      </span>
      <span
        data-testid="customer_order_details__element-order-details-label-seller-name"
      >
        {`P. Vend: ${orderDetails.seller.name}`}
      </span>
      <span
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        {formatDate(orderDetails.saleDate)}
      </span>
      <span
        data-testid="customer_order_details__element-order-details-label-delivery-status"
      >
        {`${orderDetails.status}`}
      </span>
      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
        disabled
        onClick={ () => handleStatus('Entregue') }
      >
        MARCAR COMO ENTREGUE
      </button>
      <table>
        <thead>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </thead>
        <tbody>
          { items.map(
            ({ id: saleId, name, price, SalesProducts: { quantity } }, index) => (
              <tr key={ saleId }>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-item-number-${index}`
                  }
                >
                  {saleId}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-name-${index}`
                  }
                >
                  {name}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-quantity-${index}`
                  }
                >
                  {quantity}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  {price}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  {price * quantity}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
      <span
        data-testid="customer_order_details__element-order-total-price"
      >
        {`Total: ${Number(orderDetails.totalPrice).toFixed(2).replace('.', ',')}`}
      </span>
    </div>
  );
}

export default OrderDetails;
