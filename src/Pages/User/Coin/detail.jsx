import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import Header from "../../Auth/Header";
import { Line } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import 'chartjs-adapter-date-fns';
import { useState } from "react";

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

    const OnlyNumber = (e) => {
        SetCoin(e.target.value.replace(/[^0-9]/,''));
    }
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
                            <BuyBtn color={coinData !== '' ? '#FF0000' : false}>매수</BuyBtn>
                            <BuyBtn color={coinData !== '' ? '#0038FF' : false}>매도</BuyBtn>
                        </div>
                    </div>
                </div>
                <div>

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