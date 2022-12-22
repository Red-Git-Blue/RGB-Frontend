import {Fragment, useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import axios from "axios";
import {useQuery} from "react-query";
import {BaseUrl} from "../../../export/baseUrl";
import {useCookies} from "react-cookie";

const Index = () => {
    const {data: categoryList, isLoading: cLoading} = useQuery(['category'],
        () => getCategoryList()
    );
    const [cookies, ,] = useCookies();
    const [cOpen, setCOpen] = useState(false);
    const [cName, setCName] = useState('');
    const [cColor, setCColor] = useState(["FFFFFF", "FFFFFF"]);
    const [imgFile, setImgFile] = useState(undefined);
    const [preImg, setPreImg] = useState(undefined);
    if (cLoading) return <div>로딩딩딩딩딩딩딩딩딩디리리딩디리딩딩딩</div>;

    async function getCategoryList() {
        const getCategoryListRes = await axios({
            method: 'get',
            url: BaseUrl + '/item/category?idx&size=20',
        })
        return getCategoryListRes.data;
    }

    const categoryOpen = () => setCOpen(true);
    const categoryClose = () => {
        setPreImg(undefined);
        setCOpen(false);
        setImgFile(undefined);
        setCColor(["FFFFFF", "FFFFFF"]);
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

    const addCategory = (
        <AddBack>
            <AddDiv>
                <CategoryBox Start={cColor[0]} End={cColor[1]}>
                    <Label htmlFor="cFile" pre={preImg}><p>+</p></Label>
                    <File type="file" id="cFile" name="cFile" onChange={(e) => insertImg(e)}></File>
                    <Text Size="20px" W="900" Top="20px">{cName}</Text>
                </CategoryBox>
                <Text Size="20px" W="600" Width="400px" Top="20px">카테고리 이름</Text>
                <Input value={cName} onChange={(e) => setCName(e.target.value)} placeholder="카테고리 이름을 입력해주세요"/>
                <AddFlex>
                    <ColorDiv Color={cColor[0]}></ColorDiv>
                    <ColorDiv Color={cColor[1]}></ColorDiv>
                </AddFlex>
                <AddFlex Jus="end">
                    <Button>추가</Button>
                    <Button onClick={categoryClose}>취소</Button>
                </AddFlex>
            </AddDiv>
        </AddBack>
    );

    return (
        <Fragment>
            <Body>
                <Text Margin="100px" Size="36px" W="200">Manage Category</Text>
                <FlexDiv>
                    <Text>Category List</Text>
                    <AddButton onClick={categoryOpen}>카테고리 추가</AddButton>
                </FlexDiv>
                <CategoryList>
                    {categoryList.content.map((dat) => (
                        <CategoryDiv key={dat.categoryName} name={dat.id} Start={dat.color.startColor} End={dat.color.endColor}>
                            <Image Big="80px" src={dat.categoryIcon.fileUrl} loading="lazy"/>
                            <Text Size="20px" W="900">{dat.categoryName}</Text>
                        </CategoryDiv>
                    ))}
                </CategoryList>
                {cOpen && addCategory}
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
const Label = styled.label`
  background-image: url(${props => props.pre});
  width: ${props => props.S || "200px"};
  height: ${props => props.S || "200px"};
  border-radius: 20px;
  font-size: 40px;
  background-size: cover;
  background-color: #222222;
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
const ColorDiv = styled.div`
  width: 48%;
  height: 100px;
  background-color: #${props => props.Color};
  border-radius: 20px;
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
const CategoryBox = styled.div`
  background-image: linear-gradient(#000000, #000000), linear-gradient(to bottom, #${props => props.Start}, #${props => props.End});
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