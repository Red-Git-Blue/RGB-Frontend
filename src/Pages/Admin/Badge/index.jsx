import {Fragment, useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import Modal from './modal';
import {useQuery} from "react-query";
import {getCoinList, getDetailCoin} from "./api";
import DetailModal from "./detailModal";

const Index = () => {
    const [isOpen, setOpen] = useState(false);
    const [detail, setDetail] = useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const {data: datList, isLoading, error, refetch} = useQuery(['List'],
        () => getCoinList()
    )
    const [dats, setDats] = useState(0);

    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!datList) return <button>불러오기</button>;
    console.log(datList);

    const DetailR = (dat) => {
        console.log("dat = "+dat);
        setDetail(true);
        setDats(dat);
    }

    return (
        <Fragment>
            <Body>
                {isOpen ? <Modal Set={setOpen} Re={refetch}/> : null}
                {detail ? <DetailModal Set={setDetail} Detail={dats}/> : null}
                <Text Margin="100px" Size="36px" W="200">Manage Badge</Text>
                <FlexDiv>
                    <Text>Badge List</Text>
                    <AddButton onClick={handleClick}>배지 추가</AddButton>
                </FlexDiv>
                <BadgeList>
                    {datList.content.map((dat) => (
                        <BadgeDiv key={dat.id} onClick={() => DetailR(dat.id)} name={dat.id}>
                            <Image src={dat.badgeMainFile.fileUrl}/>
                            <Text Size="20px" W="100">{dat.name}</Text>
                        </BadgeDiv>
                    ))}
                </BadgeList>
            </Body>
        </Fragment>
    );
}

export default Index;

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