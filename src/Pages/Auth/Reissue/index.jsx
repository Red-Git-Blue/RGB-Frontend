import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {BaseUrl} from "../../../export/baseUrl";

const reissue = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);
    const navigate = useNavigate();
    if(cookies.accessToken && cookies.refreshToken) {
    axios({
        method: 'post',
        url: BaseUrl + '/auth/reissue',
        data: {
            accessToken : cookies.accessToken,
            refreshToken : cookies.refreshToken
        }
    })
    .then((res) => {
        setCookie('accessToken', res.data.accessToken);
        setCookie('refreshToken', res.data.refreshToken);
    })
    .catch(() => {
        removeCookie('accessToken');
        removeCookie('refreshToken');
        navigate('/main');
    })
    } else {
        removeCookie('accessToken');
        removeCookie('refreshToken');
        navigate('/main');
    }
}

export default reissue;