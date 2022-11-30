import axios from "axios";
import { useCookies } from "react-cookie";
import { useState } from "react";
import styled from "styled-components";

const SearchView = () => {
    const [Btn_click, Set_click] = useState(1);
    const [cookies, , ] = useCookies(['accessToken']);

    const Search = (e) => {
        if(!cookies.accessToken) return;
        axios({
            method: 'get',
            url: 'http://local.lite24.net:8080/api/user/search',
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
            },
            params: {
                q: e.target.value.trim(),
                idx: 0,
                size: 10
            }
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    return (
        <OutBox>
            <SearchInput onKeyDown={(e) => {if(e.key === 'Enter') Search(e)}}/>
            {Btn_click === 1 ?
                <AuthPage_btn_box>
                    <AuthPage_btn
                        background='#FFF500'
                        color="#000000"
                        onClick={(() => Set_click(-Btn_click))}
                    >
                        코인
                    </AuthPage_btn>
                    <AuthPage_btn onClick={(() => Set_click(-Btn_click))} >순위</AuthPage_btn>
                </AuthPage_btn_box>
                :
                <AuthPage_btn_box>
                    <AuthPage_btn onClick={(() => Set_click(-Btn_click))}>코인</AuthPage_btn>
                    <AuthPage_btn
                        background='#FFF500'
                        color="#000000"
                        onClick={(() => Set_click(-Btn_click))}
                    >
                        순위
                    </AuthPage_btn>
                </AuthPage_btn_box>
            }
        </OutBox>
    )
}

export default SearchView;

const OutBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 0;
`

const SearchInput = styled.input.attrs({
    placeholder: '검색할 코인이나 유저를 입력해주세요.'
})`
    width: 940px;
    height: 50px;
    padding: 0 30px;
    border: none;
    outline: none;
    background: #222222;
    border-radius: 64px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #ffffff;
`

const AuthPage_btn_box = styled.div`
    width: 1000px;
    display: flex;
    justify-content: flex-start;
    margin: 40px 0;
    div:first-child {
        margin-right: 20px;
    }
`
const AuthPage_btn = styled.div`
    width: 77px;
    height: 40px;
    border-radius: 100px;
    background: ${(props) => props.background || '#222222'};
    color: ${(props) => props.color || '#999999'};
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
    &:hover {
        transform: scale(1.05);
    }
`