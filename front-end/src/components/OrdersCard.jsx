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
      to={
        pathname.includes('customer')
          ? `/customer/orders/${id}`
          : `/seller/orders/${id}`
      }
    >
      <div>
        {pathname.includes('customer') ? (
          <div
            data-testid={ dataTestId(id).idCustomer }
          >
            { id }
          </div>
        ) : (
          <h2 data-testid={ dataTestId(id).idSeller }>
            {index < NUMBER_OITO ? `000${index + 1}` : `00${index + 1}`}
          </h2>
        )}
        <div>
          <p
            data-testid={ dataTestId(id).status }

          >
            { status }
          </p>
          <div>
            <p
              data-testid={ dataTestId(id).date }

            >
              { handleDate() }
            </p>
            <p
              data-testid={ dataTestId(id).totalPrice }

            >
              { totalPrice.replace('.', ',') }
            </p>
            {pathname.includes('seller') && (
              <p data-testid={ dataTestId(id).address }>
                {`${deliveryAddress}, ${deliveryNumber}`}
              </p>
            )}
          </div>
        </div>
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
