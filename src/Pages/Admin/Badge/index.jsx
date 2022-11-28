import {Fragment, useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {useMediaQuery} from "react-responsive";
import Modal from './modal';
import {useQuery} from "react-query";

const BaseUrl = 'http://local.lite24.net:8080';

async function Acces(){
    const Token = await axios({
        method:'post',
        url: BaseUrl + '/api/auth/admin/sign-in',
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            email: "asdf@asd.asd",
            password: "asd",
        }),
    })
    return Token.data;
}

const AccesToken = Acces.accessToken;

async function Response(){
    const badgeRes = await axios({
            method:'get',
            url: BaseUrl + '/api/item/badge',
        }

    )
    return badgeRes.data;
}

const Index = () => {
    useEffect(()=>{
        Response();
    }, []);
    const [isOpen, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const {isLoading, error, data, isRefetching} = useQuery([],
        () => Response()
    )

    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!data) return <button>불러오기</button>;
    console.log(data);

    return(
        <Fragment>
            <Body>
                {isOpen?<Modal Set={setOpen}/>:null}
                <Text Margin="100px" Size="36px" W="200">Manage Badge</Text>
                <FlexDiv>
                    <Text>Badge List</Text>
                    <AddButton onClick={handleClick}>배지 추가</AddButton>
                </FlexDiv>
                <BadgeList>
                    {data.content.map((dat)=>(
                        <BadgeDiv key={dat.id} draggable>
                            <Image src={dat.badgeMainFile.fileUrl}></Image>
                            <Text Margin="20px">{dat.name}</Text>
                            <TagDiv>
                                {dat.tagList.map((info)=>(
                                    <Tag key={info.tagName}>{info.tagName}</Tag>
                                ))}
                            </TagDiv>
                        </BadgeDiv>
                    ))}
                </BadgeList>
            </Body>
        </Fragment>
    );
}

export default Index;

const Tag = styled.div`
  padding: 6px 20px 6px 20px;
  margin: 4px;
  border-radius: 100px;
  background-color: #444444;
  color: white;
  font-family: Roboto, sans-serif;
  font-weight: 100;
`;
const TagDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Image = styled.img`
  height: 100px;
  border-radius: 10px;
  margin-bottom: 20px;
`;
const BadgeDiv = styled.div`
  background-color: #000000;
  margin: 10px;
  width: 200px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;
const BadgeList = styled.div`
  background-color: #222222;
  width: 100%;
  height: 150vh;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: start;
  align-content: start;
  padding: 60px 60px 60px 60px;
`;
const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
`;
const Text = styled.p`
  font-family: Roboto, sans-serif;
  font-weight: ${props => props.W||"600"};
  font-size: ${props => props.Size||'28px'};
  color: white;
  margin-bottom: ${props => props.Margin||'0'};
`;
const Body = styled.div`
  height: 200vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 100px 300px 100px 300px;
`;
const AddButton = styled.button`
  height: 50px;
  width: 200px;
  background-color: #222222;
  border-radius: 20px;
  border: solid 2px black;
  color: #888888;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  transition: 0.3s;
  &:hover{
    transform: scale(1.1);
    background-color: black;
    border: solid 2px white;
    color: white;
  }
`;