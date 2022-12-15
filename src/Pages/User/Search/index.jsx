import axios from "axios";
import { useCookies } from "react-cookie";
import { useState } from "react";
import styled from "styled-components";
import {BaseUrl} from "../../../export/baseUrl";
import { Image } from "../../../styleds";
import { useNavigate } from "react-router";

const SearchView = () => {
    const [BtnClick, SetClick] = useState(1);
    const [cookies, , ] = useCookies(['accessToken']);
    const [userData, setUser] = useState([]);
    const [CoinData, setCoin] = useState([]);

    const Search = (e) => {
        if(!cookies.accessToken) return;
        
        axios({
            method: 'get',
            url: BaseUrl + '/coin/search',
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
            },
            params: {
                query: e.target.value.trim(),
                idx: 0,
                size: 10
            }
        })
        .then((res) => {
            setCoin(res.data);
        })

        axios({
            method: 'get',
            url: BaseUrl + '/user/search',
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
            },
            params: {
                query: e.target.value.trim(),
                idx: 0,
                size: 10
            }
        })
        .then((res) => {
            setUser(res.data);
        })
    }

    return (
        <OutBox>
            <SearchInput onKeyDown={(e) => {if(e.key === 'Enter') Search(e)}}/>
            <AuthPage_btn_box>
                <AuthPage_btn
                    bool={BtnClick === 1}
                    onClick={(() => BtnClick === -1 && SetClick(-BtnClick))}
                >
                    코인
                </AuthPage_btn>
                <AuthPage_btn
                    bool={BtnClick === -1}
                    onClick={(() => BtnClick === 1 && SetClick(-BtnClick))}
                >
                    순위
                </AuthPage_btn>
            </AuthPage_btn_box>
            <GridBox>
                {
                    BtnClick === 1 ?
                    <>
                    {
                        CoinData.map((item, index) => <Result key={index} type={1} data={item}/>)
                    }
                    </>
                    :
                    <>
                    {
                        userData.map((item, index) => <Result key={index} type={-1} data={item}/>)
                    }
                    </>
                }
            </GridBox>
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
    background: #222222;
    color: #999999;
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

    ${(props) => props.bool && `
        background: #FFF500;
        color: #000000;
    `}

    &:hover {
        transform: scale(1.05);
    }
`

const GridBox = styled.div`
    width: 1150px;
    height: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(370px, auto));
    gap: 20px;
`

const Result = ({type, data}) => {
    const Navigate = useNavigate();

    return (
        <ResultBox onClick={() => type === 1 ? Navigate('/coin/' + data.id) : Navigate('/userPage/' + data.id)}>
            <div>
                {
                    data.profile? 
                    <Image src={data.profile.fileUrl} width='35px' height='35px' radius='20px'/>
                    :
                    <EmptyImage />
                }
                <div>
                    <span>{data.nickName}</span>
                    <span>{data.name}</span>
                </div>
            </div>
            {
                type === 1 ?
                <CoinBox color={data.increment.includes('-') === true ? "#0038FF" : "#FF0000"}>
                    <span>{data.price}</span>
                    <span>{data.increment.includes('-') ? data.increment : `+${data.increment}`}</span>
                </CoinBox>
                :
                <BadgeBox>
                    {
                        data.representBadge &&
                        <Image src={data.representBadge.fileUrl} width='70px' height='75px' radius='20px'/>
                    }
                </BadgeBox>
            }
        </ResultBox>
    )
}

const ResultBox = styled.div`
    width: 370px;
    height: 75px;
    background: #222222;
    border-radius: 20px;
    
    display: flex;
    justify-content: space-between;

    cursor: pointer;
    transition: 0.3s;

    &:hover {
        transform: scale(1.05);
    }

    & > div {
        &:first-child {
            margin: 20px 0 20px 20px;
            display: flex;
            & > div {
                display: flex;
                flex-direction: column;
                margin-left: 10px;
                font-family: 'Roboto';
                font-style: normal;

                & > :first-child {
                    font-weight: 900;
                    font-size: 14px;
                    line-height: 16px;
                    color: #FFFFFF;
                    margin-bottom: 5px;
                }

                & > :last-child {
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 14px;
                    color: #909090;
                }
            }
        }
    }
`

const EmptyImage = styled.div`
    width: 34px;
    height: 34px;
    background: transparent;
    border: 1px solid #ffffff;
    border-radius: 20px;
`

const CoinBox = styled.div`
    display: flex;
    flex-direction: column;
    text-align: right;
    margin: 20px 20px 20px 0;
    font-family: 'Roboto';
    font-style: normal;
    & > :first-child {
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
        margin-bottom: 5px;
    }

    &:last-child {
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: ${(props) => props.color};
    }
`

const BadgeBox = styled.div`
    width: 70px;
    height: 75px;
    background-color: #111111;
    backdrop-filter: blur(120px);
    border-radius: 20px;
`