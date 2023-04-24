import React from 'react';
import PropTypes from 'prop-types';

function Amount({ sale, dataTestId }) {
  return (
    <p className="table__amount" data-testid={ dataTestId }>
      total: R$
      {sale.products.reduce((acc, curr) => acc
      + (curr.price * curr.SalesProducts.quantity), 0).toFixed(2).replace('.', ',')}
    </p>
  );
}

Amount.propTypes = {
  sale: PropTypes.shape,
}.isRequired;
export default Amount;
