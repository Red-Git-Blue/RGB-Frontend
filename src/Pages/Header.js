import React from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const Page_button = styled.span`
    font-family: 'NanumGothic';
    font-weight: 600;
    font-size: 18px;
    line-height: 32px;
    color: #ffffff;
    cursor: pointer;
    border-radius: 100px;
    transition: 0.3s;
    &:hover {
        background: linear-gradient(90deg, #00CEFF 0%, #0075FF 100%);
        background-clip: text;
        -webkit-background-clip: text;
        text-fill-color: transparent;
        -webkit-text-fill-color: transparent;
        transform: scale(1.05);
    }
`

const Header = () => {
    let navigate = useNavigate();
    return (
        <>
            <div style={{
                display: 'flex',
                background: '#000',
                width: '80vw',
                height: '100px',
                fontStyle: 'normal',
                alignItems: 'center',
                padding: '0 10% 0 10%',
                justifyContent: 'space-between',
                boxShadow: '0px 1000px 5px 100px #ccc'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                }} onClick={() => navigate('/')}>
                    <img src="Logo.png" width={'70px'} height={'70px'} />
                    <div style={{
                        fontFamily: 'Roboto',
                        fontWeight: '900',
                        fontSize: '18px',
                        lineHeight: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        color: '#fff',
                        marginLeft: '10px',
                    }}>
                        <span>STUDY OF</span>
                        <span>STOCKS</span>
                    </div>
                </div>
                <div style={{
                    width: '170px',
                    display: 'flex',
                    justifyContent: 'space-around',
                }}>
                    <Page_button onClick={() => navigate('/login')}>로그인</Page_button>
                    <Page_button onClick={() => navigate('/signup')}>회원가입</Page_button>
                </div>
            </div>
        </>
    );
}

export default Header;