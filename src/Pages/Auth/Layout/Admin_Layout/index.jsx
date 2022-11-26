import { Outlet } from 'react-router-dom';
import Footer from "../../Footer/index";
import Header from "../../Header";

const Admin_Layout = () => {
    return (
        <>
            <Header Admin={true}/>
            <Outlet />
            <Footer />
        </>
    );
};

export default Admin_Layout;