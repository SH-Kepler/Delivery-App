import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function OrdersCard({
  id,
  index,
  status,
  saleDate,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  dataTestId,
}) {
  const handleDate = () => {
    if (saleDate) {
      const arrayDate = (saleDate.split('T'))[0].split('-');
      return `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`;
    }
  };

  const { pathname } = useLocation();
  const NUMBER_OITO = 8;

  return (
    <Link
      className="orders__card"
      to={
        pathname.includes('customer')
          ? `/customer/orders/${id}`
          : `/seller/orders/${id}`
      }
    >
      <div className="orders__card__pedido">
        <p className="orders__card__pedido__title">Pedido</p>
        {pathname.includes('customer') ? (
          <p
            className="orders__card__pedido__id"
            data-testid={ dataTestId(id).idCustomer }
          >
            { id }
          </p>
        ) : (
          <p className="orders__card__pedido__id" data-testid={ dataTestId(id).idSeller }>
            {index < NUMBER_OITO ? `000${index + 1}` : `00${index + 1}`}
          </p>
        )}
      </div>
      <div className="orders__card__conteiner-1">
        <div className="orders__card__conteiner-2">
          <p
            className={ `status-${status.replace(' ', '-')}
            status orders__card__none-animation` }
            data-testid={ dataTestId(id).status }

          >
            { status }
          </p>
          <div className="orders__card__any">
            <p
              className="orders__card__any__item"
              data-testid={ dataTestId(id).date }

            >
              { handleDate() }
            </p>
            <p
              className="orders__card__any__item"
              data-testid={ dataTestId(id).totalPrice }

            >
              { totalPrice.replace('.', ',') }
            </p>
          </div>
        </div>
        {pathname.includes('seller') && (
          <p className="orders__card__address" data-testid={ dataTestId(id).address }>
            {`${deliveryAddress}, ${deliveryNumber}`}
          </p>
        )}
      </div>
    </Link>
  );
}

OrdersCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  deliveryNumber: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
