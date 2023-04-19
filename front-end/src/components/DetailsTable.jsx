import React from 'react';
import PropTypes from 'prop-types';

function DetailsTable({ sale, dataTestId }) {
  const headers = ['Item',
    'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total'];

  return (
    <table className="table">
      <thead className="table__head">
        <tr>
          {
            headers.map((header) => (
              <th
                className="table__head__item"
                key={ header }
              >
                { header }
              </th>))
          }
        </tr>
      </thead>
      <tbody className="table__body">
        {
          sale.products.map((item, i) => (
            <tr className="table__body__tr" key={ i }>
              <td
                className=" table__body__td table__body__item"
                data-testid={ dataTestId(i).index }
              >
                { i }
              </td>
              <td
                className="table__body__td table__body__descricao"
                data-testid={ dataTestId(i).name }
              >
                { item.name }

              </td>
              <td
                className="table__body__td table__body__quantidade"
                data-testid={ dataTestId(i).quantity }
              >
                { item.SalesProducts.quantity }

              </td>
              <td
                className="table__body__td table__body__valor"
                data-testid={ dataTestId(i).price }
              >
                { (+item.price).toFixed(2).replace('.', ',') }
              </td>
              <td
                className="table__body__td table__body__sub-total"
                data-testid={ dataTestId(i).subtotal }
              >
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
