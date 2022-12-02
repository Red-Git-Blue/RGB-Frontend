import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from "../../Header/index";
import Footer from "../../Footer/index";

const Main_Layout = () => {
  return (
    <Overflow>
        <Header />
        <Outlet />
        <Footer />
    </Overflow>
  );
};

export default Main_Layout;

const Overflow = styled.div`
  overflow-x: hidden;
`