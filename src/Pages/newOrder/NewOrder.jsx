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
const Option = styled.option`
  text-align: start;
`;
const Select = styled.select`
  /* Reset */
  appearance: none;
  border: 0;
  outline: 0;
  font-size: 1.2rem;
  /* Personalize */
  width: 16em;
  height: 2.5em;
  padding: 0 4em 0 1em;
  background-image: linear-gradient(45deg, transparent 50%, #c4c4c4 50%),
    linear-gradient(135deg, #c4c4c4 50%, transparent 50%),
    linear-gradient(90deg, rgba(215, 44, 43, 1) 0%, rgba(245, 86, 85, 1) 55%);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), 100% 0;
  background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
  background-repeat: no-repeat;
  color: #000;
  border-radius: 0.25em;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
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
  const [number, setNumber] = useState("");
  const [user, setUser] = useState("");
  const [insurance, setInsurance] = useState("");
  const [seller, setSeller] = useState("");
  const [buyer, setBuyer] = useState("");
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
        user: user.toString(),
        insurance: parseInt(insurance),
        seller: seller.toString(),
        buyer: buyer.toString(),
        sellerNumber: number.toString(),
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
                <Span>Adet</Span>
              </SpanContainer>
              <SpanContainer>
                <Span>Müşteri Adı</Span>
              </SpanContainer>
              <SpanContainer>
                <Span>Müşteri Numarası</Span>
              </SpanContainer>
              <SpanContainer>
                <Span>Kapora Miktarı ?</Span>
              </SpanContainer>
              <SpanContainer>
                <Span>Siparişi Alan Kişi</Span>
              </SpanContainer>
              <SpanContainer>
                <Span>Nerden Sipariş Edildi ?</Span>
              </SpanContainer>
            </LabelContainer>
            <Form>
              <Input
                type="text"
                placeholder="Kitap Adı Giriniz"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Sayı Giriniz"
                onChange={(e) => setNumber(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Müşteri Adı Giriniz"
                onChange={(e) => setBuyer(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Müşteri Numarası"
                onChange={(e) => setInsurance(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Kapora Miktarı Giriniz"
                onChange={(e) => setInsurance(e.target.value)}
              />
              <Select onChange={(e) => setUser(e.target.value)}>
                <Option value="" hidden>
                  Seçiniz
                </Option>
                <Option value="Elif">Elif</Option>
                <Option value="Ramazan">Ramazan</Option>
                <Option value="Güngör">Güngör</Option>
                <Option value="Emre">Emre</Option>
                <Option value="Kübra">Kübra</Option>
                <Option value="Çağla">Çağla</Option>
              </Select>

              <Select onChange={(e) => setSeller(e.target.value)}>
                <Option value="" hidden>
                  Seçiniz
                </Option>
                <Option value="Derya">Derya</Option>
                <Option value="Başarı">Başarı</Option>
                <Option value="Kida">Kida</Option>
              </Select>
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
