import {Fragment} from "react";
import styled, {keyframes} from "styled-components";

const modal = ({Set}) => {

    return(
        <Fragment>
            <Blur>
                <ModalBack>
                    <TopBar>
                        <Text>배지 추가</Text>
                        <CloseBtn onClick={()=>Set(false)}>close</CloseBtn>
                    </TopBar>
                    <AddSection>
                    </AddSection>
                </ModalBack>
            </Blur>

        </Fragment>
    );
}

export default modal;

const Fade = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;
const Blur = styled.div`
  position: fixed;
  background-color: rgba(0,0,0,0.5);
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
  width: 800px;
  background-color: lightblue;
`;
const TopBar = styled.div`

`;
const Text = styled.p`
`;
const CloseBtn = styled.button`
`;
const AddSection = styled.section`
`;