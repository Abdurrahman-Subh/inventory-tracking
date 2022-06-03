import "../../App.css";
import { db } from "../../firebase";
import styled from "styled-components";
import Navbar from "../../components/navbar/Navbar";
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
const InputContainer = styled.div`
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
export default function NewOrder() {
  return (
    <>
      <Navbar />
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
              <Span>Kapura Alındı Mı ?</Span>
            </SpanContainer>
            <SpanContainer>
              <Span>Kapura Miktarı ?</Span>
            </SpanContainer>
          </LabelContainer>
          <InputContainer>
            <Input type="text" placeholder="Kitap Adı Giriniz" />
            <Input type="text" placeholder="Fotoğraf Bağlantısı Yapıştırın" />
            <Input type="text" placeholder="Ad Giriniz" />
            <Input type="checkbox" />
            <Input type="text" placeholder="Kapura Miktarı Giriniz" />
          </InputContainer>
        </FormContainer>
      </PageContainer>
      <SubmitBtn>Gönder</SubmitBtn>
    </>
  );
}
