import React, { useCallback, useRef, useContext } from 'react';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
// importa todas as validações do yup
import * as Yup from 'yup';

import { AuthContext } from '../../context/AuthContext';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useContext(AuthContext);

  const handleSubmite = useCallback(
    async (data: string) => {
      try {
        // zera os erros no final
        formRef.current?.setErrors({});
        //  tipo.obrigatoriedade('mensagem de erro')
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigátorio')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigátoria'),
        });

        await schema.validate(data, {
          // retorna todos os erros de uma vez só
          abortEarly: false,
        });

        signIn();
      } catch (err) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    },
    [signIn],
  );
  return (
    // 2 sessões => inputs e img de fundo
    <Container>
      <Content>
        <img src={logoImg} alt="Gobarber" />

        <Form ref={formRef} onSubmit={handleSubmite}>
          <h1>Faça seu logon</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <a href="#forgot">Esqueci minha senha</a>
        </Form>
        <a href="#create">
          <FiLogIn />
          Criar Conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
