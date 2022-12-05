import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Blur_box, Left_box, Input_view, Button_box, Right_box } from "../../../styleds";
import styled from "styled-components";
import AnimatedPage from "../../AnimatedPage";
import { toast } from "react-toastify";
import { BaseUrl } from "../../../export/baseUrl";

const SignUpView = () => {
    const [signup_data, set_signup_data] = useState({
        email: '',
        name: '',
        password: ''
    });

    let navigate = useNavigate();

    const Signup = async function () {
        try {
            let res = await axios({
                method: 'post',
                url: BaseUrl + '/auth/sign-up',
                data: {
                    name: signup_data.name,
                    password: signup_data.password,
                    email: signup_data.email
                }
            });
            toast.success("회원가입 성공!");
            navigate('/main');
        } catch (err) {
            toast.error("제대로 입력했는지 확인하세요");
        }
    };

    const midtermCheck = (name, data) => {
        set_signup_data({
            ...signup_data,
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
                            />
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
                                text='숫자,대소문자,특수문자 포함 4~30자'
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