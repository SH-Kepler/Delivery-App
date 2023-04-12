import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// import { ProductsContext } from '../context/ProductsProvider';

function NavBar() {
  // const { userInfo } = useContext(ProductsContext);
  const [userName, setUserName] = useState('');
  const history = useHistory();
  const location = useLocation();
  // console.log('locationn', location);

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
    <header>
      <nav>
        { location.pathname.includes('customer') ? (
          <div>
            <button
              type="button"
              data-testid="customer_products__element-navbar-link-products"
              onClick={ () => history.push('/customer/products') }
            >
              PRODUTOS
            </button>
            <button
              type="button"
              data-testid="customer_products__element-navbar-link-orders"
              onClick={ () => history.push('/customer/orders') }
            >
              MEUS PEDIDOS
            </button>
          </div>
        ) : false}

        { location.pathname.includes('seller') ? (
          <div>
            <button
              type="button"
              data-testid="customer_products__element-navbar-link-orders"
              onClick={ () => history.push('/seller/orders') }
            >
              PEDIDOS
            </button>
          </div>
        ) : true }

        { location.pathname.includes('admin') ? (
          <div>
            <button
              type="button"
              data-testid="customer_products__element-navbar-link-orders"
              onClick={ () => history.push('/admin/manage') }
            >
              GERENCIAR USUÁRIOS
            </button>
          </div>
        ) : true}

        <span data-testid="customer_products__element-navbar-user-full-name">
          { userName }
        </span>

        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ handleLogout }
        >
          Sair
        </button>
      </nav>
    </header>
  );
}

export default NavBar;
