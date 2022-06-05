import {
  collection,
  deleteDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-right: auto;
  margin-left: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  padding: 60px;
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
const Span = styled.span`
  font-weight: 600;
`;

const Box = ({ list, notify }) => {
  const navigate = useNavigate();
  const notifySuccess = () => {
    toast.success("Başarıyla Tamamlandı");
  };
  const notifyFailed = () => {
    toast.error("Yanlış Bir Şey Oldu");
  };
  const deleteRecord = async (id) => {
    const bookDoc = doc(db, "books", id);
    await deleteDoc(bookDoc);
    notifySuccess();
    window.location.reload(false);
  };

  return (
    <>
      <Container>
        {list.map((book, index) => {
          return (
            <Wrapper key={index}>
              <ImageWrapper>
                <Image
                  src={book.image}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "data:image/jpeg;base64,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";
                  }}
                />
              </ImageWrapper>
              <TextWrapper>
                <Title>{book.name}</Title>
                <Paragraph>
                  <Span>
                    {new Date(book.createdAt.seconds * 1000).toLocaleDateString(
                      "en-UK"
                    )}{" "}
                  </Span>
                  tarihinde sipariş verildi.
                </Paragraph>
                <Paragraph>
                  <Span>{book.insurance}TL</Span> Kapura Alındı
                </Paragraph>
              </TextWrapper>
              <CheckedBox>
                {book.done ? (
                  <Link to={`/ret/${book.id}`}>
                    <NotCheck>Gelmedi</NotCheck>
                  </Link>
                ) : (
                  <Link to={`/onay/${book.id}`}>
                    <Check>GELDI</Check>
                  </Link>
                )}
                <Link to={`/kitap/${book.id}`}>
                  <Edit onClick={notify}>Düzenle</Edit>
                </Link>
                <Delete onClick={() => deleteRecord(book.id)}>Sil</Delete>
              </CheckedBox>
              <User>{book.user}</User>
            </Wrapper>
          );
        })}
      </Container>
      <ToastContainer />
    </>
  );
};
export default Box;
