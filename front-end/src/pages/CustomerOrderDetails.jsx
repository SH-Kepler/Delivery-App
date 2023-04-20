import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CustomerDetailsHead from '../components/DetailsHead';
import CustomerDetailsTable from '../components/DetailsTable';
import Amount from '../components/Amount';
import NavBar from '../components/NavBar';

function CustomerOrderDetails() {
  const [sale, setSale] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {
    const asyncCalback = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      axios.get(
        `http://localhost:3001/sales/orders/details/${id}`,
        { headers: { Authorization: token } },
      ).then(({ data }) => setSale(data))
        .catch(({ response }) => console.log(response));
    };

    asyncCalback();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataTestIdHeadObj = {
    id: 'customer_order_details__element-order-details-label-order-id',
    date: 'customer_order_details__element-order-details-label-order-date',
    seller: 'customer_order_details__element-order-details-label-seller-name',
    status: 'customer_order_details__element-order-details-label-delivery-status',
    deliveryCheck: 'customer_order_details__button-delivery-check',
  };

  const dataTestIdTablefunc = (i) => ({
    index: `customer_order_details__element-order-table-item-number-
      ${i}`,
    name: `customer_order_details__element-order-table-name-${i}`,
    quantity: `customer_order_details__element-order-table-quantity-${i}`,
    price: `customer_order_details__element-order-table-unit-price-${i}`,
    subtotal: `customer_order_details__element-order-table-sub-total-${i}`,
  });

  return (
    <div className="order-details">
      <NavBar />
      <div className="order-details__main">
        <h2 className="order-details__title">Detalhe do Pedido</h2>
        {sale && <CustomerDetailsHead
          sale={ sale }
          dataTestId={ dataTestIdHeadObj }
        />}
        {sale && <CustomerDetailsTable
          sale={ sale }
          dataTestId={ dataTestIdTablefunc }
        />}
        {sale && <Amount
          sale={ sale }
          dataTestId="customer_order_details__element-order-total-price"
        />}
      </div>
    </div>
  );
}

CustomerOrderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default CustomerOrderDetails;
