import "../../App.css";
import { db } from "../../firebase";
import styled from "styled-components";
import Navbar from "../../components/navbar/Navbar";
import Box from "../../components/box/Box";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { BooksContext } from "../../context/BooksContext";
import { UserAuth } from "../../context/AuthContext";

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;
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
  const { books, search, setSearchQuery } = useContext(BooksContext);

  return (
    <>
      <Navbar />
      <Container
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.3 } }}
      >
        <InputContainer>
          <Input
            type="text"
            placeholder="Sipariş Ara"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputContainer>
        <Box list={search(books)} />
      </Container>
    </>
  );
}
