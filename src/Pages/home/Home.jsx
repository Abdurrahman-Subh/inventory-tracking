import "../../App.css";
import { db } from "../../firebase";
import styled from "styled-components";
import Navbar from "../../components/navbar/Navbar";
import Box from "../../components/box/Box";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { BooksContext } from "../../context/BooksContext";
import SideBar from "../../components/SideBar/SideBar";

import "./Home.css";
const MainContainer = styled.div`
  display: flex;
`;
const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;
const Search = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 12px 50px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
  }
  &:disabled {
    background-color: #ddd;
  }
`;
const LabelContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  justify-content: space-between;
  margin-left: 20px;
  align-items: center;
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
  display: flex;
  justify-content: space-between;
  padding: 0 80px;
  align-items: center;
`;
export default function Home() {
  const { books, search, setSearchQuery } = useContext(BooksContext);
  const [isChecked, setIsChecked] = useState(false);
  const [category, setCategory] = useState([]);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };
  // Add/Remove checked Categories item from list
  const handleCatCheck = (event) => {
    var updatedList = [...category];
    if (event.target.checked) {
      updatedList = [...category, event.target.value];
    } else {
      updatedList.splice(category.indexOf(event.target.value), 1);
    }
    setCategory(updatedList);
  };
  // //Delete Item from Category Array
  // const handleRemoveItem = (event) => {
  //   setCategory((category) =>
  //     category.filter((_, i) => i !== category.length - 1)
  //   );
  // };
  const filterUsers = () => {
    let newList = books.filter((item) =>
      item.user.toString().indexOf(category)
    );
    console.log(newList);
  };
  console.log(category);
  console.log(books);
  return (
    <>
      <Navbar />
      <MainContainer>
        <SideBar />
        <Container
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          exit={{ x: window.innerWidth, transition: { duration: 0.3 } }}
        >
          <InputContainer>
            <div className="containerLabel">
              <LabelContainer>
                <label className="containerLabel">
                  Elif
                  <input
                    type="checkbox"
                    value="Elif"
                    onChange={handleCatCheck}
                  />
                  <span className="checkmark"></span>
                </label>
              </LabelContainer>

              <LabelContainer>
                <label className="containerLabel">
                  Ramazan
                  <input
                    type="checkbox"
                    value="Ramazan"
                    onChange={handleCatCheck}
                  />
                  <span className="checkmark"></span>
                </label>
              </LabelContainer>
              <LabelContainer>
                <label className="containerLabel">
                  Emre
                  <input
                    type="checkbox"
                    value="Emre"
                    onChange={handleCatCheck}
                  />
                  <span className="checkmark"></span>
                </label>
              </LabelContainer>
              <LabelContainer>
                <label className="containerLabel">
                  Çağla
                  <input
                    type="checkbox"
                    value="Çağla"
                    onChange={handleCatCheck}
                  />
                  <span className="checkmark"></span>
                </label>
              </LabelContainer>
              <LabelContainer>
                <Search onClick={filterUsers}>Ara</Search>
              </LabelContainer>
              <LabelContainer>
                <Search>List</Search>
                <Search>Card</Search>
              </LabelContainer>
            </div>
            <Input
              type="text"
              placeholder="Sipariş Ara"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputContainer>
          <Box list={search(books)} />
        </Container>
      </MainContainer>
    </>
  );
}
