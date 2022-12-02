import { useState } from "react";
import styled from "styled-components";
import { Blur_box } from "../../../styleds";

const LoadingView = () => {
    const [text, setText] = useState([]);

    setTimeout(() => {
        if(text.length === 3) setText([]);
        else setText([...text, '.']);
    }, 1000);

    return (
        <BackgroundBox>
            <Blur_box width='100%' height='100%'>
                <TextBox>LOADING{text.join('')}</TextBox>
            </Blur_box>
        </BackgroundBox>
    )
}

export default LoadingView;

const BackgroundBox = styled.div`
    width: 100%;
    height: 100%;
    background: url('/image/backgroundBlock.png');
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
`

const TextBox = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 100;
    font-size: 40px;
    line-height: 47px;
    color: #ffffff;
`