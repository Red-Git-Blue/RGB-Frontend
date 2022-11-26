import {Fragment, useEffect, useState} from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import styled from "styled-components";
import axios from "axios";
import {useMediaQuery} from "react-responsive";

const Admin = () => {
    let navigate = useNavigate();
    return (
        <Fragment>
            <Body>
                <Title>Management</Title>
                <FlexDiv>
                    <SelectBox onClick={() => navigate('/youDontKnow/AdminPage/AdminBadge')}>
                        <Eng>Manage Badge</Eng>
                        <Kor>배지 관리</Kor>
                    </SelectBox>
                    <SelectBox onClick={() => navigate('/youDontKnow/AdminPage/AdminGrass')}>
                        <Eng>Manage Grass</Eng>
                        <Kor>잔디 관리</Kor>
                    </SelectBox>
                    <SelectBox onClick={() => navigate('/youDontKnow/AdminPage/AdminAd')}>
                        <Eng>Manage Ad</Eng>
                        <Kor>광고 관리</Kor>
                    </SelectBox>
                    <SelectBox onClick={() => navigate('/youDontKnow/AdminPage/AdminCategory')}>
                        <Eng>Manage Category</Eng>
                        <Kor>카테고리 관리</Kor>
                    </SelectBox>
                </FlexDiv>
            </Body>
        </Fragment>
    );
}
export default Admin;

const Title = styled.h3`
  font-family: Roboto, sans-serif;
  font-size: 64px;
  font-weight: 900;
`;
const Body = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: white;
`;
const FlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 1200px;
  height: 50vh;
`;
const SelectBox = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  width: 320px;
  height: 120px;
  border-radius: 20px;
  padding: 20px 100px 20px 100px;
  border-left: 30px solid #4A56D3;
  transition: 0.3s;
  cursor: pointer;
  &:hover{
    transform: scale(1.1);
    border-left: 80px solid #4A56D3;
    padding: 20px 100px 20px 50px;
  }
`;
const Eng = styled.p`
  font-size: 36px;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  margin-bottom: 10px;
  color: #4A56D3;
`;
const Kor = styled.p`
  font-size: 20px;
  font-family: Roboto, sans-serif;
  font-weight: 900;
  color: black;
`;