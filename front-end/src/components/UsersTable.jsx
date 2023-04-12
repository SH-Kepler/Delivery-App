import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function UsersTable({ users }) {
  const headers = ['Item',
    'Nome', 'Email', 'Tipo', 'Excluir'];

  const deleteUser = (i) => {
    const { token } = JSON.parse(localStorage.getItem('user'));

    axios.delete(
      `http://localhost:3001/user/${i}`,
      { headers: { authorization: token } },
    ).then(({ data }) => setAllUsers(data))
      .catch(({ response }) => console.log(response));
  };

  return (
    <div>
      <h1>Lista de usuários</h1>

      <table>
        <thead>
          <tr>
            {
              headers.map((header) => (<th key={ header }>{ header }</th>))
            }
          </tr>
        </thead>
        <tbody>
          {users.map((item, i) => (
            <tr key={ i }>
              <td data-testid="admin_manage__element-user-table-item-number-">
                {item.id}
              </td>
              <td data-testid="admin_manage__element-user-table-name-">
                {item.name}
              </td>
              <td data-testid={ `admin_manage__element-user-table-email-${i}` }>
                {item.email}
              </td>
              <td data-testid={ `admin_manage__element-user-table-role-${i}` }>
                {item.role}
              </td>
              <button
                type="button"
                onClick={ () => deleteUser(item.id) }
                data-testid={ `admin_manage__element-user-table-remove-${i}` }
              >
                Excluir
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

UsersTable.propTypes = {
  users: PropTypes.shape,
}.isRequired;

export default UsersTable;
