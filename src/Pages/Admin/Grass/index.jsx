import { useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { Image } from "../../../styleds";
import Model from "./model";
import { useQuery } from "react-query";
import { BaseUrl } from "../../../export/baseUrl";
import { useCookies } from "react-cookie";

const Index = () => {
  const [cookies, ,] = useCookies();
  const [openModel, setModel] = useState(false);
  const [modelType, setType] = useState(['MAKE']);

  const openMAKE = () => {
    setType(['MAKE']);
    setModel(true);
  }

  const openDetail = (data) => {
    setType(['VIEW', data]);
    setModel(true);
  }

  const { status, data, refetch } = useQuery(['GrassData'], () =>
    axios({
      method: 'GET',
      url: BaseUrl + '/item/grass',
      headers: {
        Authorization: `Bearer ${cookies.accessToken}`,
      },
      params: {
        idx: 0,
        size: 20
      }
    }),
    {
      refetchOnWindowFocus: false,
      retry: 0
    }
  )

  return (
    <>
      <Body>
        {openModel && <Model Type={modelType} Fn1={setModel} Fn2={refetch} setType={setType} />}
        <Text Margin="100px" Size="36px" W="200">Manage Grass</Text>
        <FlexDiv>
          <Text>Grass List</Text>
          <AddButton onClick={() => openMAKE(true)}>잔디 추가</AddButton>
        </FlexDiv>
        <MainBox>
          {
            status === 'success' &&
            data.data.content.map((item, index) =>
              <Grass key={index} data={item} Fn1={openDetail} />
            )
          }
        </MainBox>
      </Body>
    </>
  );
}

export default Index;

const PageMove = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100px);
    animation-timing-function: ease;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Body = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 100px 300px 100px 300px;
  animation: ${PageMove} 0.5s;
`;

const Text = styled.p`
  font-family: Roboto, sans-serif;
  font-weight: ${props => props.W || "600"};
  font-size: ${props => props.Size || '28px'};
  color: white;
  margin-bottom: ${props => props.Margin || '0'};
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
`;
const AddButton = styled.button`
  height: 50px;
  width: 200px;
  background-color: #222222;
  border-radius: 20px;
  border: solid 2px black;
  color: #888888;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    transform: scale(1.1);
    background-color: black;
    border: solid 2px white;
    color: white;
  }
`;

const MainBox = styled.div`
    background-color: #222222;
    width: 100%;
    height: auto;
    border-radius: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(315px, auto));
    gap: 20px;
    padding: 60px;
`

const Grass = ({ data, Fn1 }) => {
  return (
    <AdBox onClick={() => Fn1(data.id)}>
      <GrassBox color={data.color.background}>
        <GrassDetail color={data.color.less}/>
        <GrassDetail color={data.color.low}/>
        <GrassDetail color={data.color.normal}/>
        <GrassDetail color={data.color.high}/>
        <GrassDetail color={data.color.max}/>
      </GrassBox>
      <Text W='400' Size='20px'>{data.name}</Text>
    </AdBox>
  )
}

const AdBox = styled.div`
    width: 275px;
    height: 140px;
    background: #000000;
    padding: 20px;
    border-radius: 20px;
    transition: 0.3s;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    &:hover {
        box-shadow: 0 0 100px 1px #FFFFFF;
        transform: scale(1.05);
        z-index: 1;
    }
`

const GrassBox = styled.div`
  width: 235px;
  height: 50px;
  padding: 20px;
  border-radius: 20px;
  background: #${(props) => props.color};
  
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const GrassDetail = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 10px;
  background: #${(props) => props.color};

`