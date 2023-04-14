import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SellerDetailsHead from '../components/DetailsHead';
import SellerDetailsTable from '../components/DetailsTable';
import Amount from '../components/Amount';
import NavBar from '../components/NavBar';

function SellerOrderDetails() {
  const [sale, setSale] = useState(undefined);
  const { id } = useParams();

  const handleName = () => {
    const nameStorage = JSON.parse(localStorage.getItem('user'));
    const { name } = nameStorage;
    setUserName(name);
  };

  useEffect(() => {
    handleName();
  }, []);

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
    id: 'seller_order_details__element-order-details-label-order-id',
    date: 'seller_order_details__element-order-details-label-order-date',
    status: 'seller_order_details__element-order-details-label-delivery-status',
    preparingButton: 'seller_order_details__button-preparing-check',
    dispatchButton: 'seller_order_details__button-dispatch-check',
  };
  const dataTestIdTablefunc = (i) => ({
    index: `seller_order_details__element-order-table-item-number-
      ${i}`,
    name: `seller_order_details__element-order-table-name-${i}`,
    quantity: `seller_orders__element-order-date-${i}`,
    price: `seller_orders__element-card-price-${i}`,
    subtotal: `seller_orders__element-order-date-${i}`,
  });

  return (
    <div>
      <NavBar />
      <section>
        <h2>Detalhe do Pedido</h2>
        {sale && <SellerDetailsHead
          sale={ sale }
          dataTestId={ dataTestIdHeadObj }
        />}
      </section>
      <section>
        {sale && <SellerDetailsTable
          sale={ sale }
          dataTestId={ dataTestIdTablefunc }
        />}
        {sale && <Amount
          sale={ sale }
          dataTestId="seller_order_details__element-order-total-price"
        />}
      </section>
    </div>
  );
}

SellerOrderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default SellerOrderDetails;
