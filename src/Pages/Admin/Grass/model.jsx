import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { BaseUrl } from "../../../export/baseUrl";
import { useCookies } from "react-cookie";
import { useRef } from "react";

const Model = ({ Type = [], Fn1, Fn2, setType }) => {
    const [cookies, ,] = useCookies();
    const colorInter = useRef(null);
    const [Data, setData] = useState({
        name: '',
        rarityType: '',
        introduction: '',
        price: 0,
        color: {
          less: '#2D333B',
          low: '#0E4429',
          normal: '#006D32',
          high: '#26A641',
          max: '#39D353',
          background: '#22272E'
        }
    })
    const [pastData, setPastData] = useState(undefined);

    if (Type[0] === 'VIEW' && pastData === undefined) {
        axios({
            method: 'GET',
            url: BaseUrl + '/item/grass/' + Type[1],
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
            }
        })
            .then((res) => {
                toast.success('정보를 성공적으로 불러왔습니다.');
                setPastData({
                    name: res.data.name,
                    rarityType: res.data.rarity.name,
                    introduction: res.data.introduction,
                    price: res.data.price,
                    color: {
                        less: '#' + res.data.color.less,
                        low: '#' + res.data.color.low,
                        normal: '#' + res.data.color.normal,
                        high: '#' + res.data.color.high,
                        max: '#' + res.data.color.max,
                        background: '#' + res.data.color.background
                    }
                });
                setData({
                    name: res.data.name,
                    rarityType: res.data.rarity.name,
                    introduction: res.data.introduction,
                    price: res.data.price,
                    color: {
                        less: '#' + res.data.color.less,
                        low: '#' + res.data.color.low,
                        normal: '#' + res.data.color.normal,
                        high: '#' + res.data.color.high,
                        max: '#' + res.data.color.max,
                        background: '#' + res.data.color.background
                    }
                });
            })
            .catch(() => {
                toast.error('너 뭔가 잘못됐어!');
            })
    }

    const DataChange = (name, value) => {
        setData({
            ...Data,
            [name]: value
        });
    }

    const ColorChange = (name, value) => {
        setData({
            ...Data,
            color: {
                ...Data.color,
                [name]: value
            }
        });
    }

    const Push = () => {
        if (cookies.accessToken === undefined) {
            toast.error('로그인도 안 했구나?');
            return;
        }

        if (Object.values(Data).filter((item) => item == '').length) {
            toast.error('모두 입력해주세요!');
            return;
        }

        if (Type[0] === 'EDIT') {
            if (Data.color !== pastData.color) {
                axios({
                    method: 'PUT',
                    url: BaseUrl + '/item/grass/' + Type[1] + '/color',
                    headers: {
                        Authorization: `Bearer ${cookies.accessToken}`,
                    },
                    data: Data.color
                })
                    .then(() => {
                        toast.success('내용을 성공적으로 변경했습니다.');
                        Fn1(false);
                    })
                    .catch(() => {
                        toast.error('너 뭔가 잘못됐어!');
                    })
            }

            if ((Data.name !== pastData.name) || (Data.rarityType !== pastData.rarityType) || (Data.price !== pastData.price) || (Data.introduction !== pastData.introduction)) {
                axios({
                    method: 'PUT',
                    url: BaseUrl + '/item/grass/' + Type[1],
                    headers: {
                        Authorization: `Bearer ${cookies.accessToken}`,
                    },
                    data: {
                        name: Data.name,
                        introduction: Data.introduction,
                        rarityType: Data.rarityType,
                        price: Data.price
                    }
                })
                    .then(() => {
                        toast.success('내용을 성공적으로 변경했습니다.');
                        Fn1(false);
                    })
                    .catch(() => {
                        toast.error('너 뭔가 잘못됐어!');
                    })
            }

            Fn2();
        } else {
            axios({
                method: 'POST',
                url: BaseUrl + '/item/grass',
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`,
                },
                data: Data
            })
            .then(() => {
                toast.success('매우 성공적이다');
                Fn2();
                Fn1(false);
            })
                .catch(() => {
                    toast.error('너 뭔가 잘못됐어!');
                })
        }
    }

    const DeteleAd = () => {
        axios({
            method: 'DELETE',
            url: BaseUrl + '/item/grass/' + Type[1],
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
            }
        })
            .then(() => {
                toast.success('성공적으로 삭제했습니다.');
                Fn2();
                Fn1(false);
            })
            .catch(() => {
                toast.error('너 뭔가 잘못됐어!');
            })
    }

    return (
        <OutBox>
            <Box>
                <Header>
                    <span>잔디 추가하기</span>
                    <CancelX onClick={() => Fn1(false)} />
                </Header>
                <InBox>
                    <BetweenBox>
                        <div>
                    <SubTitle>잔디 이름</SubTitle>
                    <InputBox
                        onChange={(e) => DataChange('name', e.target.value)}
                        type='text'
                        placeholder='잔디 이름을 입력해주세요.'
                        value={Data.name}
                        disabled={Type[0] === 'VIEW'}
                    />
                    <SubTitle>등급</SubTitle>
                    <BtnOutBox>
                        <RarityBtn
                            bool={Data.rarityType === 'COMMON'}
                            color='#AAAAAA'
                            onClick={() => Type[0] !== 'VIEW' && DataChange('rarityType', 'COMMON')}
                        >
                            COMMON
                        </RarityBtn>
                        <RarityBtn
                            bool={Data.rarityType === 'RARE'}
                            color='#5555FF'
                            onClick={() => Type[0] !== 'VIEW' && DataChange('rarityType', 'RARE')}
                        >
                            RARE
                        </RarityBtn>
                        <RarityBtn 
                            bool={Data.rarityType === 'EPIC'}
                            color='#AA00AA'
                            onClick={() => Type[0] !== 'VIEW' && DataChange('rarityType', 'EPIC')}
                        >
                            EPIC
                        </RarityBtn>
                        <RarityBtn
                            bool={Data.rarityType === 'LEGENDARY'}
                            color='#FFAA00'
                            onClick={() => Type[0] !== 'VIEW' && DataChange('rarityType', 'LEGENDARY')}
                        >
                            LEGENDARY
                        </RarityBtn>
                        <RarityBtn
                            bool={Data.rarityType === 'SPECIAL'}
                            color='#FF5555'
                            onClick={() => Type[0] !== 'VIEW' && DataChange('rarityType', 'SPECIAL')}
                        >
                            SPECIAL
                        </RarityBtn>
                        <RarityBtn
                            bool={Data.rarityType === 'STAFF'}
                            color='#55FFFF'
                            onClick={() => Type[0] !== 'VIEW' && DataChange('rarityType', 'STAFF')}
                        >
                            STAFF
                        </RarityBtn>
                    </BtnOutBox>
                    <SubTitle>가격</SubTitle>
                    <InputBox
                        onChange={(e) => DataChange('price', e.target.value)}
                        type='number'
                        placeholder='잔디 가격을 입력해주세요.'
                        value={Data.price}
                        disabled={Type[0] === 'VIEW'}
                    />
                    </div>
                    <div>
                        <InputColor 
                            id="Background"
                            onChange={(e) => ColorChange('background', e.target.value)}
                            value={Data.color.background}
                            disabled={Type[0] === 'VIEW'}
                        />
                        <ColorLabel
                            htmlFor='Background'
                            color={Data.color.background}
                            width='390px'
                            height='240px'
                        >
                            {/*----------------------------------------------*/}
                            <InputColor
                                id="less"
                                onChange={(e) => ColorChange('less', e.target.value)}
                                value={Data.color.less}
                                disabled={Type[0] === 'VIEW'}
                            />
                            <ColorLabel
                                htmlFor='less'
                                bool={Data.color.less === Data.color.background}
                                color={Data.color.less}
                            />
                            {/*----------------------------------------------*/}
                            <InputColor
                                id="low"
                                onChange={(e) => ColorChange('low', e.target.value)}
                                value={Data.color.low}
                                disabled={Type[0] === 'VIEW'}
                            />
                            <ColorLabel
                                htmlFor='low'
                                bool={Data.color.low === Data.color.background}
                                color={Data.color.low}
                            />
                            {/*----------------------------------------------*/}
                            <InputColor
                                id="normal"
                                onChange={(e) => ColorChange('normal', e.target.value)}
                                value={Data.color.normal}
                                disabled={Type[0] === 'VIEW'}
                            />
                            <ColorLabel
                                htmlFor='normal'
                                bool={Data.color.normal === Data.color.background}
                                color={Data.color.normal}
                            />
                            {/*----------------------------------------------*/}
                            <InputColor
                                id="high"
                                onChange={(e) => ColorChange('high', e.target.value)}
                                value={Data.color.high}
                                disabled={Type[0] === 'VIEW'}
                            />
                            <ColorLabel
                                htmlFor='high'
                                bool={Data.color.high === Data.color.background}
                                color={Data.color.high}
                            />
                            {/*----------------------------------------------*/}
                            <InputColor
                                id="max"
                                onChange={(e) => ColorChange('max', e.target.value)}
                                value={Data.color.max}
                                disabled={Type[0] === 'VIEW'}
                            />
                            <ColorLabel
                                htmlFor='max'
                                bool={Data.color.max === Data.color.background}
                                color={Data.color.max}
                            />
                        </ColorLabel>
                    </div>
                    </BetweenBox>
                    <SubTitle>설명</SubTitle>
                    <BigInputBox
                        onChange={(e) => DataChange('introduction', e.target.value)}
                        placeholder='잔디 설명을 입력해주세요.'
                        value={Data.introduction}
                        disabled={Type[0] === 'VIEW'}
                    />
                    <FlexBox>
                        {
                            Type[0] === 'VIEW' ?
                                <>
                                    <AddBtn onClick={() => setType(['EDIT', Type[1]])}>잔디 수정하기</AddBtn>
                                    <AddBtn onClick={() => { if (window.confirm("정말로 삭제하실 건가요?")) DeteleAd() }}>잔디 삭제하기</AddBtn>
                                </>
                                :
                                <AddBtn onClick={() => Push()}>{Type[0] === 'EDIT' ? '잔디 수정하기' : '잔디 추가하기'}</AddBtn>
                        }
                    </FlexBox>
                </InBox>
            </Box>
        </OutBox>
    )
}

export default Model;

const OutBox = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: rgba(0,0,0,0.5);

    display: flex;
    justify-content: center;
    align-items: center;
`

const Box = styled.div`
     min-width: 1000px;
     min-height: 900px;
     background: #000000;
     border-radius: 20px;
     box-shadow: 0 0 100px 1px #FFFFFF;

`

const Header = styled.div`
    width: 900px;
    height: 50px;
    background: #FFFFFF;
    padding: 0 50px;
    border-radius: 20px 20px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > span {
        font-family: Roboto, sans-serif;
        font-weight: 500;
        font-size: 20px;
        color: #000000;
    }
`

const CancelX = styled.span`
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
        background-color: #000000;
        &::after {
            background-color: #000000;
        }
        transform: rotate(-45deg) scale(1.5);
    }
`

const InBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 50px;
`

const SubTitle = styled.span`
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 20px;
  margin: 30px 0 0 20px;
  color: #FFFFFF;
`

const InputBox = styled.input`
    width: 386px;
    height: 36px;
    border: 2px solid #333333;
    border-radius: 20px;
    background: #333333;
    outline: none;
    padding: 0 20px;
    margin-top: 10px;
    font-family: Roboto, sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;
    
    transition: 0.3s;

    &:focus {
        border: 2px solid #FFFFFF;
    }
`

const BigInputBox = styled.textarea`
    display: inline-block;
    width: 856px;
    height: 126px;
    padding: 10px 20px;
    border: 2px solid #333333;
    border-radius: 20px;
    background: #333333;
    outline: none;
    margin-top: 10px;
    font-family: Roboto, sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;
    resize: none;
    
    transition: 0.3s;
    &:focus {
        border: 2px solid #FFFFFF;
    }
`

const BtnOutBox = styled.div`
    width: 430px;
    height: 120px;
    margin-top: 20px;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, auto));
    gap: 20px;
`

const RarityBtn = styled.div`
    width: 126px;
    height: 46px;

    background: transparent;
    border: 2px solid ${(props) => props.bool ? props.color : '#FFFFFF'};
    box-shadow: 0 0 10px 5px ${(props) => props.bool ? props.color : 'transparent'};
    border-radius: 10px;
    cursor: pointer;

    font-family: Roboto, sans-serif;
    font-weight: 600;
    font-size: 18px;
    color: ${(props) => props.bool ? props.color : '#FFFFFF'};

    display: flex;
    justify-content: center;
    align-items: center;

    transition: 0.3s;
    &:hover {
        border: 2px solid ${(props) => props.color};
        box-shadow: 0 0 10px 5px ${(props) => props.color};
        color: ${(props) => props.color};
        transform: scale(1.1);
        z-index: 9;
    }
`

const BetweenBox = styled.div`
    width: 900px;
    height: 410px;
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    & > div {
        width: 430px;
        height: 410px;

        display: flex;
        &:first-child {
            flex-direction: column;
        }
        &:last-child {
            margin-top: 30px;
        }
    }
`

const InputColor = styled.input.attrs({
    type: 'color',
})`
    display: block;
    visibility: hidden;
    position: absolute;
`

const ColorLabel = styled.label.attrs((props) => ({
    style: {
      background: props.color,
    },
  }))`
    width: ${(props) => props.width || '10px'};
    height: ${(props) => props.height || '10px'};

    padding: 20px;

    border-radius: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;
`

const FlexBox = styled.div`
    width: 900px;
    height: 50px;
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
`

const AddBtn = styled.div`
    width: 196px;
    height: 46px;
    margin-left: 10px;
    border: 2px solid #222222;
    background: #222222;
    border-radius: 20px;
    font-family: Roboto, sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #FFFFFF;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: 0.3s;
    &:hover {
        border: 2px solid #FFFFFF;
    }
`