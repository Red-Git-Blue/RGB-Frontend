import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Background_view, Input_view, Login_box, Title,  Ls_btn } from "../../styleds.js"; 


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
        <div style={{display:"flex"}}>
            <Background_view />
            <div style={{
                width:'30vmax',
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
                    <Title>LOGIN</Title>
                    <div style={{
                        width: '400px',
                        height: '400px'
                    }}>
                        <Input_view name={'아이디'} />
                        <Input_view name={'비밀번호'} />
                    </div>
                    <Ls_btn 
                        click={log} 
                        string={"아직 회원이 아니신가요?"} 
                        name={"회원가입"}
                        sub_name={"로그인"} 
                        move={'/signup'} 
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

export default LoginView;