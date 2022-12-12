import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import Header from "../../Auth/Header";
import { Line } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import 'chartjs-adapter-date-fns';
import { useState, useEffect } from "react";

const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [1, 2, 3, 4, 5]
        }
    ]
}

const options = {
    backgroundColor: '#fff',
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'day'
            }
        }
    },
}
const CoinDetailView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ChartDay, SetChartDay] = useState(1);
    const [coinData, SetCoin] = useState('');
    const [InfoNum, setInfoNum] = useState(1);
    
    const OnlyNumber = (e) => {
        SetCoin(e.target.value.replace(/[^0-9]/,''));
    }

    useEffect(() => {
        const GV = {
            sync1 : null,
            sync2 : null
        }
        const Main = document.querySelector('.ScrollMain');
        const auth = document.querySelector('.toScroll');

        Main.addEventListener('scroll', () => {
            if(GV.sync1 && GV.sync1.target.className != this.className) return false;
            GV.sync1 = this;
            auth.scrollLeft = Main.scrollLeft;
            if(GV.sync2) clearTimeout(GV.sync2);

            GV.sync2 = setTimeout(() => {
                if(Main.scrollLeft < 660) {
                    auth.scrollLeft = 0;
                    setInfoNum(1);
                } else {
                    auth.scrollLeft = 1320;
                    setInfoNum(2);
                }
                GV.sync1 = null;
                GV.sync2 = null;
            }, 300);
        });

        auth.addEventListener('scroll', () => {
            if(GV.sync1 && GV.sync1.target.className != this.className) return false;
            GV.sync1 = this;
            Main.scrollLeft = auth.scrollLeft;
            if(GV.sync2) clearTimeout(GV.sync2);

            GV.sync2 = setTimeout(() => {
                if(auth.scrollLeft < 660) {
                    Main.scrollLeft = 0;
                    setInfoNum(1);
                } else {
                    Main.scrollLeft = 1320;
                    setInfoNum(2);
                }
                GV.sync1 = null;
                GV.sync2 = null;
            }, 300);
        })
    }, [])

    return (
        <>
            <Header />
            <Box>
                <div>
                    <Before_btn onClick={() => navigate(-1)} />
                    <div>
                        <StyledSpan size='20px' height='23px'>hyunsuk</StyledSpan>
                        <StyledSpan weight='900' size='40px' height='47px'>1,492원</StyledSpan>
                        <StyledSpan size='14px' height='16px' color='#ff0000'>전일 대비 +320 (+27.3%)</StyledSpan>
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <Line data={data} options={options} />
                        </div>
                        <div>
                            <DayBtn bool={ChartDay === 1} onClick={() => ChartDay === 1 || SetChartDay(1)}>1일</DayBtn>
                            <DayBtn bool={ChartDay === 2} onClick={() => ChartDay === 2 || SetChartDay(2)}>1주</DayBtn>
                            <DayBtn bool={ChartDay === 3} onClick={() => ChartDay === 3 || SetChartDay(3)}>1달</DayBtn>
                            <DayBtn bool={ChartDay === 4} onClick={() => ChartDay === 4 || SetChartDay(4)}>1년</DayBtn>
                            <DayBtn bool={ChartDay === 5} onClick={() => ChartDay === 5 || SetChartDay(5)}>최대</DayBtn>
                        </div>
                    </div>
                    <div>
                        <StyledSpan color="#FFF500">TRADING</StyledSpan>
                        <StyledSpan weight='900' size='32px' height='38px' margin='20px 0 10px 0'>0원</StyledSpan>
                        <StyledSpan color='#888888' margin='0 0 136px 0'>0코인</StyledSpan>
                        <div>
                            <CoinInput value={coinData} placeholder='0' onChange={(e) => OnlyNumber(e)} />
                            <StyledSpan weight='400' size='20px' height='23px'>코인</StyledSpan>
                        </div>
                        <StyledSpan font='NanumGothic' height='18px' margin='20px 0' color='#888888'>0원 보유중</StyledSpan>
                        <div>
                            <BuyBtn color={coinData !== '' ? '#FF0000' : undefined}>매수</BuyBtn>
                            <BuyBtn color={coinData !== '' ? '#0038FF' : undefined}>매도</BuyBtn>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <InfoBtn
                            bool={InfoNum === 1}
                            onClick={() => {
                                if(InfoNum === 2) {
                                    setInfoNum(1);
                                    document.querySelector('.ScrollMain').scrollLeft = 0;
                                }
                            }}>
                                상세 정보
                            </InfoBtn>
                        <InfoBtn
                            bool={InfoNum === 2}
                            onClick={() => {
                                if(InfoNum === 1) {
                                    setInfoNum(2);
                                    document.querySelector('.ScrollMain').scrollLeft = 1320;
                                }
                            }}>
                                보유 정보
                            </InfoBtn>
                    </div>
                    <div className="toScroll">
                        <div></div>
                    </div>
                    <div className="ScrollMain">
                        <div>
                            <DetailContent title='전일종가' text='1,172원'/>
                            <DetailContent title='개장가' text='1,172원'/>
                            <DetailContent title='최고가' text='25,627,289원' color='#FF0000'/>
                            <DetailContent title='최저가' text='2원' color='#0038FF'/>
                            <DetailContent title='거래량' text='52.2조'/>
                            <DetailContent title='고인상장일자' text='1950-06-25'/>
                        </div>
                        <div>
                            <DetailContent title='평가액' text='152,894원' subText='원금 500,000원' />
                            <DetailContent title='보유량' text='10코인'/>
                            <DetailContent title='평단가' text='51,340원'/>
                            <DetailContent title='총 수익' text='+12,000원' subText='(+4.2%)' color='#FF0000'/>
                            <DetailContent title='일간 수익' text='+3,420원' subText='(+1.6%)' color='#FF0000'/>
                        </div>
                    </div>
                </div>
            </Box>
        </>
    )
}

export default CoinDetailView;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    & > div {
        width: 1320px;
        &:first-child {
            & > div {
                font-family: 'Roboto';
                font-style: normal;
                color: #ffffff;
                display: flex;
                flex-direction: column;
            }
        }
        &:nth-child(2) {
            height: 450px;
            margin: 20px 0;
            display: flex;
            justify-content: space-between;
            & > :first-child {
                width: 1000px;
                height: 450px;
                display: flex;
                flex-direction: column;
                align-items: flex-end;

                & > :first-child {
                    width: 960px;
                    height: 360px;
                    background: #111111;
                    border-radius: 20px;
                    padding: 20px;
                }
                & > :last-child {
                    width: 370px;
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                }
            }
            & > :last-child {
                width: 280px;
                height: 450px;
                display: flex;
                flex-direction: column;
                & > div {
                    width: 280px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            }
        }
        &:last-child {
            display: flex;
            flex-direction: column;
            & > div {
                &:first-child {
                    width: 214px;
                    display: flex;
                    justify-content: space-between;
                }
                &:nth-child(2) {
                    margin: 19px 0 59px;
                    min-width: 1320px;
                    height: 2px;
                    overflow-x: scroll;
                    overflow-y: hidden;
                    scroll-behavior: smooth;
                    &::-webkit-scrollbar {
                        height: 2px;
                        border-radius: 6px;
                        background: #333333;
                    }
                    &::-webkit-scrollbar-thumb {
                        background: #FFF500;
                        border-radius: 6px;
                    }
                    & > div {
                        width: 2640px;
                        height: 75px;
                        overflow-x: scroll;
                        overflow-y: hidden;
                    }
                }
                &:last-child {
                    min-width: 1320px;
                    height: 80px;
                    display: flex;
                    overflow-x: scroll;
                    scroll-behavior: smooth;
                    &::-webkit-scrollbar {
                        display: none;
                    }
                    & > div {
                        min-width: 1320px;
                        height: 75px;
                        display: flex;
                        &:first-child > div {
                            width: 240px;
                        }
                        &:last-child > div {
                            width: 220px;
                        }
                    }
                }
            }
        }
    }
`


const Before_btn = styled.span`
  height: 4px;
  width: 20px;
  display: block;
  background-color: #ffffff;
  transform: translate(-100px, 60px) rotate(-45deg);
  border-radius: 10px;
  cursor: pointer;
  overflow: visible;
  transition: 0.5s;
  transform-origin: left;

  &::after {
    content: '';
    height: 4px;
    width: 20px;
    display: block;
    background-color: #ffffff;
    border-radius: 10px;
    transform: translate(-8px, 8px) rotate(90deg);
  }

  &:hover {
    transform: translate(-100px, 60px) rotate(-45deg) scale(2);
  }
`

const StyledSpan = styled.span`
    font-family: ${(props) => props.font || 'Roboto'};
    font-style: normal;
    font-weight: ${(props) => props.weight || '700'};
    font-size: ${(props) => props.size || '16px'};
    line-height: ${(props) => props.height || '19px'};
    color: ${(props) => props.color || '#FFFFFF'};
    margin: ${(props) => props.margin || '0 0 0 0'};
`

const CoinInput = styled.input`
    width: 180px;
    height: 50px;
    background: #222222;
    border-radius: 100px;
    border: none;
    outline: none;
    padding: 0 20px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #FFFFFF;
    text-align: center;

    &:focus {
        box-shadow: 0 0 5px #ffffff;
    }
`

const BuyBtn = styled.div`
    width: 130px;
    height: 50px;
    background: ${(props) => props.color || '#333333'};
    color: ${(props) => props.color ? '#FFFFFF' : '#888888'};
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    transition: 0.4s;
    ${(props) => props.color && `
        cursor: pointer;
        &:hover {
            transform: scale(1.1);
        }
    `}
`

const DayBtn = styled.div`
    width: 60px;
    height: 30px;
    background: #222222;
    color: #888888;
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'NanumGothic';
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 17px;
    cursor: pointer;

    ${(props) => props.bool && `
        background: #ffffff;
        color: #000000;
    `}

    transition: 0.3s;
    &:hover {
        transform: scale(1.1);
    }
`

const InfoBtn = styled(DayBtn)`
    width: 97px;
    height: 30px;
    border-radius: 10px;

    ${(props) => props.bool && `
        background: #FFF500;
        color: #000000;
    `}
`

const DetailContent = ({title, text, subText, color = '#FFFFFF'}) => {
    return (
        <ContentBox color={color}>
            <span>{title}</span>
            <span>{text}</span>
            <span>{subText}</span>
        </ContentBox>
    )
}

const ContentBox = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    & > :nth-child(1) {
        font-size: 16px;
        line-height: 19px;
        color: #888888;
    }
    & > :nth-child(2) {
        font-size: 24px;
        line-height: 28px;
        margin: 6px 0;
        color: ${(props) => props.color};
    }
    & > :nth-child(3) {
        font-size: 14px;
        line-height: 16px;
        ${(props) => props.color === '#FFFFFF' ?
        `
            color: #666666;
        `
        :
        `
            font-weight: 400;
            color: ${props.color};
        `
    }
    }
`