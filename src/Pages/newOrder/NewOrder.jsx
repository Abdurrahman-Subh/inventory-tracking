import "../../App.css";
import { db } from "../../firebase";
import styled from "styled-components";
import Navbar from "../../components/navbar/Navbar";
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  width: 60%;
  padding: 12px 20px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1.4rem;
  text-align: start;
`;
const LabelContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  height: 100%;
`;
const PageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 2fr);
  height: 100%;
  padding: 50px;
  align-items: center;
`;
const FormContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  height: 100%;
  padding: 50px;
  width: 100%;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #eeeeee;
`;
const Form = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  height: 100%;
`;
const SpanContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;
const Span = styled.label`
  font-size: 1.6rem;
  text-align: start !important;
`;
const SubmitBtn = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 18px 66px;
  text-align: center;
  text-decoration: none;
  font-size: 1.4rem;
  margin: 4px 2px;
  transition-duration: 0.4s;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
  }
`;
const ButtonContainer = styled.div`
  width: 60%;
  margin-left: auto;
  margin-right: auto;
`;
export default function NewOrder() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [user, setUser] = useState("");
  const [insurance, setInsurance] = useState("");
  const booksCollectionRef = collection(db, "books");
  const navigate = useNavigate();
  const notifySuccess = () => {
    toast.success("Başarıyla Tamamlandı");
  };
  const notifyFailed = () => {
    toast.error("Yanlış Bir Şey Oldu");
  };
  const createOrder = async (e) => {
    e.preventDefault();
    try {
      await addDoc(booksCollectionRef, {
        name: name.toString().trim(),
        image: image.toString().trim(),
        user: user.toString().trim(),
        insurance: parseInt(insurance),
        done: false,
        createdAt: new Date(),
      });
      notifySuccess();
      navigate("/");
    } catch (err) {
      notifyFailed();
    }
  };

  return (
    <>
      <Navbar />
      <Container
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.3 } }}
      >
        <PageContainer>
          <FormContainer>
            <LabelContainer>
              <SpanContainer>
                <Span>Kitap Adı</Span>
              </SpanContainer>
              <SpanContainer>
                <Span>Kitap Fotoğrafı</Span>
              </SpanContainer>
              <SpanContainer>
                <Span>Siparişi Alan Kişi</Span>
              </SpanContainer>
              <SpanContainer>
                <Span>Kapura Miktarı ?</Span>
              </SpanContainer>
            </LabelContainer>
            <Form>
              <Input
                type="text"
                placeholder="Kitap Adı Giriniz"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Fotoğraf Bağlantısı Yapıştırın"
                onChange={(e) => setImage(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Ad Giriniz"
                onChange={(e) => setUser(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Kapura Miktarı Giriniz"
                onChange={(e) => setInsurance(e.target.value)}
              />
            </Form>
          </FormContainer>
          <ButtonContainer>
            <SubmitBtn onClick={createOrder}>Oluştur</SubmitBtn>
          </ButtonContainer>
        </PageContainer>
        <ToastContainer />
      </Container>
    </>
  );
}
