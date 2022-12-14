import styled from "styled-components";

const LoadingComponent = () => {
    return (
        <LoadingBack>
            <LoadingText>Loading...</LoadingText>
        </LoadingBack>
    )
}
export default LoadingComponent;

const LoadingText = styled.p`
  font-size: 64px;
  font-weight: 900;
  color: white;
`;
const LoadingBack = styled.div`
  height: 100vh;
  width: 100%;
  z-index: 1;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;