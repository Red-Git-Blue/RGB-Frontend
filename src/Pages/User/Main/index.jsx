import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Image } from "../../../styleds";
import { useMediaQuery } from "react-responsive";
import AnimationPage from "../../AnimatedPage";
import Github_view from "../../Auth/Contribution";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { BaseUrl } from "../../../export/base";

class CircleQueue{
  constructor(data, size){
      this.maxQueueSize = size;
      this.array = data;
      this.front = 0;
      this.rear = size < 6 ? size : 6;
  }

  movingRight() {
    this.front = (this.front + 1) % this.maxQueueSize;
    this.rear = (this.rear + 1) % this.maxQueueSize;
  }

  movingLeft() {
    this.front = (this.front -1 + this.maxQueueSize) % this.maxQueueSize;
    this.rear = (this.rear - 1 + this.maxQueueSize) % this.maxQueueSize;
  }

  print(){
    let result = [];
    let i = this.front;
    do{
        i = (i+1) % this.maxQueueSize;
        result.push(this.array[i]);
        if(i == this.rear) break;
    }while(i != this.front);
    
    return result;
  }
}

const Main = () => {
  const [cookies, , ] = useCookies(['accessToken']);
  const isMobile = useMediaQuery({ query: '(max-width:768px)' });
  const [badgeData, setBadgeData] = useState(undefined);
  const [viewBadge, setViewBadge] = useState(undefined);
  const [commit, setCommit] = useState(undefined);

  const getBadge = () => {
    axios({
      method: 'get',
      url: 'http://local.lite24.net:8080/api/item/badge/details',
      params: {
        idx: 0,
        size: 20
      }
    })
    .then((res) => {
      if(res.data.empty) return;
      setBadgeData(new CircleQueue(res.data.content, res.data.numberOfElements));
      setViewBadge(res.data.content.slice(1, 7));
    })
    .catch((err) => {
    })
  }

  const gitCommit = async function () {
    try {
      let res = await axios({
        method: 'GET',
        url: BaseUrl + '/user/contribution',
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
        params: {
          year: 2022
        }
      });
      setCommit(res.data.contributions);
    } catch (err) {
      // if(err.response.data.message === 'Github Token Not Found') {
      //   toast.info('Github를 연동하면 더 많은 기능을 즐길 수 있습니다.')
      //   toast.info('깃허브가 연동되지 않았군요!')
      // }
    }
  };

  useEffect(() => {
    gitCommit();
    getBadge();
  }, []);

    const haveCoin = [
      {coinImg: '/image/Profile.jpg', name: "HYUNSUK", money: "+12,000 (+4.2%)", Coin: "10", price: "152,894"},
      {coinImg: '/image/Profile.jpg', name: "SeungWoo", money: "+64,652 (+8.9%)", Coin: "5", price: "212,651"},
      {coinImg: '/image/Profile.jpg', name: "JunHa", money: "-132 (-1.1%)", Coin: "12", price: "1,978"},
      {coinImg: '/image/Profile.jpg', name: "MOONER510", money: "+57,628 (+20.5%)", Coin: "2", price: "657,918"},
      { coinImg: '/image/Profile.jpg', name: "MOONER510", money: "+57,628 (+20.5%)", Coin: "10", price: "657,918" },
      { coinImg: '/image/Profile.jpg', name: "MOONER510", money: "+57,628 (+20.5%)", Coin: "10", price: "657,918" },
    ];

  const [coin, setCoin] = useState(haveCoin[0]);

  let display = !isMobile ? 'flex' : 'block';
  let width = isMobile ? "100%" : null;

  const PrintCoinGraph = ({ Info, width }) => {
    return (
      <SectionDiv Shadow="0px 0px 200px rgba(255, 255, 255, 0.25)" Width={width} Margin="0 10px 120px 0">
        <FlexDiv Margin="20px">
          <Profile src={Info.coinImg}></Profile>
          <SubThings Weight="900">{Info.name}</SubThings>
        </FlexDiv>
        <Money>{Info.price}원</Money>
        <FlexDiv Justify="space-between" Margin="40px">
          <SubThings Colors={Info.money.includes('-') === true ? "#0038FF" : "red"}>{Info.money}</SubThings>
          <SubThings Colors="#999999">{Info.Coin}코인 보유중</SubThings>
        </FlexDiv>
        <Graph>
          <TestChart src="/image/TestChart.png"></TestChart>
        </Graph>
        <Line></Line>
      </SectionDiv>
    );
  }

  const PrintCoin = ({ Info }) => {
    return (
      <SectionDiv Padding="20px 20px 0 20px" Width="84%" Height="50px" Margin="0 0 20px 0" Hover="1" onClick={() => {
        setCoin(Info)
      }}>
        <FlexDiv Justify="space-between">
          <FlexDiv Width="auto">
            <Profile src={Info.coinImg} />
            <SubThings Size="12px" Weight="900">{Info.name}</SubThings>
          </FlexDiv>
          <SubThings Size="12px"
            Colors={Info.money.includes('-') === true ? "#0038FF" : "red"}>{Info.money}</SubThings>
        </FlexDiv>
        <Line></Line>
      </SectionDiv>
    );
  }

  const Moving_badge = (n) => {
    if(badgeData === undefined) return;

    if(n) {
      badgeData.movingRight();
      setViewBadge(badgeData.print());
    } else {
      badgeData.movingLeft();
      setViewBadge(badgeData.print());
    }
  }

  return (
    <AnimationPage>
      <Body>
        <TitleDiv>
          <Title Colors="#FFF500, #FE0D7A">COIN</Title>
          <SubTitle>내 코인을 관리해보세요</SubTitle>
        </TitleDiv>
        <FlexDiv Justify="space-between" Display={display}>
          <PrintCoinGraph width={width} Info={coin} />
          <SectionDiv BColor="#111111" Width={width || "26%"} Padding="20px 10px 20px 10px" Align="center"
            Height="460px">
            <SubThings Colors="#999999" Weight="900" Size="18px" Margin="20px">보유 코인</SubThings>
            <ScrollDiv>
              {haveCoin.map((coin, index) =>
                <PrintCoin key={index} Info={coin} />
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
        <Pageing func={Moving_badge}/>
          {
            viewBadge !== undefined && 
            viewBadge.map((item) => 
              <Shop_view_detail key={item.id} data={item} />
            )
          }
        <Pageing type='right' func={Moving_badge}/>
      </Shop_view_box>
      <Body>
        <TitleDiv>
          <Title Colors="#35B2BA, #4E55D2">GITHUB</Title>
          <SubTitle>커밋 현황을 살펴보세요</SubTitle>
        </TitleDiv>
        <Github_view margin='200px' data={commit} />
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
  transition: 0.5s;

  &:hover {
    transform: scale(1.05);
  }
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
  transform: translateY(5px) rotate(-45deg);
  border-radius: 10px;
  cursor: pointer;
  overflow: visible;
  transition: 0.5s;
  transform-origin: left;

  &::after {
    content: '';
    height: 10px;
    width: 50px;
    display: block;
    background-color: #ffffff;
    border-radius: 10px;
    transform: translate(-21px, 21px) rotate(90deg);
  }

  &:hover {
    transform: translateY(5px) rotate(-45deg) scale(1.5);
  }
`

const Page_right_btn = styled.span`
  height: 10px;
  width: 50px;
  display: block;
  background-color: #ffffff;
  transform: translateX(50px) rotate(135deg);
  border-radius: 10px;
  cursor: pointer;
  overflow: visible;
  transition: 0.5s;
  transform-origin: left;
  
  &::after {
    content: '';
    height: 10px;
    width: 50px;
    display: block;
    background-color: #ffffff;
    border-radius: 10px;
    transform: translate(-21px, 21px) rotate(-90deg);
  }

  &:hover {
    transform: translateX(50px) rotate(135deg) scale(1.5);
  }
`

const Shop_view_detail = ({ data }) => {
  return (
    <Shop_view_detail_box data-id={data.id}>
      <Image width='260px' height='260px' radius='10px' alt='뱃지 이미지' src={data.badgeMainFile.fileUrl}/>
      <span>{data.name}</span>
      <span>{data.introduction}</span>
      <span>{data.price.toLocaleString('ko-KR')}원</span>
    </Shop_view_detail_box>
  )
}

const Pageing = ({ type = 'left', func}) => {
  return (
    <Pageing_box
      color={type == 'right' ? '#111111, rgba(17, 17, 17, 0)' : 'rgba(17, 17, 17, 0), #111111'}
      right={type == 'right' ? 0 : 'auto'}
    >
      {
        type == 'right' ?
          <Page_right_btn onClick={() => func(1)}/>
          :
          <Page_left_btn onClick={() => func(0)}/>
      }
    </Pageing_box>
  )
}