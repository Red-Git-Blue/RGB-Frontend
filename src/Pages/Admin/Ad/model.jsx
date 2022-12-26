import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { BaseUrl } from "../../../export/baseUrl";
import { useCookies } from "react-cookie";

const Model = ({ Type = [], Fn1, Fn2, setType }) => {
    const [cookies, ,] = useCookies();
    const [ImgFile, setImg] = useState(undefined);
    const [Data, setData] = useState({
        name: '',
        startDay: '',
        endDay: '',
        introduction: '',
        src: ''
    })
    const [pastData, setPastData] = useState(undefined);

    if (Type[0] === 'VIEW' && pastData === undefined) {
        axios({
            method: 'GET',
            url: BaseUrl + '/advertise/' + Type[1],
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
            }
        })
            .then((res) => {
                toast.success('정보를 성공적으로 불러왔습니다.');
                setPastData({
                    name: res.data.name,
                    startDay: res.data.startDate,
                    endDay: res.data.endDate,
                    introduction: res.data.introduction,
                    src: res.data.advertiseFile.fileUrl
                });
                setData({
                    name: res.data.name,
                    startDay: res.data.startDate,
                    endDay: res.data.endDate,
                    introduction: res.data.introduction,
                    src: res.data.advertiseFile.fileUrl
                });
            })
            .catch(() => {
                toast.error('너 뭔가 잘못됐어!');
            })
    }

    const Reading = (e) => {
        const fileReader = new FileReader();

        const selectedFile = [...e.target.files];
        if (selectedFile[0] !== undefined) {
            fileReader.readAsDataURL(selectedFile[0]);
            setImg(selectedFile[0]);
        }

        fileReader.onload = () => {
            DataChange('src', fileReader.result);
        };
    }

    const DataChange = (name, value) => {
        setData({
            ...Data,
            [name]: value
        });
    }

    const Push = () => {
        if (cookies.accessToken === undefined) {
            toast.error('로그인도 안 했구나?');
            return;
        }

        if (Object.values(Data).filter((item) => item === '').length) {
            toast.error('모두 입력해주세요!');
            return;
        }

        if (Type[0] === 'EDIT') {
            if (Data.src !== pastData.src) {
                const formData = new FormData();
                formData.append("advertiseFile", ImgFile);

                axios({
                    method: 'PUT',
                    url: BaseUrl + '/advertise/file/' + Type[1],
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${cookies.accessToken}`,
                    },
                    data: formData
                })
                    .then(() => {
                        toast.success('이미지를 성공적으로 변경했습니다.');
                        Fn1(false);
                    })
                    .catch(() => {
                        toast.error('너 뭔가 잘못됐어!');
                    })
            }

            if ((Data.name !== pastData.name) || (Data.startDay !== pastData.startDay) || (Data.endDay !== pastData.endDay) || (Data.introduction !== pastData.introduction)) {
                axios({
                    method: 'PUT',
                    url: BaseUrl + '/advertise/' + Type[1],
                    headers: {
                        Authorization: `Bearer ${cookies.accessToken}`,
                    },
                    data: {
                        name: Data.name,
                        introduction: Data.introduction,
                        startDate: Data.startDay,
                        endDate: Data.endDay
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
            const formData = new FormData();

            formData.set("req", new Blob([JSON.stringify({
                name: Data.name,
                introduction: Data.introduction,
                startDate: Data.startDay,
                endDate: Data.endDay
            })], {
                type: "application/json"
            }));

            formData.append("advertiseFile", ImgFile);

            axios({
                method: 'POST',
                url: BaseUrl + '/advertise',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${cookies.accessToken}`,
                },
                data: formData
            }).then(() => {
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
            url: BaseUrl + '/advertise/' + Type[1],
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
                    <span>광고 추가하기</span>
                    <CancelX onClick={() => Fn1(false)} />
                </Header>
                <InBox>
                    {Type[0] === 'VIEW' || <AddAd onChange={(e) => Reading(e)} />}
                    <AddAdLabel mouse={Type[0] === 'VIEW' ? 'default' : 'pointer'} src={Data.src === '' ? undefined : Data.src}>
                        <AddX display={Data.src === '' ? 'block' : 'none'} />
                    </AddAdLabel>
                    <SubTitle>광고 이름</SubTitle>
                    <InputBox
                        onChange={(e) => DataChange('name', e.target.value)}
                        type='text'
                        placeholder='광고 이름을 입력해주세요.'
                        value={Data.name}
                        disabled={Type[0] === 'VIEW'}
                    />
                    <SubTitle>날짜</SubTitle>
                    <InputBox
                        onChange={(e) => DataChange('startDay', e.target.value)}
                        type='date'
                        min='2022-12-01'
                        max='2100-12-31'
                        placeholder='광고 시작일을 입력해주세요.'
                        value={Data.startDay}
                        disabled={Type[0] === 'VIEW'}
                    />
                    <InputBox
                        onChange={(e) => DataChange('endDay', e.target.value)}
                        type='date'
                        min='2022-12-01'
                        max='2100-12-31'
                        placeholder='광고 종료일을 입력해주세요.'
                        value={Data.endDay}
                        disabled={Type[0] === 'VIEW'}
                    />
                    <SubTitle>설명</SubTitle>
                    <BigInputBox
                        onChange={(e) => DataChange('introduction', e.target.value)}
                        placeholder='광고 설명을 입력해주세요.'
                        value={Data.introduction}
                        disabled={Type[0] === 'VIEW'}
                    />
                    <FlexBox>
                        {
                            Type[0] === 'VIEW' ?
                                <>
                                    <AddBtn onClick={() => setType(['EDIT', Type[1]])}>광고 수정하기</AddBtn>
                                    <AddBtn onClick={() => { if (window.confirm("정말로 삭제하실 건가요?")) DeteleAd() }}>광고 삭제하기</AddBtn>
                                </>
                                :
                                <AddBtn onClick={() => Push()}>{Type[0] === 'EDIT' ? '광고 수정하기' : '광고 추가하기'}</AddBtn>
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

const AddX = styled.span`
    height: 10px;
    width: 50px;
    display: ${(props) => props.display};
    background-color: #000000;
    border-radius: 10px;
    cursor: pointer;
    overflow: visible;
    transition: 0.5s;
    transform-origin: center;

    &::after {
        content: '';
        height: 10px;
        width: 50px;
        display: block;
        background-color: #000000;
        border-radius: 10px;
        transform: rotate(90deg);
        transition: 0.5s;
    }
`

const InBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 50px;
`

const AddAd = styled.input.attrs({
    type: 'file',
    id: 'file'
})`
    display: none;
`

const AddAdLabel = styled.label.attrs({
    htmlFor: 'file'
})`
    width: 900px;
    height: 250px;
    background: #FFFFFF;
    background-image: url(${(props) => props.src});
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 20px;
    margin: 10px 0;
    cursor: ${(props) => props.mouse};

    display: flex;
    justify-content: center;
    align-items: center;

    ${(props) => props.src || `
        background: #888888;
        &:hover > span {
            background-color: #FFFFFF;
            &::after {
                background-color: #FFFFFF;
            }
            transform: scale(1.5);
        }
    `
    }
`

const SubTitle = styled.span`
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 20px;
  margin: 30px 0 0 20px;
  color: #FFFFFF;
`

const InputBox = styled.input`
    width: 406px;
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