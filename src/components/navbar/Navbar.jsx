import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
  cursor: pointer;
`;
const Logo = styled.span`
  font-size: 1.8rem;
  font-weight: 600;
`;

const navbar = () => {
  const { user, logout } = UserAuth();
  const handleLogout = async () => {
    try {
      await logout();
      console.log("You are logged out");
      window.location.reload(false);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Ulogo>
          <Link to="/">
            <Li>
              <Logo>Stok</Logo>
            </Li>
          </Link>
        </Ulogo>
        <Ul>
          <Li>
            <Link to="/">Kayıtlar</Link>
          </Li>
          <Li>
            <Link to="/yeni-kayit">Yeni Kayıt</Link>
          </Li>
          {user ? <Li>{user.email}</Li> : <Li>Hi</Li>}
          <Li onClick={handleLogout}>Çıkış Yap</Li>
        </Ul>
      </Wrapper>
    </Container>
  );
};
export default navbar;
