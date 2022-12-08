import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import Header from "../../Auth/Header";

const CoinDetailView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <Out_box>
                <Box>
                    <div>
                        <Before_btn onClick={() => navigate(-1)}/>
                        <div>
                            <span>hyunsuk</span>
                            <span>1,492원</span>
                            <span>전일 대비 +320 (+27.3%)</span>
                        </div>
                    </div>
                </Box>
            </Out_box>
        </>
    )
}

export default CoinDetailView;

const Out_box = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px 0 0 0;
`

const Box = styled.div`
    width: 1320px;
    & > div {
        &:first-child {
            & > div {
                font-family: 'Roboto';
                font-style: normal;
                color: #ffffff;
                display: flex;
                flex-direction: column;
                & > :nth-child(1) {
                    font-weight: 700;
                    font-size: 20px;
                    line-height: 23px;
                }
                & > :nth-child(2) {
                    font-weight: 900;
                    font-size: 40px;
                    line-height: 47px;
                    margin: 5px 0;
                }
                & > :nth-child(3) {
                    font-weight: 700;
                    font-size: 14px;
                    line-height: 16px;
                    color: #ff0000;
                }
            }
        }
    }
`

const Before_btn = styled.span`
  height: 4px;
  width: 20px;
  display: block;
  background-color: #ffffff;
  transform: translate(-100px, 60px) rotate(-45deg);
  border-radius: 10px;
  cursor: pointer;
  overflow: visible;
  transition: 0.5s;
  transform-origin: left;

  &::after {
    content: '';
    height: 4px;
    width: 20px;
    display: block;
    background-color: #ffffff;
    border-radius: 10px;
    transform: translate(-8px, 8px) rotate(90deg);
  }

  &:hover {
    transform: translate(-100px, 60px) rotate(-45deg) scale(2);
  }
`