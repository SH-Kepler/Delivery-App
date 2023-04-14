import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import cerveja from '../images/cerveja.png';

function NavBar() {
  const [userName, setUserName] = useState('');
  const history = useHistory();
  const location = useLocation();

  const handleName = () => {
    const nameStorage = JSON.parse(localStorage.getItem('user'));
    const { name } = nameStorage;
    setUserName(name);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    history.push('/login');
  };

  useEffect(() => {
    handleName();
  }, []);

  return (
    <header className="header">
      <nav className="header__nav">
        { location.pathname.includes('customer') && (
          <div>
            <button
              className="btn btn--grey"
              type="button"
              data-testid="customer_products__element-navbar-link-products"
              onClick={ () => history.push('/customer/products') }
            >
              PRODUTOS
            </button>
            <button
              className="btn btn--primary-dark"
              type="button"
              data-testid="customer_products__element-navbar-link-orders"
              onClick={ () => history.push('/customer/orders') }
            >
              MEUS PEDIDOS
            </button>
          </div>
        )}

        { location.pathname.includes('seller') && (
          <div>
            <button
              className="btn btn--grey"
              type="button"
              data-testid="customer_products__element-navbar-link-orders"
              onClick={ () => history.push('/seller/orders') }
            >
              PEDIDOS
            </button>
          </div>
        )}

        { location.pathname.includes('admin') && (
          <div>
            <button
              className="btn btn--grey"
              type="button"
              data-testid="customer_products__element-navbar-link-orders"
              onClick={ () => history.push('/admin/manage') }
            >
              GERENCIAR USUÁRIOS
            </button>
          </div>
        )}

        <div>
          <img className="header__image" src={ cerveja } alt="cerveja" />
        </div>

        <div>
          <span
            className="header__user"
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { userName }
          </span>

          <button
            className="btn btn--grey"
            type="button"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ handleLogout }
          >
            Sair
          </button>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
