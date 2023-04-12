import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const SellerContext = createContext();

class SellerOrdersProvider extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  render() {
    const { Provider } = SellerContext;
    const { children } = this.props;
    const getAllSellers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/seller/orders');
        const sellers = response.data;
        return sellers;
      } catch (error) {
        console.error(error);
      }
    };
    return (
      <Provider
        value={ {
          ...this.state, getAllSellers,
        } }
      >
        {children}
      </Provider>
    );
  }
}

SellerOrdersProvider.propTypes = {
  children: PropTypes.objectOf(),
}.isRequired;

export default SellerOrdersProvider;
export { SellerContext };
