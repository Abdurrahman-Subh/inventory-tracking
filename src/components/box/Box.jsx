import React from "react";
import styled from "styled-components";
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
  width: 60%;
  border-bottom: 2px solid #000;
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
`;
const Span = styled.span`
  font-weight: 600;
`;

const Box = () => {
  return (
    <Container>
      <Wrapper>
        <ImageWrapper>
          <Image src="https://i.dr.com.tr/cache/500x400-0/originals/0001902535001-1.jpg" />
        </ImageWrapper>
        <TextWrapper>
          <Title>Kitap 1</Title>
          <Paragraph>
            <Span> 25/10/2001</Span> tarihinde sipariş verildi.
          </Paragraph>
          <Paragraph>
            <Span>5TL</Span> Kapura Alındı
          </Paragraph>
        </TextWrapper>
        <CheckedBox>
          <Check>GELDI</Check>
          <Edit>Düzenle</Edit>
          <Delete>Sil</Delete>
        </CheckedBox>
        <User>Ramazan</User>
      </Wrapper>
      <Wrapper>
        <ImageWrapper>
          <Image src="https://i.dr.com.tr/cache/500x400-0/originals/0001902535001-1.jpg" />
        </ImageWrapper>
        <TextWrapper>
          <Title>Kitap 2</Title>
          <Paragraph>
            <Span> 25/10/2001</Span> tarihinde sipariş verildi.
          </Paragraph>
          <Paragraph>
            <Span>5TL</Span> Kapura Alındı
          </Paragraph>
        </TextWrapper>
        <CheckedBox>
          <Check>GELDI</Check>
          <Edit>Düzenle</Edit>
          <Delete>Sil</Delete>
        </CheckedBox>
        <User>Ramazan</User>
      </Wrapper>
      <Wrapper>
        <ImageWrapper>
          <Image src="https://i.dr.com.tr/cache/500x400-0/originals/0001902535001-1.jpg" />
        </ImageWrapper>
        <TextWrapper>
          <Title>Kitap 3</Title>
          <Paragraph>
            <Span> 25/10/2001</Span> tarihinde sipariş verildi.
          </Paragraph>
          <Paragraph>
            <Span>5TL</Span> Kapura Alındı
          </Paragraph>
        </TextWrapper>
        <CheckedBox>
          <Check>GELDI</Check>
          <Edit>Düzenle</Edit>
          <Delete>Sil</Delete>
        </CheckedBox>
        <User>Ramazan</User>
      </Wrapper>
      <Wrapper>
        <ImageWrapper>
          <Image src="https://i.dr.com.tr/cache/500x400-0/originals/0001902535001-1.jpg" />
        </ImageWrapper>
        <TextWrapper>
          <Title>Kitap 4</Title>
          <Paragraph>
            <Span> 25/10/2001</Span> tarihinde sipariş verildi.
          </Paragraph>
          <Paragraph>
            <Span>5TL</Span> Kapura Alındı
          </Paragraph>
        </TextWrapper>
        <CheckedBox>
          <Check>GELDI</Check>
          <Edit>Düzenle</Edit>
          <Delete>Sil</Delete>
        </CheckedBox>
        <User>Ramazan</User>
      </Wrapper>
    </Container>
  );
};
export default Box;
