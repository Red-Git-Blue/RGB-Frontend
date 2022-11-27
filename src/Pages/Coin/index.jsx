import { useState } from "react";
import styled from "styled-components";

const CoinView = () => {
    const [Btn_click, Set_click] = useState(1);

    return (
        <Out_box>
            <AuthPage_btn_box>
                {Btn_click === 1 ?
                    <AuthPage_btn
                    background='#FFF500'
                    color="#000000"
                    onClick={(() => Set_click(-Btn_click))}
                    >
                        코인
                    </AuthPage_btn>
                    :
                    <AuthPage_btn onClick={(() => Set_click(-Btn_click))}>코인</AuthPage_btn>
                }
                {Btn_click === -1 ?
                <AuthPage_btn
                background='#FFF500'
                color="#000000"
                onClick={(() => Set_click(-Btn_click))}
                >
                    순위
                </AuthPage_btn>
                :
                <AuthPage_btn onClick={(() => Set_click(-Btn_click))} >순위</AuthPage_btn>
                }
            </AuthPage_btn_box>
            <My_money_box>

            </My_money_box>
            <AuthCoin_box>

            </AuthCoin_box>
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
`

const My_money_box = styled.div`
    
`

const AuthCoin_box = styled.div`

`