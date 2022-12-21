import {Fragment, useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import {useQuery} from "react-query";
import {editBadgeInfo, editCategory, getDetailCoin, addTag, deleteTag, changeMainImg, changeIconImg, changeSubImg, deleteSubImg} from "./api";
import LoadingComponent from "./simpleLoading";

const EditModal = ({Set, Id, Reset}) => {
    const [nSwitch, setNSwitch] = useState(true);
    const [name, setName] = useState("");
    const [explain, setExplain] = useState("");
    const [price, setPrice] = useState(0);
    const [rank, setRank] = useState("");
    const [category, setCategory] = useState("");
    const [showTag, setShowTag] = useState([]);
    const [tagName, setTagName] = useState("");
    const [tagColor, setTagColor] = useState("");
    const [check, setCheck] = useState(undefined);
    const [pop, setPop] = useState(Pop);
    const [mPre, setMPre] = useState("");
    const [iPre, setIPre] = useState("");
    const [sPre, setSPre] = useState([]);
    const [subList, setSubList] = useState([]);
    const {data: editData, isLoading: loading3, refetch: re3, remove: rm2} = useQuery(['Edit'],
        () => getDetailCoin(Id),
        {refetchOnWindowFocus: false}
    );
    if (loading3) return <LoadingComponent/>;

    if (editData && nSwitch) {
        setName(editData.name);
        setPrice(editData.price);
        setRank(editData.rarity.name);
        setCategory(editData.category.categoryName);
        setExplain(editData.introduction);
        setShowTag(editData.tagList);
        setMPre(editData.mainImage.fileUrl);
        setIPre(editData.iconImage.fileUrl);
        setSPre(editData.subImages);
        setNSwitch(false);
    }

    const inputName = (e) => setName(e.target.value);
    const inputPrice = (e) => setPrice(e.target.value);
    const inputRank = (e) => setRank(e.target.value);
    const inputCategory = (e) => setCategory(e.target.value);
    const inputExplain = (e) => setExplain(e.target.value);
    const inputTagName = (e) => setTagName(e.target.value);
    const inputTagColor = (e) => setTagColor(e.target.value);

    const putJson = (e) => {
        e.preventDefault();
        e.persist();

        let mFiles = e.target.mfile.files;
        let iFiles = e.target.ifile.files;
        let sFiles = subList;
        console.log(mFiles);
        console.log(iFiles);
        console.log(sFiles);
        let mFormData = new FormData();
        let iFormData = new FormData();
        let sFormData = new FormData();

        mFormData.append("mainImage", mFiles[0]);
        iFormData.append("iconImage", iFiles[0]);
        if (sFiles[0]) {
            for (let i = 0; i < sFiles.length; i++) {
                sFormData.append("subImage", sFiles[i]);
                console.log('추가하고 있는 서브 이미지 : ' + sFormData.get('subImage').name);
                changeSubImg(Id, sFormData);
                sFormData.delete("subImage");
            }
        }

        editBadgeInfo(Id, {
            name: name,
            introduction: explain,
            price: price,
            rarityType: rank,
        }).finally(() =>
            editCategory(Id, category).finally(() =>
                Reset()
            )
        );
        mFiles[0] && changeMainImg(Id, mFormData);
        iFiles[0] && changeIconImg(Id, iFormData);
    }

    const addTagClick = () => {
        addTag(Id, tagName, tagColor);
        setShowTag([...showTag, {tagName: tagName, tagColor: tagColor}]);
    }

    const deleteTagClick = (index) => {
        deleteTag(Id, showTag[index].tagName);
        setShowTag(showTag.filter(Tag => Tag.tagName !== showTag[index].tagName));
        setCheck(undefined);
    }

    const deleteSubImageClick = (index) => {
        if (sPre[index].fileId === undefined) {
            setSPre(sPre.filter(img => img.fileUrl !== sPre[index].fileUrl));
            setSubList(subList.filter(img=>img.fileUrl !== subList[index].fileUrl));
        } else {
            console.log(sPre[index].fileId);
            deleteSubImg(Id, sPre[index].fileId);
            setSPre(sPre.filter(img => img.fileId !== sPre[index].fileId));
        }
    }

    const closeModal = () => {
        Set(false);
        rm2();
    }

    const insertM = (e, setPre) => {
        let reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onloadend = () => {
            const previewImgUrl = reader.result;
            if (previewImgUrl) {
                setPre(`${previewImgUrl}`);
            }
        }
    }

    const insertS = (e) => {
        let reader = new FileReader();
        console.log(sPre);
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            let newVar = [...subList, e.target.files[0]];
            setSubList(newVar);
            console.log(e.target.files[0]);
            console.log('subList = ' + newVar);
        }
        reader.onloadend = () => {
            const previewImgUrl = reader.result;
            if (previewImgUrl) {
                setSPre([...sPre, {fileUrl: `${previewImgUrl}`}]);
            }
        }
    }

    const editCheck = (
        <CheckBack Animation={pop}>
            <CheckDiv>
                <CheckFlex Jus="center" Height="100%">
                    <CheckText>정말 태그를 삭제하실건가요?</CheckText>
                </CheckFlex>
                <CheckFlex>
                    <CheckButton onClick={() => deleteTagClick(check)} Color="green">예</CheckButton>
                    <CheckButton onClick={() => {
                        setPop(RePop);
                        setTimeout(() => setCheck(undefined), 400);
                        setTimeout(() => setPop(Pop), 410);
                    }} Color="red">아니요</CheckButton>
                </CheckFlex>
            </CheckDiv>
        </CheckBack>
    )

    return (
        <>
            <Blur>
                <ModalBack>
                    <FlexBox>
                        <FlexDiv>
                            <Text Margin="40px">배지 이름</Text>
                            <Input value={name} onChange={(e) => inputName(e)}/>
                            <Text>배지 가격</Text>
                            <Input value={price} onChange={(e) => inputPrice(e)}/>
                            <Text>배지 등급</Text>
                            <Input value={rank} onChange={(e) => inputRank(e)}/>
                            <Text>배지 카테고리</Text>
                            <Input value={category} onChange={(e) => inputCategory(e)}/>
                            <Text>배지 설명</Text>
                            <TextArea value={explain} onChange={(e) => inputExplain(e)}/>
                            <Text>배지 태그 등록</Text>
                            <Input value={tagName} onChange={(e) => inputTagName(e)} placeholder="태그 이름"></Input>
                            <Input value={tagColor} onChange={(e) => inputTagColor(e)} placeholder="태그 색깔"></Input>
                            <Button onClick={addTagClick}>태그 추가</Button>
                        </FlexDiv>
                        <FlexDiv>
                            <Form onSubmit={(e) => putJson(e)}>
                                <Label htmlFor="mfile" pre={mPre}></Label>
                                <File type="file" name="mfile" id="mfile" onChange={(e) => insertM(e, setMPre)}></File>

                                <Label htmlFor="ifile" pre={iPre}></Label>
                                <File type="file" name="ifile" id="ifile" onChange={(e) => insertM(e, setIPre)}></File>

                                <CellDiv>
                                    <Label htmlFor="sfile" pr="flex" S="80px" backC="#222222"><p>+</p></Label>
                                    <File type="file" name="sfile" id="sfile" multiple="multiple" onChange={(e) => insertS(e)}></File>
                                    {sPre.map((el, index) => {
                                            return (
                                                <div key={index} onClick={() => deleteSubImageClick(index)}>
                                                    <Img src={sPre[index].fileUrl} S="80px"/>
                                                </div>
                                            );
                                        }
                                    )}
                                </CellDiv>
                                <Button Pos="absolute">배지 수정!</Button>
                            </Form>
                            <Button onClick={closeModal} Margin="40px">취소</Button>
                        </FlexDiv>
                    </FlexBox>
                    <FlexDiv>
                        <Text>추가된 태그</Text>
                        <TagDiv>
                            {showTag.map((info, index) => (
                                <Tag key={info.tagName} B={info.tagColor}>{info.tagName}<CloseBtn M="0" onClick={() => setCheck(index)}>X</CloseBtn></Tag>
                            ))}
                        </TagDiv>
                    </FlexDiv>
                </ModalBack>
                {(check !== undefined) && editCheck}
            </Blur>
        </>
    );
}

export default EditModal;

const Img = styled.img`
  width: ${props => props.S || "200px"};
  height: ${props => props.S || "200px"};
  border-radius: 20px;
  object-fit: cover;
`;
const Form = styled.form`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const CellDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 470px;
  height: 200px;
`;
const Label = styled.label`
  background-image: url(${props => props.pre});
  width: ${props => props.S || "200px"};
  height: ${props => props.S || "200px"};
  border-radius: 20px;
  font-size: 40px;
  background-size: cover;
  background-color: ${props => props.backC};
  color: #666666;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
`;
const File = styled.input`
  display: none;
`;
const Text = styled.p`
  font-size: 14px;
  font-weight: 900;
  color: #00a6ff;
  margin: ${props => props.Margin || "10px"} 0 0 0;
`;
const RePop = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(0);
  }
`;
const Pop = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;
const CheckButton = styled.button`
  background-color: ${props => props.Color};
  color: white;
  width: 180px;
  height: 50px;
  border-radius: 100px;
  border: none;
  transition: 0.3s cubic-bezier(.47, 1.64, .41, .8);
  font-size: 16px;
  font-weight: 900;

  &:hover {
    transform: scale(1.1);
  }
`;
const CheckFlex = styled.div`
  display: flex;
  justify-content: ${props => props.Jus || "space-between"};
  align-items: center;
  width: 100%;
  height: ${props => props.Height};
`;
const CheckText = styled.p`
  color: black;
  font-size: 18px;
  font-weight: 900;
`;
const CheckDiv = styled.div`
  height: 200px;
  width: 400px;
  padding: 40px;
  background-color: white;
  border-radius: 20px;
  box-shadow: black 0 0 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const CheckBack = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  animation: ${props => props.Animation} 0.5s;
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
const Tag = styled.div`
  padding: 6px 20px 6px 20px;
  margin: 4px;
  border-radius: 100px;
  background-color: #${props => props.B};
  color: white;
  font-family: Roboto, sans-serif;
  font-weight: 900;
`;
const TagDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  width: 484px;
`;
const Button = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 100px;
  border: none;
  background-color: #00a6ff;
  font-size: 14px;
  font-weight: 900;
  margin: 0 ${props => props.Margin || "10px"} 0 0;
  transition: 0.3s cubic-bezier(.47, 1.64, .41, .8);

  &:hover {
    transform: scale(1.1);
    background-color: lightblue;
  }
`;
const FlexDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  width: 90%;
  padding-left: 10%;
  height: 100%;
`;
const TextArea = styled.textarea`
  width: 400px;
  margin: 10px 0 10px 0;
  height: 80px;
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
  width: 400px;
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
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalBack = styled.div`
  height: 100vh;
  width: 60%;
  background-color: black;
  box-shadow: 0 0 200px rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: column;
  animation: ${Fade} 0.3s;
`;