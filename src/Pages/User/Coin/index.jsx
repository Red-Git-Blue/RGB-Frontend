import { useState } from "react";
import styled from "styled-components";
import { Image } from "../../../styleds";
import { Doughnut } from 'react-chartjs-2';
import Chart from "chart.js/auto";

  const DATA_COUNT = 5;
  const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

  const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [1, 2, 3, 4, 5]
      }
    ]
  }
const CoinView = () => {
    const [Btn_click, Set_click] = useState(1);
    const dummyData = [
        {src: '/image/Profile.jpg', name: "HYUNSUK", money: "+12,000 (+4.2%)", Coin: "134,156,932,534", price: "152,894", rate: '750%' },
        {src: '/image/Profile.jpg', name: "HYUNSUK", money: "-12,000 (+4.2%)", Coin: "134,156,932,534", price: "152,894", rate: '750%' },
        {src: '/image/Profile.jpg', name: "HYUNSUK", money: "+12,000 (+4.2%)", Coin: "134,156,932,534", price: "152,894", rate: '750%' },
        {src: '/image/Profile.jpg', name: "HYUNSUK", money: "+12,000 (+4.2%)", Coin: "134,156,932,534", price: "152,894", rate: '750%' },
        {src: '/image/Profile.jpg', name: "HYUNSUK", money: "-12,000 (+4.2%)", Coin: "134,156,932,534", price: "152,894", rate: '750%' },
        {src: '/image/Profile.jpg', name: "HYUNSUK", money: "+12,000 (+4.2%)", Coin: "134,156,932,534", price: "152,894", rate: '750%' },
        {src: '/image/Profile.jpg', name: "HYUNSUK", money: "+12,000 (+4.2%)", Coin: "134,156,932,534", price: "152,894", rate: '750%' },
        {src: '/image/Profile.jpg', name: "HYUNSUK", money: "+12,000 (+4.2%)", Coin: "134,156,932,534", price: "152,894", rate: '750%' },
        {src: '/image/Profile.jpg', name: "HYUNSUK", money: "+12,000 (+4.2%)", Coin: "134,156,932,534", price: "152,894", rate: '750%' },
        {src: '/image/Profile.jpg', name: "HYUNSUK", money: "+12,000 (+4.2%)", Coin: "134,156,932,534", price: "152,894", rate: '750%' },
    ]

    return (
        <Out_box>
            {Btn_click === 1 ?
                <>
                    <AuthPage_btn_box>
                        <AuthPage_btn
                            background='#FFF500'
                            color="#000000"
                            onClick={(() => Set_click(-Btn_click))}
                        >
                            코인
                        </AuthPage_btn>
                        <AuthPage_btn onClick={(() => Set_click(-Btn_click))} >순위</AuthPage_btn>
                    </AuthPage_btn_box>
                    <My_coin_box>
                        <div>
                            <div>
                                <span>내 재산</span>
                                <span>93,235,423,124원</span>
                                <span>+2,429,371 (+53%)</span>
                            </div>
                            <div>
                                <MyCoinDetail />
                                <MyCoinDetail bool={true} />
                                <MyCoinDetail />
                                <MyCoinDetail />
                                <MyCoinDetail />
                                <MyCoinDetail />
                                <MyCoinDetail />
                                <MyCoinDetail />
                            </div>
                        </div>
                        <div>
                            <Doughnut data={data}/>
                        </div>
                    </My_coin_box>
                    <AuthCoinBox>
                        <AuthCoinDetail title='추천 코인' text='Recommended coin' />
                        <AuthCoinDetail title='상승 코인' text='rise coin' />
                        <AuthCoinDetail title='하락 코인' text='fell coin' />
                    </AuthCoinBox>
                </>
                :
                <>
                    <AuthPage_btn_box>
                        <AuthPage_btn onClick={(() => Set_click(-Btn_click))}>코인</AuthPage_btn>
                        <AuthPage_btn
                            background='#FFF500'
                            color="#000000"
                            onClick={(() => Set_click(-Btn_click))}
                        >
                            순위
                        </AuthPage_btn>
                    </AuthPage_btn_box>
                    <RankBox>
                        <span>자금 TOP 10</span>
                        <div>
                            {
                                dummyData.map((item, index) => <RankDetail key={index} data={item} index={index} />)
                            }
                        </div>
                    </RankBox>
                </>
            }
        </Out_box>
    )
}

export default CoinView;

const Out_box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0 210px 0;
`

const AuthPage_btn_box = styled.div`
    width: 1320px;
    display: flex;
    justify-content: flex-start;
    div:first-child {
        margin-right: 20px;
    }
`

const AuthPage_btn = styled.div`
    width: 77px;
    height: 40px;
    border-radius: 100px;
    background: ${(props) => props.background || '#222222'};
    color: ${(props) => props.color || '#999999'};
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
    &:hover {
        transform: scale(1.05);
    }
`

const My_coin_box = styled.div`
    width: 1320px;
    height: 885px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    margin: 30px 0 72px 0;
    display: flex;
    & > div {
        display: flex;
        justify-content: space-between;
        &:first-child {
            width: 918px;
            display: flex;
            flex-direction: column;
            & > div:first-child {
                display: flex;
                flex-direction: column;
                & > span {
                    &:nth-child(1) {
                        color: #888888;
                    }
                    &:nth-child(2) {
                        font-weight: 900;
                        font-size: 40px;
                        line-height: 47px;
                        color: #ffffff;
                        margin: 10px 0 6px 0;
                    }
                    &:nth-child(3) {
                        font-size: 16px;
                        line-height: 19px;
                        color: #ff0000;
                    }
                }
            }
            & > div:last-child {
                margin-top: 40px;
                width: 918px;
                height: 740px;
                border-radius: 20px;
                overflow: scroll;
            }
        }
        &:last-child {
            width: 340px;
        }
    }
`

const MyCoinDetail = ({ bool = false }) => {
    return (
        <MyCoinDetailBox bool={bool}>
            <MyCoinDetailUserBox color="#0094FF">
                <div>
                    <Image src='/image/Profile.jpg' width='30px' height='30px' radius='30px' />
                    <span>HYUNSUK</span>
                </div>
                <span>80.00%</span>
                <span>평가액 146,291원</span>
            </MyCoinDetailUserBox>
            <MyCoinDetailChartBox>
                <Image src='/image/TestChart.png' width='420px' height='90px' />
                <div>
                    <span>1,492</span>
                    <span>+320 (+21%)</span>
                </div>
            </MyCoinDetailChartBox>
        </MyCoinDetailBox>
    )
}

const MyCoinDetailBox = styled.div`
    width: 888px;
    height: 120px;
    margin-bottom: 20px;
    background: #001708;
    border-radius: 20px;
    padding: 11px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    border: 4px solid #001708;
    color: #ffffff;
    transition: 0.3s;
    cursor: pointer;

    ${(props) => props.bool && `
        background: #000E18;
        border: 4px solid #0094FF;
        box-shadow: 0px 0px 100px rgba(0, 148, 255, 0.5);
    `
    }

    &:hover {
        background: #000E18;
        border: 4px solid #0094FF;
    }
`

const MyCoinDetailUserBox = styled.div`
    margin-left: 25px;
    display: flex;
    flex-direction: column;
    & > :nth-child(1) {
        display: flex;
        align-items: center;
        & > :first-child{
            margin-right: 10px;
        }
    }
    & > :nth-child(2) {
        margin: 6px 0;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
    }
    & > :nth-child(3) {
        color: ${(props) => props.color || '#ffffff'}
    }
`

const MyCoinDetailChartBox = styled.div`
    width: 550px;
    height: 120px;
    background: linear-gradient(270deg, #000000 0%, rgba(0, 23, 22, 0) 100%);
    border-radius: 20px;
    padding: 0 30px 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    & > div:last-child {
        display: flex;
        flex-direction: column;
        text-align: right;
        & > span:last-child {
            font-size: 12px;
            line-height: 14px;
            margin-top: 10px;
            color: ${(props) => props.color ? '#0000FF' : '#ff0000'}
        }
    }
`

const AuthCoinBox = styled.div`
    width: 1320px;
    height: auto;
    display: flex;
    justify-content: space-between;
`

const AuthCoinDetail = ({title, text, data = [1,2,3,4,5,6,7,8,9,10]}) => {
    
    return (
        <AuthCoinDetailBox>
            <div>
                <span>{title}</span>
                <span>{text}</span>
            </div>
            <div>
                {
                    data.map((item, index) => 
                        <AuthCoinDetailInBox key={index} data={item} index={index} />
                    )
                }
            </div>
        </AuthCoinDetailBox>
    )
}

const AuthCoinDetailBox = styled.div`
    width: 400px;
    height: auto;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;
    & > div {
        display: flex;
        flex-direction: column;
        &:first-child {
            display: flex;
            flex-direction: column;
            & > :last-child {
                margin: 10px 0 30px;
                font-weight: 900;
                font-size: 24px;
                line-height: 28px;
                text-transform: uppercase;
                color: #888888;
            }
        }
        &:last-child {
            width: 380px;
            height: auto;
            padding: 10px;
            background: #111111;
            border-radius: 20px;
        }
    }
`

const AuthCoinDetailInBox = ({data, index}) => {
    const Color = ['#FFFFFF', '#999999', '#666666', '#444444', '#222222'];

    return (
        <AuthCoinDetailStyled
            color={index < 5 ? Color[index] : '#000000'}
            UpDown='#ff0000'    
        >
            <div>
                <Image src='/image/Profile.jpg' width='35px' height='35px' radius='35px' />
                <div>
                    <span>peach&niga</span>
                    <span>박준하</span>
                </div>
            </div>
            <div>
                <span>23,904</span>
                <span>+12.8%</span>
            </div>
        </AuthCoinDetailStyled>
    )
}

const AuthCoinDetailStyled = styled.div`
    width: 340px;
    height: 35px;
    padding: 20px;
    background: ${(props) => props.color};
    backdrop-filter: blur(120px);
    border-radius: 20px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    & > div {
        display: flex;
        &:first-child div {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            & > :first-child {
                font-size: 14px;
                line-height: 16px;
                color: ${(props) => props.color=='#FFFFFF' ? '#000000' : '#ffffff'};
            }
            & > :last-child {
                font-weight: 400;
                font-size: 12px;
                line-height: 14px;
                color: #828282;
                margin-top: 5px;
            }
        }
        &:last-child {
            flex-direction: column;
            text-align: right;
            & > :first-child {
                font-size: 14px;
                line-height: 16px;
                color: ${(props) => props.color=='#FFFFFF' ? '#000000' : '#ffffff'};
            }
            & > :last-child {
                font-weight: 400;
                font-size: 12px;
                line-height: 14px;
                color: ${(props) => props.UpDown};
                margin-top: 5px;
            }
        }
    }
`

const RankBox = styled.div`
    width: 1320px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 900;
    font-size: 40px;
    line-height: 47px;
    display: flex;
    flex-direction: column;
    color: #FFFFFF;
    margin-top: 60px;
    & > div {
        margin-top: 40px;
    }
`

const RankDetail = ({data, index}) => {
    const Shadow = ['#FFD600', '#DEE8ED', '#C17C3C'];
    return (
        <RankDetailBox Shadow={index < 3 ? Shadow[index] : false}>
            <RankDetailUser>
                <div>
                    <Image src={data.src} width='30px' height='30px' radius='30px' />
                    <span>{data.name}</span>
                </div>
                <span>{data.Coin}원</span>
                <span>수익률 {data.rate}</span>
            </RankDetailUser>
            <RankDetailInfo color={index < 3 ? Shadow[index] : false} index={index + 1} >
                <span>TOP {index + 1}</span>
                <MyCoinDetailChartBox color={data.money.includes('-') === true}>
                    <Image src='/image/TestChart.png' width='420px' height='90px' />
                    <div>
                        <span>{data.price}</span>
                        <span>{data.money}</span>
                    </div>
                </MyCoinDetailChartBox>
            </RankDetailInfo>
        </RankDetailBox>
    )
}

const RankDetailBox = styled.div`
    width: 1265px;
    height: 120px;
    background: ${(props) => props.Shadow ? '#000000' : '#222222'};
    border: 2px solid ${(props) => props.Shadow ? '#ffffff' : '#222222'};
    box-shadow: ${(props) => props.Shadow ? `0px 0px 20px ${props.Shadow}` : 'none'};
    margin-top: 20px;
    border-radius: 20px;
    padding: 13px 13px 13px 38px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const RankDetailUser = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    & > div {
        display: flex;
        align-items: center;
        & > span {
            margin-left: 10px;
        }
    }
    & > span {
        margin-top: 6px;
        &:nth-child(2) {
            font-size: 24px;
            line-height: 28px;
        }
        &:nth-child(3) {
            color: #FFF500;
        }
    }
`

const RankDetailInfo = styled.div`
    display: flex;
    align-items: center;
    & > span:first-child {
        font-weight: 900;
        font-size: 64px;
        line-height: 75px;
        opacity: ${(props) => props.color ? '0.3' : '0.1'};
        color: ${(props) => props.color || '#FFFFFF'};
        margin-right: ${(props) => props.index === 10 ? '63px' :'100px'};
    }
`