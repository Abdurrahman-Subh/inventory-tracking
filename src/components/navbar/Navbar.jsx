import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Container = styled.div`
  max-width: 100%;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  background: #232323;
  color: #fff;
  padding: 20px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
const Ul = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Ulogo = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
`;
const Li = styled.li`
  list-style: none;
  font-size: 1.4rem;
`;
const Logo = styled.span`
  font-size: 1.8rem;
  font-weight: 600;
`;

const navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Ulogo>
          <Li>
            <Logo>Stok</Logo>
          </Li>
        </Ulogo>
        <Ul>
          <Li>
            <Link to="/">Kayıtlar</Link>
          </Li>
          <Li>
            <Link to="/yeni-kayit">Yeni Kayıt</Link>
          </Li>
          <Li>
            <Link to="/kayit">Çıkış Yap</Link>
          </Li>
        </Ul>
      </Wrapper>
    </Container>
  );
};
export default navbar;
