import {Fragment, useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import axios from "axios";
import {useQuery} from "react-query";
import {BaseUrl} from "../../../export/baseUrl";
import {useCookies} from "react-cookie";
import {toast} from "react-toastify";

const Index = () => {
    const {data: categoryList, isLoading: cLoading, refetch: CRe} = useQuery(['category'],
        () => getCategoryList()
    );
    const [cookies, ,] = useCookies();
    const [cOpen, setCOpen] = useState(false);
    const [cName, setCName] = useState('');
    const [cColor, setCColor] = useState(["#FFFFFF", "#FFFFFF"]);
    const [imgFile, setImgFile] = useState(undefined);
    const [preImg, setPreImg] = useState(undefined);
    const [isAdd, setIsAdd] = useState(false);
    const [mousePos, setMousePos] = useState({x: 0, y: 0});
    const [cId, setCId] = useState(0);
    const [contextMenu, setContextMenu] = useState(false);
    if (cLoading) return <div>로딩딩딩딩딩딩딩딩딩디리리딩디리딩딩딩</div>;

    async function getCategoryList() {
        const getCategoryListRes = await axios({
            method: 'get',
            url: BaseUrl + '/item/category?idx&size=20',
        })
        return getCategoryListRes.data;
    }

    async function postCategoryList(formData) {
        const postCategoryListRes = await axios({
            method: 'post',
            url: BaseUrl + '/item/category',
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${cookies.accessToken}`
            },
            data: formData,
        })
        CRe();
    }

    async function editCategoryList(jjason) {
        const editCategoryListRes = await axios({
            method: 'put',
            url: BaseUrl + '/item/category/' + categoryList.content[cId].categoryName,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.accessToken}`
            },
            data: jjason,
        })
        CRe();
    }

    async function editIcon(formData) {
        const editIconRes = await axios({
            method: 'post',
            url: BaseUrl + '/item/category/' + categoryList.content[cId].categoryName,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${cookies.accessToken}`
            },
            data: formData,
        })
        CRe();
    }

    async function deleteCategoryList() {
        const deleteCategoryListRes = await axios({
            method: 'delete',
            url: BaseUrl + '/item/category/' + categoryList.content[cId].categoryName,
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`
            },
        }).catch(() => {
            toast.error('사용중인 카테고리는 삭제가 불가합니다');
        })
        CRe();
    }

    const categoryOpen = () => setCOpen(true);
    const categoryClose = () => {
        setPreImg(undefined);
        setCOpen(false);
        setImgFile(undefined);
        setCColor(["#FFFFFF", "#FFFFFF"]);
        setCName('');
        setIsAdd(false);
    }

    const insertImg = (e) => {
        let reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            setImgFile(e.target.files[0]);
        }
        reader.onloadend = () => {
            const previewImgUrl = reader.result;
            if (previewImgUrl) {
                setPreImg(`${previewImgUrl}`);
            }
        }
    }

    const categoryAdd = () => {
        if (imgFile !== undefined && cName !== undefined) {
            let formData = new FormData();
            formData.append("categoryIconFile", imgFile);
            formData.set("req", new Blob([JSON.stringify({
                name: cName,
                startColor: cColor[0],
                endColor: cColor[1],
            })], {
                type: "application/json"
            }));
            postCategoryList(formData);
        } else {
            toast.error('모두 입력해주세요!!!!!!!!!!');
        }
    }

    const startColorChange = (e) => setCColor([e, cColor[1]]);
    const endColorChange = (e) => setCColor([cColor[0], e]);

    const colorClick = (e) => {
        setMousePos({x: e.pageX, y: e.pageY});
        console.log('click!!!');
    }

    const RightClick = (e, id) => {
        e.preventDefault();
        setMousePos({x: e.pageX, y: e.pageY});
        setCId(id);
        setContextMenu(true);
    }

    const backClick = () => setContextMenu(false);

    const editClick = () => {
        setIsAdd(true);
        setCOpen(true);
        setCColor(["#" + categoryList.content[cId].color.startColor, "#" + categoryList.content[cId].color.endColor]);
        setCName(categoryList.content[cId].categoryName);
        setPreImg(categoryList.content[cId].categoryIcon.fileUrl);
    }

    const categoryEdit = () => {
        let formData = new FormData();
        if(imgFile) {
            formData.append("categoryIconFile", imgFile);
            editIcon(formData);
        }
        let jjason = JSON.stringify({
            startColor: cColor[0],
            endColor: cColor[1],
        })
        editCategoryList(jjason);
    }

    const delClick = () => {
        deleteCategoryList();
    }

    const contextMenuMarkup = (
        <ContextMenu style={{top: mousePos.y, left: mousePos.x}}>
            <ConDiv onClick={editClick}>수정</ConDiv>
            <ConDiv onClick={delClick}>삭제</ConDiv>
        </ContextMenu>
    );

    const addCategory = (
        <AddBack>
            <AddDiv>
                <CategoryBox Start={cColor[0]} End={cColor[1]}>
                    <Label htmlFor="cFile" pre={preImg} Back={preImg && "black"}><Plus Dis={preImg && "none"}>+</Plus></Label>
                    <File type="file" id="cFile" name="cFile" onChange={(e) => insertImg(e)}></File>
                    <Text Size="20px" W="900" Top="20px">{cName}</Text>
                </CategoryBox>
                {!isAdd ?
                    <>
                        <Text Size="20px" W="600" Width="400px" Top="20px">카테고리 이름</Text>
                        <Input value={cName} onChange={(e) => setCName(e.target.value)} placeholder="카테고리 이름을 입력해주세요"/>
                    </> : null
                }
                <AddFlex>
                    <InputColor
                        id="start"
                        onChange={(e) => startColorChange(e.target.value)}
                        name="start"
                        value={cColor[0]}
                        style={{top: mousePos.y, left: mousePos.x}}
                    />
                    <ColorLabel htmlFor='start' onClick={(e) => colorClick(e)} color={cColor[0]}/>
                    <InputColor
                        id="end"
                        onChange={(e) => endColorChange(e.target.value)}
                        name="end"
                        value={cColor[1]}
                        style={{top: mousePos.y, left: mousePos.x}}
                    />
                    <ColorLabel htmlFor='end' onClick={(e) => colorClick(e)} color={cColor[1]}/>
                </AddFlex>
                <AddFlex Jus="end">
                    {!isAdd && <Button onClick={categoryAdd}>추가</Button>}
                    {isAdd && <Button onClick={categoryEdit}>수정</Button>}
                    <Button onClick={categoryClose}>취소</Button>
                </AddFlex>
            </AddDiv>
        </AddBack>
    )

    return (
        <Fragment>
            <Body onClick={backClick}>
                <Text Margin="100px" Size="36px" W="200">Manage Category</Text>
                <FlexDiv>
                    <Text>Category List</Text>
                    <AddButton onClick={categoryOpen}>카테고리 추가</AddButton>
                </FlexDiv>
                <CategoryList>
                    {categoryList.content.map((dat, index) => (
                        <CategoryDiv key={dat.categoryName} name={dat.id} Start={dat.color.startColor} End={dat.color.endColor} onContextMenu={(e) => RightClick(e, index)}>
                            <Image Big="80px" src={dat.categoryIcon.fileUrl} loading="lazy"/>
                            <Text Size="20px" W="900">{dat.categoryName}</Text>
                        </CategoryDiv>
                    ))}
                </CategoryList>
                {cOpen && addCategory}
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
const ColorLabel = styled.label.attrs((props) => ({
    style: {
        background: props.color,
    },
}))`
  width: 48%;
  height: 100px;
  border-radius: 20px;
`;
const InputColor = styled.input.attrs({
    type: 'color',
})`
  position: fixed;
  opacity: 0;
`;
const Plus = styled.p`
  display: ${props => props.Dis};
`;
const Label = styled.label`
  background-image: url(${props => props.pre});
  width: ${props => props.S || "200px"};
  height: ${props => props.S || "200px"};
  border-radius: 20px;
  font-size: 40px;
  background-size: cover;
  background-color: ${props => props.Back || "#222222"};
  color: #666666;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
`;
const File = styled.input`
  display: none;
`;
const AddFlex = styled.div`
  width: 400px;
  display: flex;
  justify-content: ${props => props.Jus || "space-between"};
  align-items: center;
  margin-top: 20px;
`;
const Button = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 100px;
  border: none;
  background-color: #00a6ff;
  font-size: 14px;
  font-weight: 900;
  margin: 0 0 0 20px;
  transition: 0.3s cubic-bezier(.47, 1.64, .41, .8);

  &:hover {
    transform: scale(1.1);
    background-color: lightblue;
  }
`;
const Input = styled.input`
  width: 360px;
  margin: 20px 0 0 0;
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
const AddDiv = styled.div`
  padding: 60px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 0 0 200px rgba(255, 255, 255, 0.25);
`;
const AddBack = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  animation: ${Fade} 0.3s;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  height: ${props => props.Big};
  width: ${props => props.Big};
  margin-bottom: 20px;
  object-fit: cover;
`;
const CategoryBox = styled.div.attrs((props) => ({
    style: {
        backgroundImage: `linear-gradient(#000000, #000000), linear-gradient(to bottom, ${props.Start}, ${props.End})`,
    }
}))`
  background-origin: border-box;
  background-clip: content-box, border-box;
  border: 4px solid transparent;
  width: 400px;
  height: 400px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
`;
const CategoryDiv = styled.button`
  background-image: linear-gradient(#000000, #000000), linear-gradient(to bottom, #${props => props.Start}, #${props => props.End});
  background-origin: border-box;
  background-clip: content-box, border-box;
  border: 4px solid transparent;
  margin: 10px;
  width: 200px;
  height: 200px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  transition: 0.3s;
  cursor: pointer;
  animation: ${PageMove} 0.5s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 200px rgba(255, 255, 255, 0.25);
    z-index: 0;
  }
`;
const CategoryList = styled.div`
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
const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
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
const Text = styled.p`
  font-family: Roboto, sans-serif;
  font-weight: ${props => props.W || "600"};
  font-size: ${props => props.Size || '28px'};
  color: white;
  margin-bottom: ${props => props.Margin || '0'};
  margin-top: ${props => props.Top};
  height: 20px;
  width: ${props => props.Width};
`;