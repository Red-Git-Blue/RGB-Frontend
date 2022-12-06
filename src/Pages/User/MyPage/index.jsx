import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { BaseUrl } from "../../../export/baseUrl";

const MyPageView = () => {
    const [cookies, , ] = useCookies(['accessToken']);
    const [UserData, setUser] = useState(undefined);

    const GetUser = () => {
        axios({
          method: 'GET',
          url: BaseUrl + '/user/me',
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        })
        .then((res) => {
            setUser(res.data);
        })
        .catch((err) => {
        })
    }

    const GithubConnect = () => {
        axios({
          method: 'GET',
          url: BaseUrl + '/auth/github',
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err.response);
        })
    }

    useEffect(() => {
        GetUser();
    }, [])

    if(UserData) return (
        <>
            {!UserData.isGithub && <GithubBtn onClick={() => GithubConnect()}>깃허브 연동</GithubBtn>}
        </>
    )
}

export default MyPageView;

const GithubBtn = styled.div`
    width: 400px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000000;
    background: #ffffff;
    border-radius: 20px;
    margin: 100px;
    cursor: pointer;
`