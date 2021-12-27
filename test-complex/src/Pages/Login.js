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

const Button = styled.button`
  padding: 10px 40px;
  background-color: #8DD2E8;
  border: 1px solid black;
`;

const handleSubmit = () => {
  console.log('Hello');
  fetch("https://ekaterinademidova.us.auth0.com/oauth/token?grant_type=password&username=test@gmail.com&password=testuser&audience=http://test-complex/api&scope=openid&client_id=3VC6lHo7FgInGl68nbtqtVNhhFyOteaS&client_secret=JKRueYrPOyyTn-aRoNyCGdHEW-7cJ-kVQ3mPtQTLkAdN7YMN16Qte-uQbEYocz80", {
    method: "POST",
    headers: {'Content-Type': 'application/json'}
    // body: JSON.stringify(data)
  }).then(res => {
    console.log("Request complete! response:", res);
  });
};

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
            <Button onClick={handleSubmit}>Войти</Button>
          </ButtonField>
        </LoginWrap>
      </Wrap>
    </div>
  );
}