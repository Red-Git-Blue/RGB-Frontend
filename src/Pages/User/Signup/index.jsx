import { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Blur_box, Left_box, Input_view, Button_box, Right_box } from "../../../styleds";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import AnimatedPage from "../../AnimatedPage";
import { toast } from "react-toastify";
import { BaseUrl } from "../../../export/baseUrl";

const SignUpView = () => {
    const AxiosTime = useRef(undefined);
    const [cookies,,] = useCookies(['refreshToken']);
    const [signupData, setSignupData] = useState({
        email: '',
        name: '',
        password: ''
    });

    let navigate = useNavigate();

    const Signup = () => {
        if (signupData.email === '' || signupData.name === '' ||signupData.password === '') {
            toast.error('모두 입력해주세요!');
            return;
        }

        if (AxiosTime.current) {
            clearInterval(AxiosTime.current);
            AxiosTime.current = null;
        }

        AxiosTime.current = setInterval(() => {
            axios({
                method: 'post',
                url: BaseUrl + '/auth/sign-up',
                data: {
                    name: signupData.name,
                    password: signupData.password,
                    email: signupData.email
                }
            })
                .then(() => {
                    toast.success("이메일을 확인해주세요.");
                    toast.success("인증 메일이 전송되었습니다.");
                    toast.success("회원가입 성공!");
                    navigate('/main');
                })
                .catch(() => {
                    toast.error("제대로 입력했는지 확인하세요");
                })
        }, 500);
    };

    const KeyEnvent = useCallback((e) => {
        if (e.key === 'Enter') Signup();
    })

    useEffect(() => {
        if (cookies.accessToken && cookies.refreshToken) {
            navigate('/main');
        }
        (() => document.addEventListener('keydown', KeyEnvent))();
        return () => { document.removeEventListener('keydown', KeyEnvent) };
    }, [cookies, signupData])

    const midtermCheck = (name, data) => {
        setSignupData({
            ...signupData,
            [name]: data
        })
    }

    return (
        <AnimatedPage>
            <Center>
                <Blur_box>
                    <Flex_box>
                        <Left_box
                            title='sign up'
                            text1='아직 회원이 아니신가요?'
                            text2='이메일 인증으로 간편하게 가입해보세요.'
                            text3='이미 계정을 가지고 계십니까?'
                            text4='로그인'
                            link='/login'
                        />
                        <Right_box>
                            <Input_view
                                check='name'
                                func={midtermCheck}
                                name='닉네임'
                                text='3~20자로 닉네임을 입력해주세요.'
                                value={signupData.name}
                            />
                            <Input_view
                                check='email'
                                func={midtermCheck}
                                name='이메일'
                                text='이메일을 입력해주세요.'
                                value={signupData.email}
                            />
                            <Input_view
                                check='password'
                                func={midtermCheck}
                                type='password'
                                name='비밀번호'
                                text='숫자,대소문자,특수문자 포함 4~30자'
                                value={signupData.password}
                            />
                            <Button_box onClick={() => Signup()} top='31px'>회원가입</Button_box>
                        </Right_box>
                    </Flex_box>
                </Blur_box>
            </Center>
        </AnimatedPage>
    )
}

export default SignUpView;

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