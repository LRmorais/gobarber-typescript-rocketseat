import styled from 'styled-components';
import { shade } from 'polished';

import signInBackground from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  /* stretch faz com os itens tenham o tamanho total da pagina */
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    input {
      background: #232129;
      border-radius: 10px;
      border: 2px solid #232129;
      padding: 16px;
      width: 100%;
      color: #f4ede8;

      &::placeholder {
        color: #666360;
      }
      /* todo input prescedindo de outro tera aplicado margin */
      & + input {
        margin-top: 8px;
      }
    }

    button {
      background: #ff9000;
      height: 56px;
      border-radius: 10px;
      border: 0;
      padding: 0 16px;
      color: #312e38;
      width: 100%;
      font-weight: 500;
      margin-top: 16px;
      transition: background-color 0.2s;

      &:hover {
        /* escurecer 25% da cor */
        background: ${shade(0.25, '#ff9000')};
      }
    }
    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        /* escurecer 25% da cor */
        color: ${shade(0.3, '#f4ede8')};
      }
    }
  }

  /* estiliza o a diretamente dentro do content e não em outro nivel */
  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      /* escurecer 30% da cor */
      color: ${shade(0.3, '#ff9000')};
    }
  }
`;

export const Background = styled.div`
  /* faz ocupar toda pagina menos os 700px */
  flex: 1;
  background: url(${signInBackground}) no-repeat center;
  /* redimensiona imagem para caber no espaço disponivel */
  background-size: cover;
`;