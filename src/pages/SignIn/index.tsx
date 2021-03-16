import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
// importa todas as validações do yup
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignInFormData {
  // informações vindas do formulario de signIn
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  // --------Hooks de context ---------------
  const { user, signIn } = useAuth();
  const { addToast } = useToast();
  console.log(user);
  // ---------------------------------------
  const handleSubmite = useCallback(
    async (data: SignInFormData) => {
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

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        // disparar toast
        addToast({
          type: 'info',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [signIn, addToast],
  );
  return (
    // 2 sessões => inputs e img de fundo
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Gobarber" />

          <Form ref={formRef} onSubmit={handleSubmite}>
            <h1>Faça seu login</h1>

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
          <Link to="/signup">
            <FiLogIn />
            Criar Conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
