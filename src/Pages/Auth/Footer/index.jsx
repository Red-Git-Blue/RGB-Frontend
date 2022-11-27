import styled from "styled-components";

const Footer = () => {
  return (
    <>
      <FooterBox>
        <InfoDiv>
          <RGB>RGB</RGB>
          <Info>© 2022. Red Git Blue All rights reserved.</Info>
        </InfoDiv>
        <InfoDiv he="55px">
          <Info>문의    010-1234-5678</Info>
          <Info>주소    대전광역시 유성구 가정북로 76</Info>
        </InfoDiv>
      </FooterBox>
    </>
  );
}

export default Footer;

const FooterBox = styled.div`
  width:100%;
  height:160px;
  background: #000000;
  box-shadow: 0 0 200px rgba(255, 255, 255, 0.25);
  padding: 40px 300px 40px 300px;
  color:#999999;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  align-items:start;
`;
const InfoDiv = styled.div`
  height:${props => props.he || "76px"};
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  align-items:start;
`;
const RGB = styled.p`
  color:white;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: 40px;
  height:47px;
`;
const Info = styled.p`
  font-family: 'NanumRegular', sans-serif;
  font-weight: 400;
  font-size: 12px;
  height:26px;
`;