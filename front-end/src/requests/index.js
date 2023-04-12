const fetchProducts = async () => {
  const response = await fetch(
    `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/products`,
    {
      method: 'GET',
    },
  );
  const data = await response.json();
  return data;
};

const fetchSales = async (id) => {
  const response = await fetch(
    `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/sales/orders/details/${id}`,
    {
      method: 'GET',
    },
  );
  const data = await response.json();
  return data;
};

const fetchUpdateStatusSale = async (id, newStatus) => {
  const response = await fetch(
    `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/sales/status/${id}`,
    {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({ newStatus }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await response.json();
  return data;
};

export default fetchProducts;
export { fetchSales, fetchUpdateStatusSale };
