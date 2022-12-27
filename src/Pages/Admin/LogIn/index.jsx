import { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Blur_box, Left_box, Input_view, Button_box, Right_box, Background_view } from "../../../styleds";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import AnimatedPage from "../../AnimatedPage";
import { toast } from "react-toastify"
import { BaseUrl } from "../../../export/baseUrl";

const AdminLoginView = () => {
    const AxiosTime = useRef(undefined);
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [cookies, setCookie,] = useCookies(['refreshToken']);
    let navigate = useNavigate();

    const Login = () => {
        if (loginData.email === '' || loginData.password === '') {
            toast.error('모두 입력해주세요!');
            return;
        }

        if (AxiosTime.current) {
            clearInterval(AxiosTime.current);
            AxiosTime.current = null;
        }
        AxiosTime.current = setInterval(() => {
            axios({
                method: 'POST',
                url: BaseUrl + '/auth/sign-in',
                data: {
                    email: loginData.email,
                    password: loginData.password
                }
            })
                .then((res) => {
                    toast.success("Login 성공!");
                    setCookie('accessToken', res.data.accessToken);
                    setCookie('refreshToken', res.data.refreshToken);
                })
                .catch((err) => {
                    toast.error("제대로 입력했는지 확인하세요");
                    console.log(err);
                })
            clearInterval(AxiosTime.current);
            AxiosTime.current = null;
        }, 500)
    };

    const KeyEnvent = useCallback((e) => {
        if (e.key === 'Enter') Login();
    })

    useEffect(() => {
        if (cookies.accessToken && cookies.refreshToken) {
            navigate('/youDontKnow/AdminPage');
        }
        (() => document.addEventListener('keydown', KeyEnvent))();
        return () => { document.removeEventListener('keydown', KeyEnvent) };
    }, [cookies, loginData])

    const midtermCheck = (name, data) => {
        setLoginData({
            ...loginData,
            [name]: data
        })
    }

    return (
        <AnimatedPage>
            <Background_view />
            <Center>
                <Blur_box>
                    <Flex_box>
                        <Left_box
                            title='log in'
                            text1='관리자이신가요?'
                            text2='로그인 후 서비스를 이용해보세요.'
                        />
                        <Right_box>
                            <Input_view
                                check='email'
                                func={midtermCheck}
                                name='이메일'
                                text='이메일을 입력해주세요.'
                                value={loginData.email}
                            />
                            <Input_view
                                check='password'
                                func={midtermCheck}
                                type='password'
                                name='비밀번호'
                                text='비밀번호를 입력해주세요.'
                                value={loginData.password}
                            />
                            <Button_box top='104px' onClick={() => Login()}>로그인</Button_box>
                        </Right_box>
                    </Flex_box>
                </Blur_box>
            </Center>
        </AnimatedPage>
    )
}

export default AdminLoginView;

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