import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Background_view, Blur_box, Left_box, Input_view, Button_box, Right_box } from "../../styleds"; 
import styled from "styled-components";

const LoginView = () => {
    const [login_data, set_login_data] = useState({
        id:'',
        password:''
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
                        <Input_view name={'닉네임 또는 이메일'} text='닉네임 또는 이메일을 입력해주세요.' />
                        <Input_view name={'비밀번호'} text='비밀번호를 입력해주세요.' />
                        <Button_box background='transparent' color="#ffffff" top='72px'>
                            <Button_style>비밀번호를 잃어버리셨나요?</Button_style>
                        </Button_box>
                        <Button_box>로그인</Button_box>
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