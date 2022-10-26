import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Background_view, Blur_box, Text, Button_box, Image } from "../../styleds";
import styled from "styled-components";

const LoginView = () => {
    const [login_data, set_login_data] = useState({
        id: '',
        password: ''
    });

    let navigate = useNavigate();

    const Login = async function () {
        try {
            let res = await axios({
                method: 'post',
                url: '',
                headers: {
                    Authorization: '',
                }
            });
            console.log('login sccess!');
        } catch (err) {
            console.log('login error...');
            console.log(err)
        }
    };

    const log = () => {
        let login = document.querySelectorAll('input');
        console.log(login[0].value);
        console.log(login[1].value);
    }

    return (
        <>
            <Center>
                <Blur_box width='630px' height='638px'>
                    <Flex_box>
                        <Text weight='700' size='24px' height='28px' bottom='30px'>
                            Log in
                        </Text>
                        <Text weight='400' size='18px' height='21px' bottom='50px'>
                            로그인 할 방식을 선택해주세요.
                        </Text>
                        <Button_box>
                            <Image src={'apple-logo.png'} width='20px' height='20px' />
                            <Margin_box>Apple로 로그인</Margin_box>
                        </Button_box>
                        <Button_box>
                            <Image src={'github-logo.png'} width='16px' height='16px' />
                            <Margin_box>Github로 로그인</Margin_box>
                        </Button_box>
                        <Button_box background='transparent' color="#ffffff">
                            게스트로 로그인
                        </Button_box>
                        <Button_box onClick={() => navigate('/login/member')}>
                            회원 로그인
                        </Button_box>
                    </Flex_box>
                </Blur_box>
            </Center>
        </>
    )
}

export default LoginView;

const Button_style = styled.span`
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
`

const Center = styled.div`
    width: 100%;
    height: calc(100vh - 100px);
    display: flex;
    justify-content: center;
    align-items: center;
`

const Flex_box = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    padding: 114px 100px;
`

const Margin_box = styled.div`
    margin-left: 4px;
`