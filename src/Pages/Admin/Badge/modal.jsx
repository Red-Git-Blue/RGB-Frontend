import {Fragment, useState} from "react";
import styled, {keyframes} from "styled-components";
import axios from "axios";
import {focusManager} from "react-query";

const BaseUrl = 'http://local.lite24.net:8080';
const AccessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTY2OTgwNTIzNSwiZXhwIjoxNjY5ODkxNjM1fQ.S05JYfGVRYAdBlFX8e5XACCCWYyEb8APVw-xPiW5Keg';

const Modal = ({Set, Re}) => {
    const [bName, setBName] = useState("");
    const [tagName, setTagName] = useState("");
    const [tagColor, setTagColor] = useState("");
    const [price, setPrice] = useState(0);
    const [explain, setExplain] = useState("");
    const [rank, setRank] = useState("");
    const [category, setCategory] = useState("");
    const [tag, setTag] = useState([]);
    const [jjason, setJjason] = useState({});
    const Change = e => setBName(e.target.value);
    const TagChange = e => setTagName(e.target.value);
    const ColorChange = e => setTagColor(e.target.value);
    const RankChange = e => setRank(e.target.value);
    const CategoryChange = e => setCategory(e.target.value);
    const ExplainChange = e => setExplain(e.target.value);
    const PriceChange = e => setPrice(e.target.value);

    console.log(tag);
    const TagClick = () => {
        console.log(tagName);
        console.log(tagColor);
        tagName && tagColor ? setTag([...tag, {
                name: tagName,
                color: tagColor,
            }])
            :
            console.log("다 입력해!!");
        setTagName("");
        setTagColor("");
    }

    async function Response(e) {
        e.preventDefault();
        e.persist();

        let mFiles = e.target.mfile.files;
        let iFiles = e.target.ifile.files;
        let sFiles = e.target.sfile.files;
        let formData = new FormData();

        setJjason({
            name: bName,
            introduction: explain,
            price: price,
            rarityType: rank,
            tags: tag,
            category: category,
        });
        console.log(jjason);

        formData.append("mainImage", mFiles[0]);
        formData.append("iconImage", iFiles[0]);
        formData.append("subImages", sFiles[0]);

        formData.set("req", new Blob([JSON.stringify(jjason)], {
            type: "application/json"
        }));

        for (let value of formData.values()) {
            console.log(value);
        }

        await axios({
            method: "POST",
            url: BaseUrl + "/api/item/badge",
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${AccessToken}`
            },
            data: formData,
        });
        Re();
    }

    return (
        <Fragment>
            <Blur>
                <ModalBack>
                    <TopBar>
                        <Text>배지 추가</Text>
                        <CloseBtn onClick={() => Set(false)}>close</CloseBtn>
                    </TopBar>
                    <AddSection>
                        <form onSubmit={(e) => Response(e)} style={{
                            color: "white",
                            height: "200px",
                        }}>
                            메인 배지
                            <input type="file" name="mfile" multiple="multiple"/><br/>
                            아이콘 배지
                            <input type="file" name="ifile" multiple="multiple"/><br/>
                            서브 배지
                            <input type="file" name="sfile" multiple="multiple" style={{marginBottom: "20px"}}/><br/>
                            <input value={bName} onChange={Change} type="text" placeholder="뱃지 이름"/><br/>
                            <input value={price} onChange={PriceChange} type="number" placeholder="뱃지 가격"/><br/>
                            <input value={rank} onChange={RankChange} type="text" placeholder="랭크"/><br/>
                            <input value={category} onChange={CategoryChange} type="text" placeholder="카테고리"/><br/>
                            <input value={tagName} onChange={TagChange} type="text" placeholder="태그"/><br/>
                            <input value={tagColor} onChange={ColorChange} type="text" placeholder="태그 색"/><br/>
                            <input value={explain} onChange={ExplainChange} type="text" placeholder="설명"/><br/>
                            <button>배지추가!</button>
                        </form>
                    </AddSection>
                    <button onClick={TagClick}>태그추가</button>
                </ModalBack>
            </Blur>
        </Fragment>
    );
}

export default Modal;

const Fade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const Blur = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  height: 100%;
  width: 100%;
  top: 0;
  padding: 0 300px 0 300px;
  animation: ${Fade} 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalBack = styled.div`
  height: 500px;
  width: 60%;
  background-color: black;
  box-shadow: 0 0 200px rgba(255, 255, 255, 0.25);
  border-radius: 20px;
`;
const TopBar = styled.div`
  width: 100%;
  height: 60px;
  background-color: white;
  border-radius: 20px 20px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Text = styled.p`
  margin-left: 30px;
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 20px;
`;
const CloseBtn = styled.button`

`;
const AddSection = styled.section`
  padding: 20px 100px 20px 100px;
`;