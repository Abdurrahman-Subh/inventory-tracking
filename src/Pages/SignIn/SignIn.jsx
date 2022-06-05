import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import styled from "styled-components";
import Icon from "../../components/Icon/Icon";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  background-image: url("https://img.freepik.com/free-photo/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall_1258-28312.jpg?w=1380&t=st=1654460101~exp=1654460701~hmac=c09240ecd5fb2113666221181b82dec051bb2f7046e482b69aa5317f5ff6b62a");
  background-repeat: no-repeat;
  background-size: cover;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 100vw;
    height: 100vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }

  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 100vw;
    height: 100vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 30%;
  width: 30%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ForgotPassword = styled.h4`
  cursor: pointer;
`;
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <MainContainer>
      <WelcomeText>Hoş Geldiniz</WelcomeText>
      <InputContainer>
        <Input type="text" placeholder="Mail" />
        <Input type="password" placeholder="Şifre" />
      </InputContainer>
      <ButtonContainer>
        <Button content="Giriş Yap" />
      </ButtonContainer>

      <ForgotPassword>Şifreyi Unuttum ?</ForgotPassword>
    </MainContainer>
  );
};

export default SignIn;
