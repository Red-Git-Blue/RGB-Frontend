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
        {coinImg: null, name: "HYUNSUK", money: "+12,000 (+4.2%)", Coin: "10"},
    ];
    return (
        <Body>
            <TitleDiv>
                <Title Colors="#FE0D7A, #FFF500">COIN</Title>
                <SubTitle>내 코인을 관리해보세요</SubTitle>
            </TitleDiv>
            <FlexDiv Justify="space-between">
                <SectionDiv Shadow="0px 0px 200px rgba(255, 255, 255, 0.25)">
                    <FlexDiv>
                        <Profile src="Profile.jpg"></Profile>
                        <SubThings Weight="900">HYUNSUK</SubThings>
                    </FlexDiv>
                    <Money>152,894원</Money>
                    <FlexDiv Justify="space-between">
                        <SubThings Colors="red">+12,000원 (+4.2%)</SubThings>
                        <SubThings Colors="#999999">10코인 보유중</SubThings>
                    </FlexDiv>
                    <Graph>
                        <TestChart></TestChart>
                    </Graph>
                    <Line></Line>
                </SectionDiv>
                <SectionDiv BColor="#111111" Width="24%">
                    {haveCoin.map((coin) => (
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
            </FlexDiv>

        </Body>
    )
}

export default Main;
const TestChart = styled.div`
  width: 100%;
  background-image: linear-gradient(90deg, rgba(0,0,0,1), rgba(0,0,0,0)), url("/TestChart.png");
`;
const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.Justify||"start"};
  width: 100%;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 0 15.625% 0 15.625%;
`;
const TitleDiv = styled.div`
  width: 100%;
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
  font-weight: 900;
  font-size: 64px;
`;
const SubTitle = styled.h4`
  color: white;
  font-family: 'NanumGothic', sans-serif;
  font-weight: lighter;
  font-size: 24px;
`;
const SectionDiv = styled.section`
  color: white;
  width: ${props => props.Width||"64%"};
  height: 470px;
  padding: 30px 30px 0 30px;
  background: ${props => props.BColor || "#000000"};
  box-shadow: ${props => props.Shadow || "none"};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
`;
const Profile = styled.img`
  margin-right: 10px;
  height: 30px;
  width: 30px;
  border-radius: 100%;
  object-fit: cover;
`;
const Money = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-size: 32px;
`;
const SubThings = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: ${props => props.Weight || "400"};
  font-size: 16px;
  color: ${props => props.Colors || "white"};
`;
const Graph = styled.div`
  background: none;
  height: 240px;
  width: 100%;
  display: flex;
  align-items: center;
`;
const Line = styled.div`
  background: linear-gradient(90deg, #FEDA0D 0%, #FE3365 100%);
  border-radius: 100px;
  height: 4px;
  width: 100%;
`;