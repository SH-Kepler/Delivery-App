import { useContext } from 'react';
import PropTypes from 'prop-types';
import { formContext } from '../context/FormProvider';

function GenericInput({ name, type, validation, keyOfInput, dataTestId }) {
  const { inputsValue, setInputsValue } = useContext(formContext);

  const showMessage = () => {
    const { value } = inputsValue[keyOfInput];
    if (value.length) {
      return !inputsValue[keyOfInput].isValid && 'Campo inválido';
    }
  };

  const onInputChange = (value) => {
    setInputsValue((prevState) => (
      {
        ...prevState,
        [keyOfInput]: {
          ...prevState[keyOfInput], value,
        },
      }
    ));
  };

  return (
    <div>

      <div className="form__group">
        <div>
          <input
            className="form__input"
            placeholder={ name }
            type={ type }
            value={ inputsValue[keyOfInput].value }
            required
            onChange={ ({ target }) => {
              validation(target.value, setInputsValue);
              onInputChange(target.value);
            } }
            data-testid={ dataTestId }
          />
          <label className="form__label" htmlFor="genericInput">
            { name }
          </label>
        </div>
        <div className="form__group__error">
          <span>{ showMessage() }</span>
        </div>
      </div>
    </div>
  );
}

GenericInput.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  validation: PropTypes.func,
  keyOfInput: PropTypes.string,
  dataTestId: PropTypes.string,
}.isRequired;

export default GenericInput;
