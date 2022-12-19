import axios from "axios";
import { useCookies } from "react-cookie";
import { useState } from "react";
import styled from "styled-components";
import { BaseUrl } from "../../../export/baseUrl";
import { Image } from "../../../styleds";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const SearchView = () => {
    const [BtnClick, SetClick] = useState(0);
    const [cookies, setCookies, removeCookie] = useCookies();
    const [Text, setText] = useState('')
    const [userData, setUser] = useState([]);
    const [CoinData, setCoin] = useState([]);

    const TextSort = (e) => {
        setText(e.target.value.replace(/[^a-zA-Z0-9가-힣ㄱ-ㅎ]/g, ''));
        if(e.target.value.trim() === '') SetClick(0);
        else SetClick(1);
    }

    const Search = (e) => {
        if (!cookies.accessToken || e.target.value.trim() === '') return;

        if(cookies.search) {
            if(cookies.search.indexOf(Text) !== -1) return;

            if(cookies.search.split(',').length > 8) {
                setCookies('search', Text + ',' + cookies.search.split(',').slice(1, 9).join(','));
            } else {
                setCookies('search', Text + ',' + cookies.search);
            }
        }
        else {
            setCookies('search', Text);
        }

        axios({
            method: 'get',
            url: BaseUrl + '/coin/search',
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
            },
            params: {
                query: Text,
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
                query: Text,
                idx: 0,
                size: 10
            }
        })
            .then((res) => {
                setUser(res.data);
            })
    }

    const DeleteText = (value) => {
        const Data = cookies.search.split(',').filter((item) => item !== value).join(',');
        if(Data === '') {
            removeCookie('search');
        } else {
            setCookies('search', Data);
        }
        
    }

    return (
        <OutBox>
            <SearchInput
                onChange={(e) => TextSort(e)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') Search(e);
                    if (e.key == 'Backspace') TextSort(e);
                }}
                value={Text}
            />
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
                    유저
                </AuthPage_btn>
            </AuthPage_btn_box>
            {
                BtnClick === 0 ?
                    <BeforeSearch>
                        <BeforeSearchTitle>지금까지 검색했던 검색어</BeforeSearchTitle>
                        {
                            cookies.search === undefined ?
                            <BeforeSearchTitle>검색어가 존재하지 않습니다.</BeforeSearchTitle>
                            :
                            <>
                            {
                                cookies.search.split(',').map((item, index) => 
                                    <BeforeSearchText key={index} value={item} Fn1={setText} Fn2={SetClick} Fn3={DeleteText} />
                                )
                            }
                            </>
                        }
                        
                    </BeforeSearch>
                    :
                    <GridBox>
                        {
                            BtnClick === 1 ?
                                <>
                                    {
                                        CoinData.map((item, index) => <Result key={index} type={1} data={item} />)
                                    }
                                </>
                                :
                                <>
                                    {
                                        userData.map((item, index) => <Result key={index} type={-1} data={item} />)
                                    }
                                </>
                        }
                    </GridBox>
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

const BeforeSearch = styled.div`
    width: 940px;
    min-height: 100px;
    padding: 0 28px;
    background: #222222;
    border: 2px solid #444444;
    border-radius: 20px;
    position: absolute;
    top: 260px;
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #ffffff;
    & > span:first-child {
        border: none;
    }
`

const BeforeSearchTitle = styled.span`
    display: inline-block;
    width: 940px;
    padding: 20px 0;
    border-top: 2px solid #444444;
`

const BeforeSearchText = ({value, Fn1, Fn2, Fn3}) => {
    return (
        <BeforeSearchTextBox>
            <span onClick={() => {Fn1(value); Fn2(1);}}>{value}</span>
            <DeleteX onClick={() => Fn3(value)}/>
        </BeforeSearchTextBox>
    )
}

const BeforeSearchTextBox = styled(BeforeSearchTitle)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #909090;
    & > span{
        display: inline-block;
        cursor: pointer;
        transition: 0.3s;
        &:first-child:hover {
            color: #FFFFFF;
            transform: scale(1.05);
        }
    }
`

const DeleteX = styled.span`
    height: 4px;
    width: 20px;
    display: block;
    background-color: #909090;
    transform: rotate(-45deg);
    border-radius: 10px;
    cursor: pointer;
    overflow: visible;
    transition: 0.5s;
    transform-origin: center;

    &::after {
        content: '';
        height: 4px;
        width: 20px;
        display: block;
        background-color: #909090;
        border-radius: 10px;
        transform: rotate(90deg);
        transition: 0.5s;
    }

    &:hover {
        background-color: #ffffff;
        &::after {
            background-color: #ffffff;
        }
        transform: rotate(-45deg) scale(1.5);
    }
`

const GridBox = styled.div`
    width: 1150px;
    height: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(370px, auto));
    gap: 20px;
`

const Result = ({ type, data }) => {
    const Navigate = useNavigate();

    return (
        <ResultBox onClick={() => type === 1 ? Navigate('/coin/' + data.id) : Navigate('/userPage/' + data.id)}>
            <div>
                {
                    data.profile ?
                        <Image src={data.profile.fileUrl} width='35px' height='35px' radius='20px' />
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
                            <Image src={data.representBadge.fileUrl} width='70px' height='75px' radius='20px' />
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