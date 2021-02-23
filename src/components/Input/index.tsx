import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
// contem todas as propriedades que um icone pode ter
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

// input recebe todas as propriedades do Input html + declarados na interface
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  // usado para acessar diretamente o input
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // armazena o estado de foco do Container
  const [isFocused, setIsFocused] = useState(false);
  const [isFielled, setIsFielled] = useState(false); // input está preenchido?

  // executa assim que o input é mostrado em tela
  useEffect(() => {
    // monitora os valores dos inputs
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  // useCallback só executa novamente quando alterado parametro passado
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFielled(!!inputRef.current?.value); // verificação
  }, []);
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <Container isErrored={!!error} isFilled={isFielled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
