import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Background_view, Input_view, Login_box, Title,  Ls_btn } from "../../styleds.js"; 
import Alert from "../Alert.js";


const SignUpView = () => {
    const [signup_data, set_signup_data] = useState({
        email:'',
        name:'',
        password:''
    });
    
    let navigate = useNavigate();

    const Signup = async function () {
        try {
            let res = await axios({
                method: 'post',
                url: 'http://local.lite24.net:8080/api/sos/auth/sign-up',
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
        <div style={{display:"flex"}}>
            <Background_view />
            <div style={{
                width:'30vw',
                minWidth: '600px',
                height: '100vh',
                background: 'linear-gradient(180deg, #414852 0%, #24272D 100%)',
            }}> 
                <img src="./pattern.png" style={{
                        zIndex: '0',
                        position: 'absolute',
                        transform: 'rotate(180deg)',
                        width:'15%',
                        height: 'auto',
                        pointerEvents: 'none',
                    }}/>
                <Login_box>
                    <Title>SIGN UP</Title>
                    <div style={{
                        width: '400px',
                        height: '400px'
                    }}>
                        <Input_view name={'이름'} />
                        <Input_view name={'비밀번호'} />
                        <Input_view name={'이메일'} />
                    </div>
                    <Ls_btn 
                        click={log} 
                        string={"아직 이미 계정을 가지고 계십니까?"} 
                        name={"로그인"} 
                        sub_name={"회원가입"} 
                        move={'/login'} 
                    />
                </Login_box>
                <img src="./pattern.png" style={{
                        zIndex: '0',
                        position: 'fixed',
                        width:'15%',
                        height: 'auto',
                        right: '0',
                        bottom: '0',
                        pointerEvents: 'none',
                    }}/>
            </div>
        </div>
        </>
    )
}

export default SignUpView;