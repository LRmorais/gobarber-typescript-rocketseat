import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
// importa todas as validações do yup
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmite = useCallback(async (data: string) => {
    try {
      // zera os erros no final
      formRef.current?.setErrors({});
      //  tipo.obrigatoriedade('mensagem de erro')
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigátorio'),
        email: Yup.string()
          .required('E-mail obrigátorio')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('Senha obrigátoria')
          .min(6, 'Senha no mínimo 6 digitos'),
      });

      await schema.validate(data, {
        // retorna todos os erros de uma vez só
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    // 2 sessões => img de fundo e inputs
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="Gobarber" />

        <Form ref={formRef} onSubmit={handleSubmite}>
          <h1>Faça seu login</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>
        <a href="#create">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
