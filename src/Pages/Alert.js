import React from "react";
import styled from "styled-components";

const Box = styled.div`
    width: 400px;
    height: 120px;
    border: 0;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 0 7px 2px #00CEFF;
    position: fixed;
    top: 20px;
    left: calc(50% - 200px);
    z-index: 10;
`

const Text = styled.span`
    width: 360px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 900;
    font-size: 20px;
    line-height: 21px;
    color: #000;
    position: absolute;
    top: 20px;
    left: 20px;
    word-wrap: break-word;
`

const Button = styled.button`
    width: ${ (props) => props.width || '50px'};
    height: 50px;
    background: ${ (props) => props.color || 'rgb(230, 43, 43)'};
    border: 0;
    border-radius: 10px;
    position: absolute;
    bottom: 10px;
    right: ${ (props) => props.right ||'90px'};
    font-family: 'NanumGothic';
    font-style: normal;
    font-weight: 900;
    font-size: 25px;
    line-height: 21px;
    color: #fff;
    cursor: pointer;
    z-index: 3;
    transition: 0.3s;
    &:hover {
        transform: scale(1.05);
    }
`

const Time_bar = styled.div`
    width: 400px;
    height: 7px;
    background: #1a69cf;
    box-shadow: 0 0 5px 1px #0075FF;
    border-radius: 0 0 10px 10px;
    position: absolute;
    bottom: 8px;
    left: 0px;
`

const Alert = ({string, type = 'info'}) => {
    return (
        <Box>
            <Text>{string}</Text>
            {type=='info' ? 
            <>
            <Button
                width={'100px'} right={'25px'} color={'#00CEFF'}
            >OK</Button>
            <Time_bar />
            </>:
            <>
            <Button>X</Button>
            <Button right={'25px'} color={'rgb(43, 62, 230)'}>Y</Button>
            </>
        }
        </Box>
    )
}

export default Alert;