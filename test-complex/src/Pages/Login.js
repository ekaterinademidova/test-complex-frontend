import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 64%;
  margin: 30px 0;
  margin: auto;
  padding: 30px;  
`;

const LoginWrap = styled.div`
  height: 400px;
  width: 360px;
  margin: auto;
  border: 1px solid black;
  color: #1f2e33;
`;

const Field = styled.div`
  box-sizing: border-box;
  height: 100px;
  width: 80%;
  margin: auto;
`;

const Title = styled.h1`
  text-align: center;
`;

const Label = styled.label`
  font-size: 20px;
`;

const Input = styled.input`
  box-sizing: border-box;
  height: 36px;
  width: 100%;
  margin-top: 10px;
`;

const ButtonField = styled.div`
  padding: 10px;
  text-align: center;
`;

const Button = styled.input`
  padding: 10px 40px;
  background-color: #8DD2E8;
  border: 1px solid black;
`;

export default function Login() {
  return (
    <div>
      <Wrap>
        <LoginWrap>
          <Title>Login</Title>

          <Field>
            <Label>Имя пользователя</Label>
            <Input type="text" placeholder="Введите имя пользователя" />
          </Field>

          <Field>
            <Label>Пароль</Label>
              <Input type="password" placeholder="Введите пароль" />
          </Field>

          <ButtonField>
            <Button type="submit" value="Войти" />
          </ButtonField>
        </LoginWrap>
      </Wrap>
    </div>
  );
}