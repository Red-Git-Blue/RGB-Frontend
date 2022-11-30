import {Fragment, useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {useMediaQuery} from "react-responsive";
import Modal from './modal';
import {useQuery} from "react-query";

const BaseUrl = 'http://local.lite24.net:8080';

/*async function Acces() {
    const Token = await axios({
        method: 'post',
        url: BaseUrl + '/api/auth/admin/sign-in',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: "asdf@asd.asd",
            password: "asd",
        }),
    })
    return Token.data;
}

const AccesToken = Acces.accessToken;*/

async function Response() {
    const badgeRes = await axios({
            method: 'get',
            url: BaseUrl + '/api/item/badge?idx&size=20',
        }
    )
    return badgeRes.data;
}

async function DetailResponse({asdf}) {
    const detailRes = await axios({
        method: 'get',
        url: BaseUrl + '/api/item/badge/' + asdf,
    })
    return detailRes.data;
}

const Index = () => {
    const [isOpen, setOpen] = useState(false);
    const [detail, setDetail] = useState(false);
    const [detailInfo, setDetailInfo] = useState();
    const handleClick = () => {
        setOpen(true);
    };
    const detailClick = () => {
        setDetail(true);
    };
    const {isLoading, error, data, refetch} = useQuery([],
        () => Response()
    )

    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!data) return <button>불러오기</button>;
    console.log(data);

    const DetailR = ({asdf}) => {
        setDetailInfo(() => DetailResponse({asdf}));
        console.log(detailInfo);
    }

    return (
        <Fragment>
            <Body>
                {isOpen ? <Modal Set={setOpen} Re={refetch}/> : null}
                <Text Margin="100px" Size="36px" W="200">Manage Badge</Text>
                <FlexDiv>
                    <Text>Badge List</Text>
                    <AddButton onClick={handleClick}>배지 추가</AddButton>
                </FlexDiv>
                <BadgeList>
                    {data.content.map((dat) => (
                        <BadgeDiv key={dat.id} draggable onClick={() => DetailR({asdf: dat.id})} name={dat.id}>
                            <Image src={dat.badgeMainFile.fileUrl}></Image>
                            <Text Size="20px" W="100">{dat.name}</Text>
                            {/*<TagDiv>*/}
                            {/*    {dat.tagList.map((info)=>(*/}
                            {/*        <Tag key={info.tagName}>{info.tagName}</Tag>*/}
                            {/*    ))}*/}
                            {/*</TagDiv>*/}
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
  height: 240px;
  width: 240px;
  border-radius: 10px;
  margin-bottom: 20px;
  object-fit: cover;
`;
const BadgeDiv = styled.button`
  background-color: #000000;
  margin: 10px;
  width: 310px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 200px rgba(255, 255, 255, 0.25);
    z-index: 0;
  }
`;
const BadgeList = styled.div`
  background-color: #222222;
  width: 100%;
  height: auto;
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
  font-weight: ${props => props.W || "600"};
  font-size: ${props => props.Size || '28px'};
  color: white;
  margin-bottom: ${props => props.Margin || '0'};
`;
const Body = styled.div`
  height: auto;
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

  &:hover {
    transform: scale(1.1);
    background-color: black;
    border: solid 2px white;
    color: white;
  }
`;