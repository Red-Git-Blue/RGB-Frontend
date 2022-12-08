import {useNavigate, useLocation} from 'react-router-dom';
import styled from "styled-components";
import {Image} from "../../../styleds";
import {useCookies} from "react-cookie";
import {Fragment} from "react";
import Reissue from '../Reissue';

const Page_button = styled.span`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #fff;
  cursor: pointer;
  text-align: center;
  position: relative;
  text-decoration: none;
  display: inline-block;
  transition: 0.3s;
  margin-left: 50px;
  overflow: visible;

  ${(props) => props.bool ? 
  `
    color:#FFF500;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      display: block;
      background: #FFF500;
    }
  `
  :
  `
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      display: block;
      background: #FFF500;
      -webkit-transform-origin: right top;
      -ms-transform-origin: right top;
      transform-origin: right top;
      -webkit-transform: scale(0, 1);
      -ms-transform: scale(0, 1);
      transform: scale(0, 1);
      -webkit-transition: transform 0.4s cubic-bezier(1, 0, 0, 1);
      transition: transform 0.4s cubic-bezier(1, 0, 0, 1);
    }

    &:hover {
      transform: scale(1.1);
      color: #FFF500;

      &::before {
        -webkit-transform-origin: left top;
        -ms-transform-origin: left top;
        transform-origin: left top;
        -webkit-transform: scale(1, 1);
        -ms-transform: scale(1, 1);
        transform: scale(1, 1);
      }
    }
  `
  }
`

const Header = ({Admin}) => {
    // Reissue();
    const log = useLocation();
    const data = log.pathname.split('/').filter((item) => item !== '');
    let navigate = useNavigate();
    const [cookies, ,] = useCookies(['refreshToken']);

    return (
        <>
            <Out_box>
                <Logo_box onClick={() => {
                    Admin ? navigate('/youDontKnow/AdminPage') : navigate('/main')
                }}>
                    <Image src={process.env.PUBLIC_URL+"/image/Logo.png"} width='34px' height='30px' alt='로고 이미지'/>
                    <Title>RED GIT BLUE</Title>
                </Logo_box>
                <Page_box>
                    {Admin ?
                        <Fragment>
                            <Page_button bool={data[data.length - 1] === 'AdminPage'} onClick={() => navigate('/youDontKnow/AdminPage')}>Main</Page_button>
                            <Page_button bool={data[data.length - 1] === 'AdminBadge'} onClick={() => navigate('/youDontKnow/AdminPage/AdminBadge')}>Manage Badge</Page_button>
                            <Page_button bool={data[data.length - 1] === 'AdminGrass'} onClick={() => navigate('/youDontKnow/AdminPage/AdminGrass')}>Manage Grass</Page_button>
                            <Page_button bool={data[data.length - 1] === 'AdminAd'} onClick={() => navigate('/youDontKnow/AdminPage/AdminAd')}>Manage Ad</Page_button>
                            <Page_button bool={data[data.length - 1] === 'AdminCategory'} onClick={() => navigate('/youDontKnow/AdminPage/AdminCategory')}>Manage Category</Page_button>
                        </Fragment>
                        :
                        <Fragment>
                            <Page_button bool={data[0] === 'main'} onClick={() => navigate('/main')}>Main</Page_button>
                            <Page_button bool={data[0] === 'coin'} onClick={() => navigate('/coin')}>Coin</Page_button>
                            <Page_button bool={data[0] === 'search'} onClick={() => navigate('/search')}>Search</Page_button>
                            <Page_button bool={data[0] === 'shop'} onClick={() => navigate('/shop')}>Shop</Page_button>
                            {cookies.refreshToken ?
                                <Page_button bool={data[0] === 'mypage'} onClick={() => navigate('/mypage')}>My Page</Page_button>
                                :
                                <Fragment>
                                    <Page_button bool={data[0] === 'login'} onClick={() => navigate('/login')}>Log In</Page_button>
                                    <Page_button bool={data[0] === 'signup'} onClick={() => navigate('/signup')}>Sign Up</Page_button>
                                </Fragment>
                            }
                        </Fragment>
                    }
                </Page_box>
            </Out_box>
        </>
    );
}

export default Header;

const Out_box = styled.div`
  display: flex;
  width: 70%;
  height: 100px;
  font-style: normal;
  align-items: center;
  padding: 0 15% 0 15%;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.01);
  backdrop-filter: blur(120px);
  position: sticky;
  top: 0;
  z-index: 9;
`

const Logo_box = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`
const Title = styled.span`
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: 20px;
  line-height: 23px;
  display: flex;
  flex-direction: column;
  color: #fff;
  margin-left: 12px;
`

const Page_box = styled.div`
  width: auto;
  display: flex;
  justify-content: space-between;
  overflow: visible;
`