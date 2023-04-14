import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import { ProductsContext } from '../context/ProductsProvider';

function ProductsCard({ id, name, price, thumbnail }) {
  const [qtd, setQtd] = useState(0);

  const {
    setCart,
    cart,
    setTotalValue,
    totalValue,
    totalPrice,
    setTotalPrice } = useContext(ProductsContext);

  const item = {
    id,
    qtd,
    name,
    price,
    totalPrice,
  };

  const handleIncrement = () => {
    setQtd(() => qtd + 1);
    setTotalValue(Number(totalValue) + Number(price));
    setTotalPrice(totalPrice + Number(price));
  };

  const handleDecrement = () => {
    if (qtd > 0) {
      setQtd(qtd - 1);
      setTotalValue(totalValue - Number(price));
      setTotalPrice(totalPrice - Number(price));
    }
  };

  const handleQuantity = ({ target }) => {
    setQtd(Number(target.value));
    setTotalPrice(Number(target.value) * Number(price));
    setTotalValue(Number(target.value) * Number(price));
  };

  const findElementUpdate = (arr) => {
    const findElement = arr.filter((ele) => {
      if (ele.id === item.id) {
        ele.qtd = item.qtd;
        ele.totalPrice = item.totalPrice;
      }
      return ele;
    });
    return findElement;
  };

  useEffect(() => {
    console.log('qtd', qtd);
    findElementUpdate(cart);
    const filterProduct = cart.filter((element) => element.qtd > 0);
    const findProduct = filterProduct.find((prod) => prod.id === item.id);
    if (!findProduct) {
      setCart(() => [...filterProduct, item]);
    } else {
      setCart(filterProduct);
    }
  }, [qtd]);

  return (
    <div className="product-card-main">
      <div className="product-card">
        <div className="product-card__controll">
          <img
            className="product-card__image"
            width={ 200 }
            data-testid={ `customer_products__img-card-bg-image-${id}` }
            src={ thumbnail }
            alt="card produto"
          />
          <span
            className="product-card__price"
            data-testid={ `customer_products__element-card-price-${id}` }
          >
            { `R$ ${Number(price).toFixed(2).replace('.', ',')}` }
          </span>
        </div>

      </div>
      <div className="product-card__bottom">
        <div>
          <span
            className="product-card__name"
            data-testid={ `customer_products__element-card-title-${id}` }
          >
            { name }
          </span>
        </div>
        <div>
          <button
            className="product-card__buttons product-card__buttons__left"
            type="button"
            name="less"
            onClick={ handleDecrement }
            data-testid={ `customer_products__button-card-rm-item-${id}` }
          >
            -
          </button>
          <input
            className="product-card__input"
            name="quantity"
            value={ qtd }
            type="text"
            placeholder="0"
            data-testid={ `customer_products__input-card-quantity-${id}` }
            onChange={ handleQuantity }
          />
          <button
            className="product-card__buttons product-card__buttons__right"
            type="button"
            name="add"
            onClick={ handleIncrement }
            data-testid={ `customer_products__button-card-add-item-${id}` }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

ProductsCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default ProductsCard;
