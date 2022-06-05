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
import { useNavigate, useParams } from "react-router-dom";

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
export default function BookPage() {
  const navigate = useNavigate();
  const notifySuccess = () => {
    toast.success("Başarıyla Tamamlandı");
  };
  const notifyFailed = () => {
    toast.error("Yanlış Bir Şey Oldu");
  };
  const notifyWarning = () => {
    toast.error("Kitap Adını ve Kullanıcıyı Boş Bırakmayınız");
  };
  const { books } = useContext(BooksContext);
  const { id } = useParams();
  const [newBookName, setNewBookName] = useState(
    books.filter((item) => item.id === id).map((item) => item.name)
  );
  const [newImage, setNewImage] = useState(
    books.filter((item) => item.id === id).map((item) => item.image)
  );
  const [insurance, setNewInsurance] = useState(
    books.filter((item) => item.id === id).map((item) => item.insurance)
  );
  const [user, setNewUser] = useState(
    books.filter((item) => item.id === id).map((item) => item.user)
  );
  /* function to update firestore */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "books", id);

    try {
      await updateDoc(taskDocRef, {
        name: newBookName.toString(),
        image: newImage.toString(),
        insurance: parseInt(insurance),
        user: user.toString(),
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
            {books
              .filter((item) => item.id === id)
              .map((item, i) => (
                <Form onSubmit={handleUpdate} key={i}>
                  <Input
                    type="text"
                    value={newBookName}
                    onChange={(e) => setNewBookName(e.target.value)}
                  />
                  <Input
                    type="text"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                  />
                  <Input
                    type="text"
                    value={user}
                    onChange={(e) => setNewUser(e.target.value)}
                  />
                  <Input
                    type="number"
                    value={insurance}
                    onChange={(e) => setNewInsurance(e.target.value)}
                  />
                </Form>
              ))}
          </FormContainer>
          <ButtonContainer>
            <SubmitBtn onClick={handleUpdate}>Gönder</SubmitBtn>
          </ButtonContainer>
        </PageContainer>
        <ToastContainer />
      </Container>
    </>
  );
}
