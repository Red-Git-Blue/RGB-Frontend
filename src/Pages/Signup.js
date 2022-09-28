import React, { useState } from "react";
import axios from "axios";
import { Background_view, Input_view, Login_box, Title,  Button_box, Auth_page } from "../styleds.js"; 


const SignUpView = () => {
    const [signup_data, set_signup_data] = useState({
        id:'',
        password:''
    });

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

    return (
        <>
        <div style={{display:"flex"}}>
            <Background_view />
            <div style={{
                width:'600px',
                height: '100vh',
                background: 'linear-gradient(180deg, #414852 0%, #24272D 100%)',
            }}> 
                <img src="./pattern.png" style={{
                        zIndex: '0',
                        position: 'absolute',
                        transform: 'rotate(180deg)',
                        width:'15%',
                        height: 'auto',
                    }}/>
                <Login_box>
                    <Title>SIGN UP</Title>
                    <Input_view name={'아이디'} />
                    <Input_view name={'비밀번호'} />
                    <Input_view name={'이메일'} />
                    <Auth_page string={"아직 이미 계정을 가지고 계십니까?"} name={"로그인"} top={'50px'}/>
                    <Button_box onClick={() => {
                        let signup = document.querySelectorAll('input');
                        console.log(signup[0].value);
                        console.log(signup[1].value);
                        console.log(signup[2].value);
                    }}>회원가입</Button_box>
                </Login_box>
                <img src="./pattern.png" style={{
                        zIndex: '0',
                        position: 'fixed',
                        width:'15%',
                        height: 'auto',
                        right: '0',
                        bottom: '0'
                    }}/>
            </div>
        </div>
        </>
    )
}

export default SignUpView;