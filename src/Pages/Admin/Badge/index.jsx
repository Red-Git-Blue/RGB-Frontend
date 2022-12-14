import {Fragment, useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import axios from "axios";
import Modal from './modal';
import {useQuery} from "react-query";
import {getCoinList, deleteBadge} from "./api";
import DetailModal from "./detailModal";
import EditModal from "./editModal";

const Index = () => {
    const [isOpen, setOpen] = useState(false);
    const [detail, setDetail] = useState(false);
    const [edit, setEdit] = useState(false);
    const [contextMenu, setContextMenu] = useState(false);
    const handleClick = () => setOpen(true);
    const {data: datList, isLoading: loading1, error: er1, refetch: re1} = useQuery(['List'],
        () => getCoinList()
    )
    const [dats, setDats] = useState(0);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const [bId, setBId] = useState(0);

    if (loading1) return <div>로딩중..</div>;
    if (er1) return <div>에러가 발생했습니다</div>;
    if (!datList) return <button>불러오기</button>;

    const DetailR = (dat) => {
        setDetail(true);
        setDats(dat);
    }

    const RightClick = (e, id) => {
        e.preventDefault();
        setMousePosition({x: e.pageX, y: e.pageY});
        setBId(id);
        setContextMenu(true);
    }

    const backClick = () => setContextMenu(false);

    const delClick = () => deleteBadge(bId).finally(() => re1());

    const editClick = () => setEdit(true);

    const contextMenuMarkup = (
        <ContextMenu style={{top: mousePosition.y, left: mousePosition.x}}>
            <ConDiv onClick={editClick}>수정</ConDiv>
            <ConDiv onClick={delClick}>삭제</ConDiv>
        </ContextMenu>
    );

    return (
        <Fragment>
            <Body onClick={backClick}>
                {isOpen ? <Modal Set={setOpen} Re={re1}/> : null}
                {detail ? <DetailModal Set={setDetail} Detail={dats}/> : null}
                {edit ? <EditModal Set={setEdit} Id={bId} Reset={re1}/> : null}
                <Text Margin="100px" Size="36px" W="200">Manage Badge</Text>
                <FlexDiv>
                    <Text>Badge List</Text>
                    <AddButton onClick={handleClick}>배지 추가</AddButton>
                </FlexDiv>
                <BadgeList>
                    {datList.content.map((dat) => (
                        <BadgeDiv key={dat.id} onClick={() => DetailR(dat.id)} name={dat.id}
                                  onContextMenu={(e) => RightClick(e, dat.id)}>
                            <Image src={dat.badgeMainFile.fileUrl} loading="lazy"/>
                            <Text Size="20px" W="100">{dat.name}</Text>
                        </BadgeDiv>
                    ))}
                </BadgeList>
                {contextMenu && contextMenuMarkup}
            </Body>
        </Fragment>
    );
}

export default Index;

const PageMove = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100px);
    animation-timing-function: ease;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;
const Fade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const ConDiv = styled.button`
  color: white;
  height: auto;
  width: 100px;
  padding: 20px 20px 20px 20px;
  background-color: #222222;
  border-bottom: solid #222222 2px;
  border-top: none;
  border-right: none;
  border-left: none;
  line-height: 0;
  transition: 0.3s;

  &:hover {
    background-color: #111111;
    border-bottom: #00a6ff solid 2px;
  }
`;
const ContextMenu = styled.div`
  box-shadow: black 0 0 100px;
  position: absolute;
  background-color: #222222;
  height: auto;
  width: auto;
  border-radius: 20px;
  overflow: hidden;
  padding: 10px 0 10px 0;
  animation: ${Fade} 0.3s;
  display: flex;
  justify-content: center;
  flex-direction: column;
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
  animation: ${PageMove} 0.5s;

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
  animation: ${PageMove} 0.5s;
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