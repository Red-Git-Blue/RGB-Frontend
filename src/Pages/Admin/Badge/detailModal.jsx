import {Fragment, useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import {useQuery} from "react-query";
import {getDetailCoin} from "./api";
import LoadingComponent from "./simpleLoading";

const DetailModal = ({Set, Detail}) => {
    const [animation, setAnimation] = useState(Up);
    const [opacity, setOpacity] = useState(FadeIn);

    const {data: datDetail, remove: rm1, isLoading: loading2, error: er2, refetch: re2} = useQuery(['Detail'],
        () => getDetailCoin(Detail)
    )
    if (loading2) return <LoadingComponent/>;

    const click = () => {
        setAnimation(Down);
        setOpacity(FadeOut);
        setTimeout(() => Set(false), 450);
        setTimeout(() => rm1(), 460);
    }

    const rankColor = (rank) => {
        if (rank === "일반") return "#AAAAAA";
        else if (rank === "희귀") return "#5555FF";
        else if (rank === "고급") return "#AA00AA";
        else if (rank === "전설") return "#FFAA00";
        else if (rank === "특별") return "#FF5555";
        else if (rank === "관리자") return "#55FFFF";
    }

    return (
        <Fragment>
            <Blur A={opacity}>
                <ModalBack A={animation} Color={rankColor(datDetail.rarity.noun)}>
                    <Head><CloseButton onClick={click}>닫기</CloseButton></Head>
                    <Section>
                        <Flex>
                            <Text Size="64px" W="900" B="20px">{datDetail.name}</Text><Box
                            Color={rankColor(datDetail.rarity.noun)}></Box><Rank
                            Color={rankColor(datDetail.rarity.noun)}>{datDetail.rarity.name}</Rank>
                        </Flex>
                        <Text W="200" B="40px" Time="0.7s">{datDetail.introduction}</Text>
                        <TagDiv>
                            {datDetail.tagList.map((tag) => (
                                <Tag key={tag.tagName} B={tag.tagColor}>{tag.tagName}</Tag>
                            ))}
                        </TagDiv>
                        <ImgDiv>
                            <Img src={datDetail.mainImage.fileUrl}></Img>
                            <Img src={datDetail.iconImage.fileUrl}></Img>
                            <FlexDiv>
                                {datDetail.subImages.map((imgs) => (
                                    <Img src={imgs.fileUrl} Size="150px" key={imgs.fileUrl}/>
                                ))}
                            </FlexDiv>
                        </ImgDiv>
                    </Section>
                </ModalBack>
            </Blur>
        </Fragment>
    );
}

export default DetailModal;

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
const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const FadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
const Up = keyframes`
  0% {
    transform: translateY(100vh);
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  }
  100% {
    transform: translateY(0);
    box-shadow: 0 0 200px rgba(255, 255, 255, 0.5);
  }
`;
const Down = keyframes`
  0% {
    transform: translateY(0);
    box-shadow: 0 0 200px rgba(255, 255, 255, 0.5);
  }
  100% {
    transform: translateY(100vh);
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  }
`;
const Box = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.Color};
  margin: 0 0 30px 40px;
`;
const Flex = styled.div`
  display: flex;
  align-items: end;
  animation: ${PageMove} 0.6s;
`;
const Rank = styled.div`
  font-size: 20px;
  font-weight: 900;
  color: ${props => props.Color};
  margin: 0 0 26px 10px;
`;
const FlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 60%;
  padding: 0 20px 0 20px;
  align-content: start;
`;
const Img = styled.img`
  height: ${props => props.Size || "300px"};
  width: ${props => props.Size || "300px"};
  object-fit: cover;
  border-radius: 30px;
  margin: 10px;
  transition: 0.3s;
  border: solid 2px white;

  &:hover {
    transform: scale(1.1);
    box-shadow: black 0 0 100px;
  }
`;
const ImgDiv = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: space-between;
  animation: ${PageMove} 0.9s;
`;
const Head = styled.div`
  height: 20%;
  width: 80%;
  display: flex;
  justify-content: end;
  align-items: center;
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
  margin-bottom: 20px;
  animation: ${PageMove} 0.8s;
`;
const Text = styled.p`
  font-size: ${props => props.Size};
  font-weight: ${props => props.W || 600};
  margin-bottom: ${props => props.B || 0};
  animation: ${PageMove} ${props => props.Time};
`;
const CloseButton = styled.button`
  height: 40px;
  width: 100px;
  background-color: red;
  font-weight: 900;
  font-size: 24px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: scale(1.1);
    background-color: orange;
  }
`;
const Section = styled.section`
  background: none;
  height: 100%;
  width: 80%;
  padding: 0 100px 0 100px;
`;
const Blur = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  height: 100%;
  width: 100%;
  top: 0;
  padding: 0 300px 0 300px;
  animation: ${props => props.A} 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalBack = styled.div`
  color: white;
  position: fixed;
  bottom: 0;
  height: 90%;
  width: 100%;
  background: ${props => `linear-gradient(320deg, black 70%, ${props.Color})`};
  box-shadow: 0 0 200px rgba(255, 255, 255, 0.5);
  border-radius: 100px 100px 0 0;
  animation: ${props => props.A} 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;