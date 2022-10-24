import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

export const Login_box = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-family: Roboto;
    font-style: normal;
    width: 30vw;
    min-width: 600px;
    height: 90vh;
    padding: 5vh 0;
`
export const Title = styled.span`
    font-family: 'NanumGothic';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;

    text-transform: uppercase;

    color: #FFFFFF;
`
export const Out_box = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
`

export const Sub_title = styled.span`
    font-family: 'NanumGothic';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;

    color: #fff;

    text-align: left;
    margin: 0 0 13px 24px;
`

export const Input_box = styled.input`
    width: 382px;
    height: 40px;

    background: transparent;
    border: 1px solid #FFFFFF;
    border-radius: 64px;
    padding: 0 24px 0 24px;

    font-family: 'NanumGothic';
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 17px;
    color: #fff;

    text-align: left;
    margin-bottom: 10px;
`

export const Button_box = styled.button`
    width: 430px;
    height: 50px;
    outline: none;
    border-radius: 64px;
    border: 1px solid #ffffff;
    background: ${(props) => props.background || '#FFFFFF'};
    color: ${(props) => props.color || '#000000'};
    margin-top: ${(props) => props.top || '20px'};;

    font-family: 'NanumGothic';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        transform: scale(1.05);
    }
`

export const Blur_box = styled.div`
    position: absolute;
    min-width: ${(props) => props.width || '1074px'};
    min-height: ${(props) => props.height || '638px'};

    background: rgba(0, 0, 0, 0.01);
    backdrop-filter: blur(120px);

    border-radius: 20px;
`

export const Input_view = ({ name, text }) => {
    return (
        <Out_box>
            <Sub_title>{name}</Sub_title>
            <Input_box type={'text'} placeholder={text} />
        </Out_box>
    )
}

export const Auth_page = ({ string, name, move }) => {
    let navigate = useNavigate();
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '20px'
        }}>
            <span style={{
                fontFamily: 'NanumGothic',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '16px',
                color: '#fff',
                marginRight: '20px'
            }}>{string}</span>
            <span style={{
                fontFamily: 'NanumGothic',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: '18px',
                lineHeight: '21px',
                color: '#FFF500',
                cursor: 'pointer',
                display: 'block',
            }} onClick={() => navigate(move)}>{name} &gt;</span>
        </div>
    )
}

export const Background_view = styled.div`
    width: 100%;
    height: 100%;
    background: url('background.png');
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
`

export const Ls_btn = ({ click, string, name, sub_name, move }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Auth_page string={string} name={name} move={move} />
            <Button_box onClick={() => click()}>{sub_name}</Button_box>
        </div>
    )
}

export const Left_box = ({title, text1, text2, text3, text4, link}) => {
    return (
        <Set_box>
            <Text bottom='30px'>{title}</Text>
            <Text bottom='10px'>{text1}</Text>
            <Text weight='400' size='18px' height='21px' bottom='60px'>{text2}</Text>
            <Auth_page string={text3} name={text4} move={link} />
        </Set_box>
    )
}

export const Right_box = styled.div`
    width: 430px;
    display: flex;
    flex-direction: column;
`

const Set_box = styled.div`
    font-family: 'NanumGothic';
    font-style: normal;
    display: flex;
    flex-direction: column;
    width: 444px;
`

const Text = styled.span`
    font-weight: ${(props) => props.weight || '700'};;
    font-size: ${(props) => props.size || '24px'};
    line-height: ${(props) => props.height || '28px'};
    margin-bottom: ${(props) => props.bottom || '0px'};

    text-transform: uppercase;

    color: #FFFFFF;
`