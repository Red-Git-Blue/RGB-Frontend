import { Outlet } from 'react-router-dom';
import { Background_view } from "../../../../styleds";
import Header from "../../Header/index";

const LS_Layout = () => {
  return (
    <>
        <Header />
        <Background_view />
        <Outlet />
    </>
  );
};

export default LS_Layout; 