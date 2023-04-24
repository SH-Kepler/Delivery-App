/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-max-depth */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import GenericInput from '../components/GenericInput';
import UsersTable from '../components/UsersTable';
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
  const [allUsers, setAllUsers] = useState([]);

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
      setUser(data);
      allUsers.push(data);

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

    const asyncCalback = async () => {
      axios.get(
        'http://localhost:3001/user/all',
        { headers: { authorization: token } },
      ).then(({ data }) => setAllUsers(data))
        .catch(({ response }) => console.log(response));
    };

    asyncCalback();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NavBar />

      <div className="admin">
        <div className="admin__main">
          <h1 className="admin__title">Cadastrar novo Usuário</h1>
          <form className="admin__form" onSubmit={ onSubmit }>
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
            <div className="form__group">
              <div>
                <select
                  className="form__input"
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
              </div>
            </div>

            <span
              className="form__error"
              data-testid="admin_manage__element-invalid-register"
            >
              {errorMessage}
            </span>

            <button
              className="btn-admin btn btn--primary-dark btn--animated--left"
              disabled={ !(email.isValid && password.isValid && name.isValid) }
              type="submit"
              onClick={ postEndPointRegister }
              data-testid="admin_manage__button-register"
            >
              Cadastrar
            </button>

          </form>
          <UsersTable users={ allUsers } set={ setAllUsers } />
        </div>
      </div>
    </div>
  );
}

export default Admin;
