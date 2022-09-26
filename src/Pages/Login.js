import React from "react";
import styled from "styled-components";

const Login_box = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    font-family: Roboto;
    font-style: normal;
`
const Title = styled.span`
    background: linear-gradient(90deg, #00CEFF 0%, #0075FF 100%);
    background-clip: text;
    -webkit-background-clip: text;
    text-fill-color: transparent;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
    font-size: 40px;
    line-height: 94px;
    margin-bottom: 30px;
`

const Sub_title = styled.span`
    font-weight: 700;
    font-size: 20px;
    line-height: 46px;
    margin-top: 30px;
    color: #fff;
`

const Input_box = styled.input`
    height: 60px;
    width: 400px;
    outline: none;
    border-radius: 64px;
    border: 2px solid transparent;
    background-image: linear-gradient(#414852, #414852), linear-gradient(90deg, #00CEFF 0%, #0075FF 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
    -webkit-background-clip: content-box, border-box;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: #fff;
`

const Button_box = styled.button`
    height: 60px;
    width: 400px;
    outline: none;
    border-radius: 64px;
    border: 2px solid transparent;
    background-image: linear-gradient(transparent, transparent), linear-gradient(90deg, #00CEFF 0%, #0075FF 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
    -webkit-background-clip: content-box, border-box;
    margin-top: 100px;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #fff;
`

const LoginView = () => {
    return (
        <>
        <div style={{display:"flex"}}>
            <div style={{
                height:'100vh',
                width:'936px',
                backgroundImage: "url('background-1.png')",
                display:'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
                <img src="./Logo.png" width={'150px'} height={'150px'} />
                <span style={{
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: '900',
                    fontSize: '40px',
                    lineHeight: '47px',
                    color: '#fff',
                }}>WELCOME TO</span>
                <span style={{
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '32px',
                    lineHeight: '38px',
                    letterSpacing: '-0.04em',
                    background: 'linear-gradient(90deg, #00CEFF 0%, #0075FF 100%)',
                    backgroundClip: 'text',
                    webkitBackgroundClip: 'text',
                    textFillColor: 'transparent',
                    webkitTextFillColor: 'transparent',
                }}>STUDY OF STOCKS</span>
            </div>
            <div style={{
                width:'600px',
                background: 'linear-gradient(180deg, #414852 0%, #24272D 100%)',
            }}>
                <Login_box>
                    <Title>LOGIN</Title>
                    <Sub_title>아이디</Sub_title>
                    <Input_box />
                    <Sub_title>비밀번호</Sub_title>
                    <Input_box />
                    <Button_box>로그인</Button_box>
                </Login_box>
            </div>
        </div>
        </>
    )
}

export default LoginView;