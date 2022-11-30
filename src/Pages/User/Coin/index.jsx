import { useState } from "react";
import styled from "styled-components";

const CoinView = () => {
    const [Btn_click, Set_click] = useState(1);

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
                                <My_coin_detail_box bool={false}></My_coin_detail_box>
                                <My_coin_detail_box bool={true}></My_coin_detail_box>
                                <My_coin_detail_box bool={false}></My_coin_detail_box>
                                <My_coin_detail_box bool={false}></My_coin_detail_box>
                                <My_coin_detail_box bool={false}></My_coin_detail_box>
                            </div>
                        </div>
                        <div>

                        </div>
                    </My_coin_box>
                    <AuthCoin_box>

                    </AuthCoin_box>
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
            }
        }
        &:last-child {
            width: 340px;
        }
    }
`

const My_coin_detail_box = styled.div`
    width: 918px;
    height: 150px;
    margin-bottom: 20px;
    background: #001708;
    border-radius: 20px;
    ${(props) => props.bool && `
        width: 910px;
        height: 142px;
        background: #000E18;
        border: 4px solid #0094FF;
        box-shadow: 0px 0px 100px rgba(0, 148, 255, 0.5);
    `
    }
`

const AuthCoin_box = styled.div`

`