import {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";

const gitCommitSort = () => {

}

const Main = () => {
    const [commit, setCommit] = useState('');
    const gitCommit = async function () {
        try {
            let res = await axios({
                method: 'GET',
                url: 'http://local.lite24.net:8090/api/rgb/contribution/eternrust/2022',
                credentials: 'include',
                hearders: {
                    "Content-Type": "application/json",
                }
            });
            console.log('commit sccess!');
            // setCommit(res.data.contributions[0]);
            // console.log(res.data);
        } catch (err) {
            console.log('commit error...');
            console.log(err)
        }
    };

    useEffect(() => {
        // gitCommitSort();
        gitCommit();
    });

    const haveCoin = [
        {coinImg:null, name:"HYUNSUK", money:"+12,000 (+4.2%)"},
    ];
    return (
        <Body>
            <TitleDiv>
                <Title Colors="#FE0D7A, #FFF500">COIN</Title>
                <SubTitle>내 코인을 관리해보세요</SubTitle>
            </TitleDiv>
            <SectionDiv Shadow="0px 0px 200px rgba(255, 255, 255, 0.25)">
                <CoinProfile src="Profile.jpg"></CoinProfile>
                <SubThings>HYUNSUK</SubThings>
                <Money>152,894원</Money>
                <SubThings Colors="red">+12,000원 (+4.2%)</SubThings>
                <SubThings Colors="#999999">10코인 보유중</SubThings>
                <Graph></Graph>
                <Line></Line>
            </SectionDiv>
            <SectionDiv BColor="#111111">
                {haveCoin.map((coin)=>(
                    <div>
                        <div>
                            <img src={coin.coinImg} alt="asdf"/>
                            <p>{coin.name}</p>
                            <p>{coin.money}</p>
                        </div>
                        <div></div>
                    </div>
                ))}
            </SectionDiv>
        </Body>
    )
}

export default Main;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;
const TitleDiv = styled.div`
  width: 1320px;
  height: 109px;
  margin: 60px 0 60px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
`;
const Title = styled.h3`
  background: linear-gradient(to right top, ${props => props.Colors || "0,0"});
  color: transparent;
  -webkit-background-clip: text;
  font-family: "Roboto", sans-serif;
  font-size: 64px;
`;
const SubTitle = styled.h4`
  color: white;
  font-family: 'NanumRegular', sans-serif;
  font-weight: 400;
  font-size: 24px;
`;
const SectionDiv = styled.section`
  color: white;
  width: 840px;
  height: 470px;
  padding: 30px 30px 0 30px;
  background: ${props => props.BColor || "#000000"};
  box-shadow: ${props => props.Shadow || "none"};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const CoinProfile = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 100%;
  object-fit: cover;
`;
const Money = styled.p`
  font-family: 'Roboto';
  font-weight: 900;
  font-size: 32px;
`;
const SubThings = styled.p`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  color: ${props => props.Colors || "white"};
`;
const Graph = styled.div`
  background: red;
  height: 240px;
  width: 100%;
`;
const Line = styled.div`
  background: linear-gradient(90deg, #FEDA0D 0%, #FE3365 100%);
  border-radius: 100px;
  height: 4px;
  width: 840px;
`;