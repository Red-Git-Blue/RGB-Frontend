import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Background_view, Input_view, Login_box, Title,  Ls_btn } from "../styleds.js"; 


const SignUpView = () => {
    const [signup_data, set_signup_data] = useState({
        id:'',
        password:''
    });
    
    let navigate = useNavigate();

    const Signup = async function () {
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
        let signup = document.querySelectorAll('input');
        console.log(signup[0].value);
        console.log(signup[1].value);
        console.log(signup[2].value);
    }

    return (
        <>
        <div style={{display:"flex"}}>
            <Background_view />
            <div style={{
                width:'30vmax',
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
                    <Input_view name={'아이디'} />
                    <Input_view name={'비밀번호'} />
                    <Input_view name={'이메일'} />
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