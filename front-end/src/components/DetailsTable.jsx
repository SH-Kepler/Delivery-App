import React from 'react';
import PropTypes from 'prop-types';

function DetailsTable({ sale, dataTestId }) {
  const headers = ['Item',
    'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total'];

  return (
    <table>
      <thead>
        <tr>
          {
            headers.map((header) => (<th key={ header }>{ header }</th>))
          }
        </tr>
      </thead>
      <tbody>
        {
          sale.products.map((item, i) => (
            <tr key={ i }>
              <td data-testid={ dataTestId(i).index }>
                { i }
              </td>
              <td data-testid={ dataTestId(i).name }>
                { item.name }

              </td>
              <td data-testid={ dataTestId(i).quantity }>
                { item.SalesProducts.quantity }

              </td>
              <td data-testid={ dataTestId(i).price }>
                { (+item.price).toFixed(2).replace('.', ',') }
              </td>
              <td data-testid={ dataTestId(i).subtotal }>
                { (+item.price * item.SalesProducts.quantity)
                  .toFixed(2).replace('.', ',') }
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

DetailsTable.propTypes = {
  sale: PropTypes.shape,
}.isRequired;

export default DetailsTable;
