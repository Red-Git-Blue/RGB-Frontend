import { Outlet } from 'react-router-dom';
import Header from "../../Header/index";
import Footer from "../../Footer/index";

const Main_Layout = () => {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
  );
};

export default Main_Layout;