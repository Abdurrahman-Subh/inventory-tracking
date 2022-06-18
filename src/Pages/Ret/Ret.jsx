import "../../App.css";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import styled from "styled-components";
import Navbar from "../../components/navbar/Navbar";
import Box from "../../components/box/Box";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { BooksContext } from "../../context/BooksContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  margin-left: auto;
  margin-right: auto;
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
  grid-template-columns: repeat(1, 2fr);
  height: 100%;
  padding: 50px;
  width: 100%;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #eeeeee;
  gap: 30px;
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
  font-size: 1.4rem;
  font-weight: 700;
  text-align: start !important;
`;
const PageTitle = styled.h1`
  font-size: 2.4rem;
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
const CloseButton = styled.button`
  background-color: #990000; /* Red */
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
  display: flex;
  justify-content: space-between;
`;
const Wrapper = styled.div`
  width: 100%;
  min-height: 175px;
  border-radius: 10px;
  display: grid;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: repeat(1, 1fr);
  gap: 0px;
  border: 3px solid #eeeeee;
  overflow: hidden;
  &:hover {
    height: auto;
    transition: all 0.3s ease 0s;
    -moz-transition: all 0.3s ease 0s;
    -webkit-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    -ms-transition: all 0.3s ease 0s;
    border: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    box-shadow: 1px 5px 18px 5px rgba(0, 0, 0, 0.23);
  }
`;
const ImageWrapper = styled.div`
  width: 100%;
`;
const Image = styled.img`
  width: 180px;
  height: 200px;
  background-image: cover;
  border-bottom: 2px solid #000;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
const TextWrapper = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
`;
const Title = styled.h2``;
const Paragraph = styled.p`
  text-align: start;
`;
const CheckedBox = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  align-items: center;
`;
const Check = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 12px 20px;
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
const NotCheck = styled.button`
  background-color: #990000; /* Green */
  border: none;
  color: white;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
`;
const Delete = styled.button`
  background-color: #f44336; /* Red */
  border: none;
  color: white;
  padding: 12px 20px;
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
`;
const Edit = styled.button`
  border: none;
  color: white;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  border: 1px solid #000;
  border-radius: 5px;
  background-color: #035397;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
  }
`;
const User = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: gray;
  padding: 10px;
`;

export default function Onay() {
  const navigate = useNavigate();
  const notifySuccess = () => {
    toast.success("Başarıyla Tamamlandı");
  };
  const notifyFailed = () => {
    toast.error("Yanlış Bir Şey Oldu");
  };

  const { books } = useContext(BooksContext);
  const { id } = useParams();
  /* function to update firestore */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "books", id);

    try {
      await updateDoc(taskDocRef, {
        done: false,
      });
      notifySuccess();
      navigate("/");
    } catch (err) {
      notifyFailed();
      console.log(err);
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
          {books
            .filter((item) => item.id === id)
            .map((book, i) => (
              <FormContainer>
                <SpanContainer>
                  <PageTitle>Kitap Geldi mi ?</PageTitle>
                </SpanContainer>
                <LabelContainer>
                  <Wrapper key={i}>
                    <ImageWrapper>
                      <Image
                        src={book.image}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2018/10/15/c190ac54-e2cb-4a96-94fd-ec6154b7841c/lionel-messi";
                        }}
                      />
                    </ImageWrapper>
                    <TextWrapper>
                      <Title>{book.name}</Title>
                      <Paragraph>
                        <Span>
                          {new Date(
                            book.createdAt.seconds * 1000
                          ).toLocaleDateString("en-UK")}{" "}
                        </Span>
                        tarihinde sipariş verildi.
                      </Paragraph>
                      <Paragraph>
                        <Span>{book.insurance}TL</Span> Kapura Alındı
                      </Paragraph>
                    </TextWrapper>

                    <User>{book.user}</User>
                  </Wrapper>
                </LabelContainer>

                <Form onSubmit={handleUpdate} key={i}>
                  <ButtonContainer>
                    <SubmitBtn onClick={handleUpdate}>Hayir Gelmedi</SubmitBtn>
                    <Link to="/">
                      <CloseButton>Ana Sayfaya Dön</CloseButton>
                    </Link>
                  </ButtonContainer>
                </Form>
              </FormContainer>
            ))}
        </PageContainer>
        <ToastContainer />
      </Container>
    </>
  );
}
