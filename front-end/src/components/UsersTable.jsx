import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import trash from '../images/trash.svg';

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
    <div className="lista-de-usuários">
      <h1 className="admin__title">Lista de usuários</h1>

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
          {users.map((item, i) => (
            <tr className="table__body__tr" key={ i }>
              <td
                className=" table__body__td table__body__item"
                data-testid="admin_manage__element-user-table-item-number-"
              >
                {item.id}
              </td>
              <td
                className="table__body__td table__body__descricao"
                data-testid="admin_manage__element-user-table-name-"
              >
                {item.name}
              </td>
              <td
                className="table__body__td table__body__quantidade"
                data-testid={ `admin_manage__element-user-table-email-${i}` }
              >
                {item.email}
              </td>
              <td
                className="table__body__td table__body__valor"
                data-testid={ `admin_manage__element-user-table-role-${i}` }
              >
                {item.role}
              </td>
              <td className="table__body__td table__body__remover">
                <button
                  className="table__body__remover__btn"
                  type="button"
                  onClick={ () => deleteUser(item.id) }
                  data-testid={ `admin_manage__element-user-table-remove-${i}` }
                >
                  <img src={ trash } alt="trash" />
                </button>
              </td>
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
