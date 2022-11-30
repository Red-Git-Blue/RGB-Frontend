import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

export const Login_box = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-family: Roboto;
    font-style: normal;
    width: 30vw;
    min-width: 600px;
    height: 90vh;
    padding: 5vh 0;
`
export const Title = styled.span`
    font-family: 'NanumGothic';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;

    text-transform: uppercase;

    color: #FFFFFF;
`
export const Out_box = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
`

export const Sub_title = styled.span`
    font-family: 'NanumGothic';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;

    color: #fff;

    text-align: left;
    margin: 0 0 13px 24px;
`

export const Input_box = styled.input`
    width: 380px;
    height: 38px;

    background: transparent;
    border: 1px solid #FFFFFF;
    border-radius: 64px;
    padding: 0 24px 0 24px;
    outline: none;

    font-family: 'NanumGothic';
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 17px;
    color: #fff;

    text-align: left;
`

const Input_password_out_box = styled.div`
    width: 404px;
    height: 38px;

    background: transparent;
    border: 1px solid #FFFFFF;
    border-radius: 64px;
    padding: 0 0 0 24px;
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
`

const Input_password_box = styled.input`
    width: 332px;
    height: 38px;

    background: transparent;
    border: transparent;
    outline: none;
    
    font-family: 'NanumGothic', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 17px;
    color: #ffffff;
    text-align: left;
`

export const Button_box = styled.button`
    width: 430px;
    height: 50px;
    outline: none;
    border-radius: 64px;
    border: 1px solid #ffffff;
    background: ${(props) => props.background || '#FFFFFF'};
    color: ${(props) => props.color || '#000000'};
    margin-top: ${(props) => props.top || '20px'};
    overflow-x: visible;
    z-index: 2;

    font-family: 'NanumGothic', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: 0.3s;
    &:hover {
        transform: scale(1.05);
    }
`

export const Blur_box = styled.div`
    position: absolute;
    min-width: ${(props) => props.width || '1074px'};
    min-height: ${(props) => props.height || '638px'};

    background: rgba(0, 0, 0, 0.01);
    backdrop-filter: blur(120px);

    border-radius: 20px;
`

const PsswordBox = styled.div`
    width: 40px;
    height: 40px;
    background: #fff;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const Input_view = ({ type = 'text', name, text }) => {
    const [bool, setbool] = useState(true);

    return (
        <Out_box>
            <Sub_title>{name}</Sub_title>
            {
                type == 'text' ?
                    <Input_box type={'text'} placeholder={text} />
                    :
                    <Input_password_out_box>
                        {
                            bool ?
                                <>
                                    <Input_password_box type={type} placeholder={text} />
                                    <PsswordBox onClick={(() => setbool(false))}>
                                        <PasswordImage src='image/password_hidden.png' width='24px' height='24px' />
                                    </PsswordBox>
                                </>
                                :
                                <>
                                    <Input_password_box type='text' placeholder={text} />
                                    <PsswordBox onClick={(() => setbool(true))}>
                                        <PasswordImage src='image/password_view.png' width='24px' height='24px' />
                                    </PsswordBox>
                                </>
                        }
                    </Input_password_out_box>
            }
        </Out_box>
    )
}

const Auth_page_Box = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
`

const Auth_page_Title = styled.span`
    font-family: 'NanumGothic', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #fff;
    margin-right: 20px;
`

const Auth_page_Text = styled.span`
    font-family: 'NanumGothic', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    color: #FFF500;
    cursor: pointer;
    display: block;

    transition: 0.3s;
    &:hover {
        transform: scale(1.05);
    }
`

export const Auth_page = ({ string, name, move }) => {
    let navigate = useNavigate();

    return (
        <Auth_page_Box>
            <Auth_page_Title>{string}</Auth_page_Title>
            <Auth_page_Text onClick={() => navigate(move)}>{name} &gt;</Auth_page_Text>
        </Auth_page_Box>
    )
}

export const Background_view = styled.div`
    width: 100%;
    height: 100%;
    background: url('/image/background.png');
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
`

export const Left_box = ({ title, text1, text2, text3, text4, link }) => {
    return (
        <Set_box>
            <Text bottom='30px'>{title}</Text>
            <Text bottom='10px'>{text1}</Text>
            <Text weight='400' size='18px' height='21px' bottom='60px'>{text2}</Text>
            <Auth_page string={text3} name={text4} move={link} />
        </Set_box>
    )
}

export const Right_box = styled.div`
    width: 430px;
    display: flex;
    flex-direction: column;
    overflow-x: visible;
`

const Set_box = styled.div`
    font-family: 'NanumGothic', sans-serif;
    font-style: normal;
    display: flex;
    flex-direction: column;
    width: 444px;
`

export const Text = styled.span`
    font-family: 'NanumGothic', sans-serif;
    font-style: normal;
    font-weight: ${(props) => props.weight || '700'};;
    font-size: ${(props) => props.size || '24px'};
    line-height: ${(props) => props.height || '28px'};
    margin-bottom: ${(props) => props.bottom || '0px'};

    text-transform: uppercase;

    color: #FFFFFF;
`

export const Image = styled.img.attrs(({
    onError: (e) => console.log(e),
}))`
    width: ${(props) => props.width || '0px'};
    height: ${(props) => props.height || '0px'};
    object-fit: cover;
    border-radius: ${(props) => props.radius || '0px'};
`

const PasswordImage = styled.img.attrs(({
    onError: (e) => console.log(e),
}))`
    width: ${(props) => props.width || '0px'};
    height: ${(props) => props.height || '0px'};
    object-fit: cover;
    border-radius: 60px;
    background: #FFF;
`