import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Login_box = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    font-family: Roboto;
    font-style: normal;
    width: 30vw;
`
const Title = styled.span`
    background: linear-gradient(90deg, #00CEFF 0%, #0075FF 100%);
    background-clip: text;
    -webkit-background-clip: text;
    text-fill-color: transparent;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
    font-size: 40px;
    line-height: 47px;
    margin: 10vh 0 7vh 0;
`
const Out_box = styled.div`
    display: flex;
    flex-direction: column;
`

const Sub_title = styled.span`
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    margin: 35px 0 10px 0;
    color: #fff;
    text-align: left;
`

const Input_box = styled.input`
    height: 60px;
    width: 360px;
    outline: none;
    background: url(input-login.png);
    background-size: cover;
    border-radius: 64px;
    border:none;
    padding: 0 20px 0 20px;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: #fff;
    text-align: left;
`

const Button_box = styled.button`
    height: 60px;
    width: 400px;
    outline: none;
    border-radius: 64px;
    border:none;
    background: linear-gradient(90deg, #00CEFF 0%, #0075FF 100%);
    margin-top: 17px;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    z-index: 1;
    color: #fff;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        transform: scale(1.05);
    }
`

const Input_view = ({name}) => {
    return (
        <Out_box>
        <Sub_title>{name}</Sub_title>
        <Input_box type={'text'} placeholder={`${name}를 입력해주세요`}/>
        </Out_box>
    )
} 

const Auth_page = ({string, name, move}) => {
    let navigate = useNavigate();
    return (
        <div style={{
            display: 'flex'
        }}>
            <span style={{
                fontFamily: 'NanumGothic',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '18px',
                lineHeight: '21px',
                color: '#fff',
                marginRight: '10px'
            }}>{string}</span>
            <span style={{
                fontFamily: 'NanumGothic',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: '18px',
                lineHeight: '21px',
                background: 'linear-gradient(90deg, #00CEFF 0%, #0075FF 100%)',
                backgroundClip: 'text',
                webkitBackgroundClip: 'text',
                textFillColor: 'transparent',
                webkitTextFillColor: 'transparent',
                cursor: 'pointer',
                display: 'block',
                zIndex: '3',
                }} onClick={() => navigate(move)}>{name} &gt;</span>
        </div>
    )
}

const Background_view = () => {
    let navigate = useNavigate();
    return (
        <div style={{
            height:'100vh',
            width:'70vmax',
            backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('background-1.png')",
            backgroundSize: "cover",
            display:'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                cursor: 'pointer'
            }} onClick={() => navigate('/')}>
            <img src="./Logo.png" width={'200px'} height={'200px'} />
            <span style={{
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '900',
                fontSize: '3rem',
                lineHeight: '47px',
                color: '#fff',
            }}>WELCOME TO</span>
            <span style={{
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '2.5rem',
                lineHeight: '38px',
                letterSpacing: '-0.04em',
                background: 'linear-gradient(90deg, #00CEFF 0%, #0075FF 100%)',
                backgroundClip: 'text',
                webkitBackgroundClip: 'text',
                textFillColor: 'transparent',
                webkitTextFillColor: 'transparent',
            }}>STUDY OF STOCKS</span>
            </div>
        </div>
    );
}

const Ls_btn = ({click, string, name, sub_name, move}) => {
    return (
        <div style={{
            position: 'absolute',
            bottom: '10vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Auth_page string={string} name={name} move={move}/>
            <Button_box onClick={() => click()}>{sub_name}</Button_box>
        </div>
    )
}

export { Background_view, Input_view, Login_box, Title, Out_box, Sub_title, Input_box, Button_box , Auth_page, Ls_btn};