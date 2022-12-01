import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Blur_box, Left_box, Input_view, Button_box, Right_box } from "../../../styleds";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import AnimatedPage from "../../AnimatedPage";
import { toast } from "react-toastify"

const LoginView = () => {
    const [login_data, set_login_data] = useState({
        email: '',
        password: ''
    });

    const [cookies, setCookie,] = useCookies(['refreshToken']);
    let navigate = useNavigate();

    const Login = async function () {
        if (login_data.email == '' || login_data.password == '') return;
        try {
            let res = await axios({
                method: 'post',
                url: 'http://local.lite24.net:8080/api/auth/sign-in',
                data: {
                    email: login_data.email,
                    password: login_data.password
                }
            });
            toast.success("Login 성공!");
            setCookie('accessToken', res.data.accessToken);
            setCookie('refreshToken', res.data.refreshToken);
        } catch (err) {
            toast.error("제대로 입력했는지 확인하세요");
        }
    };

    useEffect(() => {
        if (cookies.accessToken) navigate('/main');
    }, [cookies])

    const midtermCheck = (name, data) => {
        set_login_data({
            ...login_data,
            [name]: data
        })
    }

    return (
        <AnimatedPage>
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
                            <Input_view
                                check='email'
                                func={midtermCheck}
                                name='이메일'
                                text='이메일을 입력해주세요.'
                            />
                            <Input_view
                                check='password'
                                func={midtermCheck}
                                type='password'
                                name='비밀번호'
                                text='비밀번호를 입력해주세요.'
                            />
                            <Button_box background='transparent' color="#ffffff" top='72px'>
                                <Button_style>비밀번호를 잃어버리셨나요?</Button_style>
                            </Button_box>
                            <Button_box onClick={() => Login()}>로그인</Button_box>
                        </Right_box>
                    </Flex_box>
                </Blur_box>
            </Center>
        </AnimatedPage>
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