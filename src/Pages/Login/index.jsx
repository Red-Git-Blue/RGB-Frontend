import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Background_view, Blur_box, Left_box, Input_view, Button_box, Right_box } from "../../styleds"; 
import styled from "styled-components";
import { useCookies } from "react-cookie";

const LoginView = () => {
    const [login_data, set_login_data] = useState({
        email:'',
        password:''
    });
    
    const [cookies, setCookie, ] = useCookies(['refreshToken']);

    let navigate = useNavigate();

    const Login = async function () {
        if(login_data.email == '' || login_data.password == '') return;
        try {
            let res = await axios({
                method: 'post',
                url: 'http://local.lite24.net:8080/api/auth/sign-in',
                data: {
                    email : login_data.email,
                    password : login_data.password
                }
            });
            console.log('login sccess!');
            navigate('/');

            const expires = new Date();
            expires.setHours(expires.getHours() + 1);

            setCookie('refreshToken', res.data.refreshToken, {
                path: '/',
                expires,
                httpOnly: true
            });
        } catch (err) {
            console.log('login error...');
            console.log(err)
        }
    };

    useEffect(() => {
        if(cookies.refreshToken) {
            console.log(cookies.refreshToken);
            navigate('/');
        }
    }, [cookies])

    const log = () => {
        let login = document.querySelectorAll('input');
        set_login_data({
            email:login[0].value,
            password:login[1].value
        });
        Login();
    }

    return (
        <>
        <Background_view />
        <Center>
            <Blur_box>
                <Flex_box>
                    <Left_box
                        title='log in'
                        text1='회원이신가요?'
                        text2='로그인 후 서비스를 이용해보세요.'
                        text3='아직 회원이 아니신가요?'
                        text4='회원가입'
                        link='/signup'
                    />
                    <Right_box>
                        <Input_view name='닉네임 또는 이메일' text='닉네임 또는 이메일을 입력해주세요.' />
                        <Input_view type='password' name='비밀번호' text='비밀번호를 입력해주세요.' />
                        <Button_box background='transparent' color="#ffffff" top='72px'>
                            <Button_style>비밀번호를 잃어버리셨나요?</Button_style>
                        </Button_box>
                        <Button_box onClick={() => log()}>로그인</Button_box>
                    </Right_box>
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
    position: absolute;
    padding: 112px 100px;
`