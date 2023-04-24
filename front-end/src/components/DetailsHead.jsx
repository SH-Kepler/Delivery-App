/* eslint-disable sonarjs/no-duplicate-string */
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
    fetchUpdateStatusSale(id, 'Em Trânsito');
    setStatus('Em Trânsito');
  };

  const statusToEntregue = () => {
    fetchUpdateStatusSale(id, 'Entregue');
    setStatus('Entregue');
  };

  return (
    <div className="details-head">
      <p
        className="details-head__id"
        data-testid={ dataTestId.id }
      >

        Pedido
        {' '}
        { sale.id }
      </p>
      {
        pathname.includes('customer') && (
          <p>
            Vendedor:
            {' '}
            {sale.seller.name}
          </p>
        )
      }
      <p
        className="details-head__data"
        data-testid={ dataTestId.date }
      >
        { moment(sale.saleDate).format('DD/MM/YYYY') }
      </p>
      <p
        className={ `status-${status.replace(' ', '-')} status` }
        data-testid={ dataTestId.status }
      >
        { status }
      </p>
      {pathname.includes('seller') && (
        <button
          className="btn btn--primary-dark details-head__preparando"
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
          className="btn btn--primary-dark details-head__enviando"
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
          className="btn btn--green details-head__entregue"
          type="button"
          data-testid={ dataTestId.deliveryCheck }
          onClick={ statusToEntregue }
          disabled={ status !== 'Em Trânsito' }
        >
          Marcar como entregue
        </button>
      )}
    </div>
  );
}

DetailsHead.propTypes = {
  sale: PropTypes.shape(),
}.isRequired;

export default DetailsHead;
