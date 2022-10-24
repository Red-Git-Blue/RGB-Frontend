import React from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const Page_button = styled.span`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #fff;
    cursor: pointer;
    border-radius: 100px;
    text-transform: uppercase;
    text-align: center;
    position: relative;
    text-decoration: none;
    display: inline-block;
    transition: 0.3s;
    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        display: block;
        background: #FFF500;
        -webkit-transform-origin: right top;
        -ms-transform-origin: right top;
        transform-origin: right top;
        -webkit-transform: scale(0,1);
        -ms-transform: scale(0,1);
        transform: scale(0,1);
        -webkit-transition: transform 0.4s cubic-bezier(1,0,0,1);
        transition: transform 0.4s cubic-bezier(1,0,0,1);
    }
    &:hover {
        transform: scale(1.1);
        color: #FFF500;
        &::before {
        -webkit-transform-origin: left top;
        -ms-transform-origin: left top;
        transform-origin: left top;
        -webkit-transform: scale(1,1);
        -ms-transform: scale(1,1);
        transform: scale(1,1);
        }
    }
`

const Header = () => {
    let navigate = useNavigate();
    return (
        <>
            <div style={{
                display: 'flex',
                width: '70%',
                height: '100px',
                fontStyle: 'normal',
                alignItems: 'center',
                padding: '0 15% 0 15%',
                justifyContent: 'space-between',
                background: 'rgba(0, 0, 0, 0.01)',
                backdropFilter: 'blur(120px)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                }} onClick={() => navigate('/')}>
                    <img src="Logo.png" width={'34px'} height={'30px'} />
                    <span style={{
                        fontFamily: 'Roboto',
                        fontWeight: '900',
                        fontSize: '20px',
                        lineHeight: '23px',
                        display: 'flex',
                        flexDirection: 'column',
                        color: '#fff',
                        marginLeft: '12px',
                    }}>RED GIT BLUE
                    </span>
                </div>
                <div style={{
                    width: '422px',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                }}>
                    <Page_button onClick={() => navigate('/coin')}>Coin</Page_button>
                    <Page_button onClick={() => navigate('/search')}>Search</Page_button>
                    <Page_button onClick={() => navigate('/shop')}>Shop</Page_button>
                    <Page_button onClick={() => navigate('/login')}>Login</Page_button>
                    <Page_button onClick={() => navigate('/signup')}>Sign Up</Page_button>
                </div>
            </div>
        </>
    );
}

export default Header;