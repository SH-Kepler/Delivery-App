import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useLocation, useParams } from 'react-router-dom';
import { fetchUpdateStatusSale } from '../requests';

function DetailsHead({ sale, dataTestId }) {
  const { pathname } = useLocation();
  const [status, setStatus] = useState(sale.status);
  const { id } = useParams();

  const statusToPreparando = () => {
    fetchUpdateStatusSale(id, 'Preparando');
    setStatus('Preparando');
  };

  const statusToEmTransito = () => {
    const a = 'Em Trânsito';
    fetchUpdateStatusSale(id, a);
    setStatus(a);
  };

  const statusToEntregue = () => {
    fetchUpdateStatusSale(id, 'Entregue');
    setStatus('Entregue');
  };

  return (
    <section>
      <p
        data-testid={ dataTestId.id }
      >

        { sale.id }
      </p>
      <p
        data-testid={ dataTestId.seller }
      >
        {pathname.includes('customer') && sale.seller.name}
      </p>
      <p
        data-testid={ dataTestId.date }
      >
        { moment(sale.saleDate).format('DD/MM/YYYY') }
      </p>
      <h4
        data-testid={ dataTestId.status }
      >
        { status }
      </h4>
      {pathname.includes('seller') && (
        <button
          type="button"
          data-testid={ dataTestId.preparingButton }
          onClick={ statusToPreparando }
          disabled={ status !== 'Pendente' }
        >
          Prepara pedido
        </button>
      )}
      {pathname.includes('seller') && (
        <button
          type="button"
          data-testid={ dataTestId.dispatchButton }
          onClick={ statusToEmTransito }
          disabled={ status !== 'Preparando' }
        >
          Saiu para entrega
        </button>
      )}
      {pathname.includes('customer') && (
        <button
          type="button"
          data-testid={ dataTestId.deliveryCheck }
          onClick={ statusToEntregue }
          disabled={ status !== 'Em Trânsito' }
        >
          Marcar como entregue
        </button>
      )}
    </section>
  );
}

DetailsHead.propTypes = {
  sale: PropTypes.shape(),
}.isRequired;

export default DetailsHead;
