import {Fragment, useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {Image} from "../../styleds";
import {useMediaQuery} from "react-responsive";
import AnimationPage from "../AnimatedPage";
import Github_view from "../Auth/Contribution";

const gitCommitSort = () => {

}

const Main = () => {
    const isMobile = useMediaQuery({query: '(max-width:768px)'});
    const [commit, setCommit] = useState(undefined);
    const gitCommit = async function () {
        try {
            let res = await axios({
                method: 'GET',
                url: 'http://local.lite24.net:8080/api/user/contribution',
                credentials: 'include',
                hearders: {
                    "Content-Type": "application/json",
                },
                params: {
                    name: 'eternrust',
                    year: 2022
                }
            });
            console.log('commit sccess!');
            setCommit(res.data.contributions);
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
        {coinImg: 'Profile.jpg', name: "HYUNSUK", money: "+12,000 (+4.2%)", Coin: "10", price: "152,894"},
        {coinImg: 'Profile.jpg', name: "SeungWoo", money: "+64,652 (+8.9%)", Coin: "10", price: "212,651"},
        {coinImg: 'Profile.jpg', name: "JunHa", money: "-132 (-1.1%)", Coin: "10", price: "1,978"},
        {coinImg: 'Profile.jpg', name: "MOONER510", money: "+57,628 (+20.5%)", Coin: "10", price: "657,918"},
    ];

    const [coin, setCoin] = useState(haveCoin[0]);

    let display = !isMobile ? 'flex' : 'block';
    let width = isMobile ? "100%" : null;

    const PrintCoinGraph = ({Info, width}) => {
        return (
            <SectionDiv Shadow="0px 0px 200px rgba(255, 255, 255, 0.25)" Width={width} Margin="0 10px 120px 0">
                <FlexDiv Margin="20px">
                    <Profile src="Profile.jpg"></Profile>
                    <SubThings Weight="900">{Info.name}</SubThings>
                </FlexDiv>
                <Money>{Info.price}원</Money>
                <FlexDiv Justify="space-between" Margin="40px">
                    <SubThings Colors={Info.money.includes('-') === true ? "#0038FF" : "red"}>{Info.money}</SubThings>
                    <SubThings Colors="#999999">{Info.Coin}코인 보유중</SubThings>
                </FlexDiv>
                <Graph>
                    <TestChart src="TestChart.png"></TestChart>
                </Graph>
                <Line></Line>
            </SectionDiv>
        );
    }

    const PrintCoin = ({Info}) => {
        return (
            <SectionDiv Padding="20px 20px 0 20px" Width="84%" Height="50px" Margin="0 0 20px 0" Hover="1" onClick={() => {
                setCoin(Info)
            }}>
                <FlexDiv Justify="space-between">
                    <FlexDiv Width="auto">
                        <Profile src={Info.coinImg}/>
                        <SubThings Size="12px" Weight="900">{Info.name}</SubThings>
                    </FlexDiv>
                    <SubThings Size="12px"
                               Colors={Info.money.includes('-') === true ? "#0038FF" : "red"}>{Info.money}</SubThings>
                </FlexDiv>
                <Line></Line>
            </SectionDiv>
        );
    }

    return (
        <AnimationPage>
            <Body>
                <TitleDiv>
                    <Title Colors="#FFF500, #FE0D7A">COIN</Title>
                    <SubTitle>내 코인을 관리해보세요</SubTitle>
                </TitleDiv>
                <FlexDiv Justify="space-between" Display={display}>
                    <PrintCoinGraph width={width} Info={coin}/>
                    <SectionDiv BColor="#111111" Width={width || "26%"} Padding="20px 10px 20px 10px" Align="center"
                                Height="460px">
                        <SubThings Colors="#999999" Weight="900" Size="18px" Margin="20px">보유 코인</SubThings>
                        <ScrollDiv>
                            {haveCoin.map((coin) =>
                                <PrintCoin Info={coin}/>
                            )}
                        </ScrollDiv>
                    </SectionDiv>
                </FlexDiv>
                <TitleDiv>
                    <Title Colors="#FFF500, #35B2BA">SHOP</Title>
                    <SubTitle>획득할 수 있는 배지를 살펴보세요</SubTitle>
                </TitleDiv>
            </Body>
            <Shop_view_box>
                <Pageing/>
                <Shop_view_detail/>
                <Shop_view_detail/>
                <Shop_view_detail/>
                <Shop_view_detail/>
                <Shop_view_detail/>
                <Shop_view_detail/>
                <Pageing type='right'/>
            </Shop_view_box>
            <Body>
                <TitleDiv>
                    <Title Colors="#35B2BA, #4E55D2">GITHUB</Title>
                    <SubTitle>커밋 현황을 살펴보세요</SubTitle>
                </TitleDiv>
                <Github_view margin='0 0 200px 0' data={commit}/>
            </Body>
        </AnimationPage>
    )
}

export default Main;

const ScrollDiv = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    height: 30px;
    border-radius: 100px;
    background: #222222;
  }

  &::-webkit-scrollbar-track {
    background: black;
    border-radius: 100px;
  }
`;
const TestChart = styled.img`
  width: 100%;
`;
const FlexDiv = styled.div`
  display: ${props => props.Display || "flex"};
  align-items: center;
  justify-content: ${props => props.Justify || "start"};
  width: ${props => props.Width || "100%"};
  margin-bottom: ${props => props.Margin || "0"};
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 0 15% 0 15%;
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
  width: ${props => props.Width || "64%"};
  height: ${props => props.Height || "470px"};
  padding: ${props => props.Padding || "30px 30px 0 30px"};
  background: ${props => props.BColor || "#000000"};
  box-shadow: ${props => props.Shadow || "none"};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: ${props => props.Align || "start"};
  margin: ${props => props.Margin || "0 0 120px 0"};
  transition: 0.3s;
  cursor: ${props => props.Hover && "pointer"};

  &:hover {
    transform: ${props => props.Hover && "scale(0.9)"};
  }
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
  font-size: ${props => props.Size || "16px"};
  color: ${props => props.Colors || "white"};
  margin-bottom: ${props => props.Margin || "0"};
`;
const Graph = styled.div`
  background: none;
  height: 240px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 47px;
`;
const Line = styled.div`
  background: linear-gradient(90deg, #FEDA0D 0%, #FE3365 100%);
  border-radius: 100px;
  height: 4px;
  width: 100%;
`;

const Shop_view_box = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 120px;
`

const Shop_view_detail_box = styled.div`
  width: 260px;
  height: 413px;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  span {
    font-family: 'NanumGothic', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    color: #ffffff;

    &:nth-child(2) {
      margin-top: 30px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &:nth-child(3) {
      margin-top: 10px;
      font-weight: 400;
      line-height: 160%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    &:nth-child(4) {
      margin-top: 20px;
      font-size: 20px;
      line-height: 23px;
    }
  }
`

const Pageing_box = styled.div`
  width: 300px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(270deg, ${(props) => props.color || '0,0'});
  position: absolute;
  right: ${(props) => props.right};
`

const Page_left_btn = styled.span`
  height: 10px;
  width: 50px;
  display: block;
  background-color: #ffffff;
  border-radius: 10px;
  cursor: pointer;

  &::after {
    content: '';
    height: 10px;
    width: 50px;
    display: block;
    background-color: #ffffff;
    border-radius: 10px;
    transform: translate(-21px, 21px) rotate(90deg);
  }
`

const Page_right_btn = styled.span`
  height: 10px;
  width: 50px;
  display: block;
  background-color: #ffffff;
  transform: translateY(35px) rotate(135deg);
  border-radius: 10px;
  cursor: pointer;

  &::after {
    content: '';
    height: 10px;
    width: 50px;
    display: block;
    background-color: #ffffff;
    border-radius: 10px;
    transform: translate(-21px, 21px) rotate(-90deg);
  }
`

const Shop_view_detail = ({data}) => {
    return (
        <Shop_view_detail_box>
            <Image width='260px' height='260px' alt='뱃지 이미지'/>
            <span>고급스러운 무의 배지</span>
            <span>고급스러운 색감과 무의 예술적인 감각을 살린 배지</span>
            <span>12,000원</span>
        </Shop_view_detail_box>
    )
}

const Pageing = ({type = 'left'}) => {
    return (
        <Pageing_box
            color={type == 'right' ? '#111111, rgba(17, 17, 17, 0)' : 'rgba(17, 17, 17, 0), #111111'}
            right={type == 'right' ? 0 : 'auto'}
        >
            {
                type == 'right' ?
                    <Page_right_btn/>
                    :
                    <Page_left_btn/>
            }
        </Pageing_box>
    )
}