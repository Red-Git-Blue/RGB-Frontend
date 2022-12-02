import {Fragment, useState} from "react";
import styled, {keyframes} from "styled-components";

const DetailModal = ({Set}) => {
    const [animation, setAnimation] = useState(Up);
    const [opacity, setOpacity] = useState(FadeIn);
    const click = () => {
        setAnimation(Down);
        setOpacity(FadeOut);
        setTimeout(()=>Set(false), 450);
    }

    return (
        <Fragment>
            <Blur A={opacity}>
                <ModalBack A={animation}>
                    <Section>
                        <CloseButton onClick={click}>홀리몰리</CloseButton>
                    </Section>
                </ModalBack>
            </Blur>
        </Fragment>
    );
}

export default DetailModal;

const CloseButton = styled.button`
  height: 200px;
  width: 400px;
`;
const Section = styled.section`
  background-color: #111111;
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
  }
  100% {
    transform: translateY(0);
  }
`;
const Down = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100vh);
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
  animation: ${props=>props.A} 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalBack = styled.div`
  position: fixed;
  bottom: 0;
  height: 80%;
  width: 100%;
  background-color: black;
  box-shadow: 0 0 200px rgba(255, 255, 255, 0.5);
  border-radius: 100px 100px 0 0;
  animation: ${props => props.A} 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;