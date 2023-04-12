import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import GenericInput from '../components/GenericInput';
import { formContext } from '../context/FormProvider';
import { validateEmailInput,
  validateNameInput, validatePasswordInput } from '../utils/inputsValidation';
import NavBar from '../components/NavBar';

function Admin() {
  const [errorMessage, setErrorMessage] = useState('');
  const [role, setRole] = useState('seller');
  const { inputsValue: { name, email, password },
    setInputsValue, setUser } = useContext(formContext);
  const { token } = JSON.parse(localStorage.getItem('user'));

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const handleRole = ({ target }) => {
    setRole(target.value);
  };

  const postEndPointRegister = async () => {
    axios.post('http://localhost:3001/user/register', {
      name: name.value, email: email.value, password: password.value, role,
    }, { headers: { Authorization: token } }).then(({ data }) => {
      console.log(data);
      console.log(token);
      setUser(data);

      setInputsValue({
        name: { value: '', isValid: false },
        email: { value: '', isValid: false },
        password: { value: '', isValid: false },
      });
      setRole('seller');
    }).catch(({ response: { data } }) => setErrorMessage(data));
  };

  useEffect(() => {
    setInputsValue({
      name: { value: '', isValid: false },
      email: { value: '', isValid: false },
      password: { value: '', isValid: false },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* <header>
        <h3 data-testid="customer_products__element-navbar-link-orders">
          Gereciar Usuário
        </h3>
        <h3 data-testid="customer_products__element-navbar-user-full-name">
          Admin
        </h3>
        <button type="button" data-testid="customer_products__element-navbar-link-logout">
          Sair
        </button>
      </header> */}

      <NavBar />

      <h1>Cadastrar novo Usuário</h1>

      <form onSubmit={ onSubmit }>
        <GenericInput
          name="Nome"
          keyOfInput="name"
          type="text"
          validation={ validateNameInput }
          dataTestId="admin_manage__input-name"
        />
        <GenericInput
          name="Email"
          keyOfInput="email"
          type="email"
          validation={ validateEmailInput }
          dataTestId="admin_manage__input-email"
        />
        <GenericInput
          name="Senha"
          keyOfInput="password"
          type="password"
          validation={ validatePasswordInput }
          dataTestId="admin_manage__input-password"
        />

        <label htmlFor="role">
          Tipo:
          <select
            type="role"
            name="role"
            value={ role }
            data-testid="admin_manage__select-role"
            onChange={ handleRole }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>

        <button
          disabled={ !(email.isValid && password.isValid && name.isValid) }
          type="submit"
          onClick={ postEndPointRegister }
          data-testid="admin_manage__button-register"
        >
          Cadastrar
        </button>
        <span
          data-testid="admin_manage__element-invalid-register"
        >
          {errorMessage}
        </span>
      </form>

      <h1>Lista de usuários</h1>

      <table>
        <tr>
          <th>Item</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </tr>
        <tr>
          <td data-testid="admin_manage__element-user-table-item-number">
            item-number
          </td>
          <td data-testid="admin_manage__input-email">
            input-email
          </td>
          <td data-testid="admin_manage__element-user-table-email">
            user-table-email
          </td>
          <td data-testid="admin_manage__element-user-table-role-<index>">
            table-role
          </td>
        </tr>
      </table>

    </div>

  );
}

export default Admin;
