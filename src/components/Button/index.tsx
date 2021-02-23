import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// não estende as props, apenas atribui ao componente
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
