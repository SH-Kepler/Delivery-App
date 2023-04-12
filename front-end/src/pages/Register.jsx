import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import GenericInput from '../components/GenericInput';
import { formContext } from '../context/FormProvider';
import { validateEmailInput,
  validateNameInput, validatePasswordInput } from '../utils/inputsValidation';

function Register() {
  const { inputsValue: { name, email, password },
    setInputsValue, setUser } = useContext(formContext);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const history = useHistory();

  const postEndPointLogin = async () => {
    axios.post('http://localhost:3001/user/register', {
      name: name.value, email: email.value, password: password.value,
    }).then(({ data }) => {
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);

      setInputsValue({
        name: { value: '', isValid: false },
        email: { value: '', isValid: false },
        password: { value: '', isValid: false },
      });

      history.push('/customer/products');
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
    <section>
      <form onSubmit={ onSubmit }>
        <GenericInput
          name="Nome"
          keyOfInput="name"
          type="text"
          validation={ validateNameInput }
          dataTestId="common_register__input-name"
        />
        <GenericInput
          name="Email"
          keyOfInput="email"
          type="email"
          validation={ validateEmailInput }
          dataTestId="common_register__input-email"
        />
        <GenericInput
          name="Senha"
          keyOfInput="password"
          type="password"
          validation={ validatePasswordInput }
          dataTestId="common_register__input-password"
        />
        <button
          disabled={ !(email.isValid && password.isValid && name.isValid) }
          type="submit"
          onClick={ postEndPointLogin }
          data-testid="common_register__button-register"
        >
          Cadastrar
        </button>
        <span data-testid="common_register__element-invalid_register">
          {errorMessage}

        </span>
      </form>
    </section>
  );
}

export default Register;
