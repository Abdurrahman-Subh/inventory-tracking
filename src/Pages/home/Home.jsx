import "../../App.css";
import { db } from "../../firebase";
import styled from "styled-components";
import Navbar from "../../components/navbar/Navbar";
import Box from "../../components/box/Box";
const Input = styled.input`
  width: 20%;
  padding: 12px 20px;
  margin: 8px 0;
  border: 4px dotted #f33b3b;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1.4rem;
  &:focus {
    outline: none;
    border: 4px solid #f33b3b;
  }
`;
const InputContainer = styled.div`
  margin: 30px 0 30px 0;
`;
export default function Home() {
  return (
    <>
      <Navbar />
      <InputContainer>
        <Input type="text" placeholder="Sipariş Ara" />
      </InputContainer>
      <Box />
    </>
  );
}
