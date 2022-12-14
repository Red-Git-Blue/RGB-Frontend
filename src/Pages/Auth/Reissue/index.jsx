import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from "../../../export/baseUrl";
import axios from "axios";

const Reissue = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);
    const navigate = useNavigate();
    if(cookies.accessToken && cookies.refreshToken) {
        axios({
            method: 'POST',
            url: BaseUrl + '/auth/reissue',
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
            },
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
    } else if(cookies.accessToken) {
        removeCookie('accessToken');
        navigate('/main');
    } else if(cookies.refreshToken) {
        removeCookie('refreshToken');
        navigate('/main');
    }
}

export default Reissue;