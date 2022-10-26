import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Background_view, Blur_box, Left_box, Input_view, Button_box, Right_box } from "../../styleds";
import Alert from "../Alert.js";
import styled from "styled-components";


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
                url: 'http://local.lite24.net:8080/api/rgb/auth/sign-up',
                data: {
                    name: signup_data.name,
                    password: signup_data.password,
                    email: signup_data.email
                }
            });
            console.log('signup sccess!');
            navigate('/');
        } catch (err) {
            console.log('signup error...');
            console.log(err)
        }
    };

    const log = () => {
        let signup = document.querySelectorAll('input');
        set_signup_data({
            name: signup[0].value,
            password: signup[1].value,
            email: signup[2].value
        });
        Signup();
    }

    return (
        <>
            {/* Alert 테스트 코드 */}
            {/* <Alert string={'확인했습니까?'}/> */}
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
                            <Input_view name={'닉네임'} text='3~20자로 닉네임을 입력해주세요.' />
                            <Input_view name={'이메일'} text='이메일을 입력해주세요.' />
                            <Input_view name={'비밀번호'} text='숫자,대소문자,특수문자 포함 4~30자' />
                            <Button_box top='31px'>회원가입</Button_box>
                        </Right_box>
                    </Flex_box>
                </Blur_box>
            </Center>
        </>
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