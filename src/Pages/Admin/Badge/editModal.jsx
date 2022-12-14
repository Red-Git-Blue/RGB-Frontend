import {Fragment, useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import {useQuery} from "react-query";
import {getDetailCoin} from "./api";
import LoadingComponent from "./simpleLoading";

const EditModal = ({Set, Id}) => {
    const [nSwitch, setNSwitch] = useState(true);
    const [name, setName] = useState("");
    const [explain, setExplain] = useState("");
    const [price, setPrice] = useState(0);
    const [rank, setRank] = useState("");
    const [category, setCategory] = useState("");
    const [tag, setTag] = useState({});
    const {data: editData, isLoading: loading3, refetch: re3, remove:rm2} = useQuery(['Edit'],
        () => getDetailCoin(Id),
        {refetchOnWindowFocus: false}
    );
    if (loading3) return <LoadingComponent/>;

    if(editData&&nSwitch) {
        setName(editData.name);
        setPrice(editData.price);
        setRank(editData.rarity.name);
        setCategory(editData.category);
        setExplain(editData.introduction);
        setNSwitch(false);
    }

    const inputName = (e) => setName(e.target.value);
    const inputPrice = (e) => setPrice(e.target.value);
    const inputRank = (e) => setRank(e.target.value);
    const inputCategory = (e) => setCategory(e.target.value);
    const inputExplain = (e) => setExplain(e.target.value);

    const putJson = () => {

    }

    const closeModal = () => {
        Set(false);
        rm2();
    }

    return (
        <Fragment>
            <Blur>
                <ModalBack>
                    <button style={{backgroundColor: "red"}} onClick={closeModal}>닫기</button>
                    {
                        editData && (
                            <FlexDiv>
                                <Input value={name} onChange={(e)=>inputName(e)}/>
                                <Input value={price} onChange={(e)=>inputPrice(e)}/>
                                <Input value={rank} onChange={(e)=>inputRank(e)}/>
                                <Input value={category} onChange={(e)=>inputCategory(e)}/>
                                <TextArea value={explain} onChange={(e)=>inputExplain(e)}/>
                                <Button onClick={putJson}>수정</Button>
                            </FlexDiv>
                        )
                    }
                </ModalBack>
            </Blur>
        </Fragment>
    );
}

export default EditModal;

const Button = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 100px;
`;
const FlexDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  width: 90%;
  padding-left: 10%;
`;
const TextArea = styled.textarea`
  height: 200px;
  width: 200px;
`;
const Input = styled.input`
  background-color: white;
  color: black;
  width: 200px;
  height: 40px;
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
  height: 900px;
  width: 60%;
  background-color: black;
  box-shadow: 0 0 200px rgba(255, 255, 255, 0.25);
  border-radius: 20px;
`;