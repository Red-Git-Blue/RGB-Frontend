import {Fragment, useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import axios from "axios";
import {focusManager} from "react-query";
import {postBadge} from "./api";

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
    const [previewImg, setPreviewImg] = useState("");
    const [preImg, setPreImg] = useState(null);
    const [previewImg2, setPreviewImg2] = useState("");
    const [preImg2, setPreImg2] = useState(null);
    const [subImgs, setSubImgs] = useState([]);
    const [img, setImg] = useState([]);
    const Change = e => setBName(e.target.value);
    const TagChange = e => setTagName(e.target.value);
    const ColorChange = e => setTagColor(e.target.value);
    const RankChange = e => setRank(e.target.value);
    const CategoryChange = e => setCategory(e.target.value);
    const ExplainChange = e => setExplain(e.target.value);
    const PriceChange = e => setPrice(e.target.value);

    const insertM = (e, setPI) => {
        let reader = new FileReader();

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            setPreImg(e.target.files[0]);
        }
        reader.onloadend = () => {
            const previewImgUrl = reader.result;
            if (previewImgUrl) {
                setPI(`${previewImgUrl}`);
            }
        }
    }

    const insertS = (e) => {
        let reader = new FileReader();

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            setImg([...img, e.target.files[0]]);
        }
        reader.onloadend = () => {
            const previewImgUrl = reader.result;
            if (previewImgUrl) {
                setSubImgs([...subImgs, previewImgUrl]);
            }
        }
    }

    const SubDelete = (index) => {

    }

    const mRemove = (remove) => {
        remove("");
    }

    const TagClick = () => {
        tagName && tagColor ? setTag([...tag, {
                name: tagName,
                color: tagColor,
            }])
            :
            alert("다 입력해!!");
        setTagName("");
        setTagColor("");
    }

    const TagRemove = index => setTag(tag.filter(Tag => Tag.name !== tag[index].name));

    const Res = e => {
        e.preventDefault();
        e.persist();

        let mFiles = e.target.mfile.files;
        let iFiles = e.target.ifile.files;
        let sFiles = img;
        let formData = new FormData();

        formData.append("mainImage", mFiles[0]);
        formData.append("iconImage", iFiles[0]);
        for (let i = 0; i < sFiles.length; i++) formData.append("subImages", sFiles[i]);

        setJjason({
            name: bName,
            introduction: explain,
            price: price,
            rarityType: rank,
            tags: tag,
            category: category,
        });
        console.log(jjason);

        formData.set("req", new Blob([JSON.stringify(jjason)], {
            type: "application/json"
        }));
        bName && rank && price && explain && tag && previewImg && previewImg2 && jjason ? console.log('success!') : console.log('fail...');
        postBadge(Re, e, formData);
    }

    return (
        <Fragment>
            <Blur>
                <ModalBack>
                    <TopBar>
                        <Text>배지 추가</Text>
                        <CloseBtn onClick={() => Set(false)}>X</CloseBtn>
                    </TopBar>
                    <AddSection>
                        <Form onSubmit={(e) => Res(e)} style={{
                            color: "white",
                            height: "200px",
                        }}>
                            {/*------------------------------------------------------------------------Add Main Image*/}
                            <Label htmlFor="mfile" pre={previewImg}><>+</>
                            </Label>
                            {previewImg ?
                                <CloseBtn C="red" M="0" onClick={() => mRemove(setPreviewImg)}>X</CloseBtn> : null}
                            <File type="file" name="mfile" multiple="multiple" id="mfile"
                                  onChange={(e) => insertM(e, setPreviewImg)}></File>
                            {previewImg ?
                                <Fragment>
                                    <Img src={previewImg}/>
                                    <p>{}</p>
                                </Fragment>
                                : null}

                            {/*------------------------------------------------------------------------Add Icon Image*/}
                            <Label htmlFor="ifile" pre={previewImg2}>+</Label>
                            {previewImg2 ?
                                <CloseBtn C="red" M="0" onClick={() => mRemove(setPreviewImg2)}>X</CloseBtn> : null}
                            <File type="file" name="ifile" multiple="multiple" id="ifile"
                                  onChange={(e) => insertM(e, setPreviewImg2)}></File>
                            {previewImg2 !== "" ? <Img src={previewImg2}/> : null}

                            {/*------------------------------------------------------------------------Add Sub Images*/}
                            <Label htmlFor="sfile" pr="flex" S="80px">+</Label>
                            <File type="file" name="sfile" multiple="multiple" id="sfile"
                                  style={{marginBottom: "20px"}} onChange={(e) => insertS(e)}></File>
                            {subImgs !== "" ? img.map((el, index) => {
                                    const {name} = el;
                                    return (
                                        <div key={index} onClick={()=>SubDelete(index)}>
                                            <Img src={subImgs[index]} S="80px"/>
                                            <p>{name}</p>
                                        </div>
                                    );
                                }
                            ) : null}
                            <AddBtn>배지추가!</AddBtn>
                        </Form>
                        <FlexDiv>
                            <FlexDiv Direction="column">
                                <Input value={bName} onChange={Change} type="text" placeholder="뱃지 이름"></Input>
                                <Input value={price} onChange={PriceChange} type="number" placeholder="뱃지 가격"></Input>
                                <Input value={rank} onChange={RankChange} type="text" placeholder="랭크"></Input>
                                <Input value={category} onChange={CategoryChange} type="text"
                                       placeholder="카테고리"></Input>
                                <TextArea value={explain} onChange={ExplainChange} placeholder="설명"></TextArea>
                            </FlexDiv>
                            <FlexDiv Direction="column">
                                <Input value={tagName} onChange={TagChange} type="text" placeholder="태그"></Input>
                                <Input value={tagColor} onChange={ColorChange} type="text" placeholder="태그 색"></Input>
                                <AddBtn onClick={TagClick}>태그추가</AddBtn>
                                <TagDiv>
                                    {tag.map((info, index) => (
                                        <Tag key={info.name} B={info.color}>{info.name}<CloseBtn M="0"
                                                                                                 onClick={() => TagRemove(index)}>X</CloseBtn></Tag>
                                    ))}
                                </TagDiv>
                            </FlexDiv>
                        </FlexDiv>
                    </AddSection>
                </ModalBack>
            </Blur>
        </Fragment>
    );
}

export default Modal;

const Img = styled.img`
  width: ${props => props.S || "200px"};
  height: ${props => props.S || "200px"};
  border-radius: 20px;
  border: #444444 solid 2px;
  object-fit: cover;
`;
const Label = styled.label`
  background-color: #333333;
  width: ${props => props.S || "200px"};
  height: ${props => props.S || "200px"};
  border-radius: 20px;
  display: ${props => props.pr || (props => props.pre != "" ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;
const File = styled.input`
  display: none;
`;
const Tag = styled.div`
  padding: 6px 20px 6px 20px;
  margin: 4px;
  border-radius: 100px;
  background-color: #${props => props.B};
  color: white;
  font-family: Roboto, sans-serif;
  font-weight: 100;
`;
const TagDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const AddBtn = styled.button`
  width: 120px;
  height: 40px;
  color: black;
  background-color: #00a6ff;
  border-radius: 100px;
  margin: 10px 0 10px 0;
  font-weight: 600;
  font-size: 16px;
  font-family: NanumGothicExtraBold, sans-serif;
`;
const Form = styled.form`
  display: flex;
  justify-content: space-between;
`;
const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${props => props.Direction || "row"};
  align-items: center;
  width: 100%;
`;
const TextArea = styled.textarea`
  width: 80%;
  margin: 10px 0 10px 0;
  height: 120px;
  border: #222222 solid 2px;
  border-radius: 10px;
  padding: 6px 20px 6px 20px;
  background-color: #222222;
  color: white;
  resize: none;

  &:focus {
    border: #00a6ff solid 2px;
    outline: none;
  }
`;
const Input = styled.input`
  width: 80%;
  margin: 10px 0 10px 0;
  height: 30px;
  border: #222222 solid 2px;
  border-radius: 30px;
  padding: 6px 20px 6px 20px;
  background-color: #222222;
  color: white;

  &:focus {
    border: #00a6ff solid 2px;
    outline: none;
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
  height: 800px;
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
  width: 30px;
  height: 30px;
  font-size: 20px;
  line-height: 0;
  margin-right: ${props => props.M || "30px"};
  border: none;
  border-radius: 100%;
  background: ${props => props.C || "none"};
  transition: 0.3s;

  &:hover {
    background-color: silver;
  }
`;
const AddSection = styled.section`
  padding: 20px 60px 20px 60px;
`;