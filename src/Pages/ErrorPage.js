import React from "react";
import styled from "styled-components";

const Text = styled.span`
    font-family: Roboto;
    font-style: normal;
    font-weight: 900;
    font-size: 40px;
    line-height: 47px;
`

const ErrorPage = () => {
    return (
        <>
            <div style={{
                width: '100vw',
                boxShadow: '0 0 100px 3vh #00CEFF',
                position: "fixed",
                top: '0',
            }}></div>
            <div style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <img src="./Logo.png" width={'150px'} height={'150px'} />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text>404오류입니다!</Text>
                    <Text>페이지가 존재하지 않거나</Text>
                    <Text>잘못된 페이지입니다!</Text>
                </div>
                <div style={{
                    width: '100vw',
                    boxShadow: '0 0 100px 3vh #0075FF',
                    position: "fixed",
                    bottom: '0',
                }}></div>
            </div>
        </>
    );
}

export default ErrorPage;