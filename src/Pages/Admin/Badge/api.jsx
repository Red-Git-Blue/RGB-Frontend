import axios from "axios";
import {BaseUrl} from "../../../export/baseUrl";

// async function Access() {
//     const Token = await axios({
//         method: 'post',
//         url: BaseUrl + '/auth/sign-in',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             email: "qqqq",
//             password: "qqqq",
//         }),
//     })
//     return Token.data;
// }

const AccessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTY3MDU5OTI1NiwiZXhwIjoxNjcwNjg1NjU2fQ.qPrq8I9S0oos_RNT0CwQgLgSJEHyktvP6HhZVpq7V44";
console.log("Access Token is : "+AccessToken);

export async function getCoinList() {
    const badgeRes = await axios({
            method: 'get',
            url: BaseUrl + '/item/badge?idx&size=20',
        }
    )
    return badgeRes.data;
}

export async function getDetailCoin(dat) {
    const detailRes = await axios({
        method: 'get',
        url: BaseUrl + '/item/badge/' + dat,
    })
    return detailRes.data;
}

export async function postBadge(Re, e, formData) {
    const response = await axios({
        method: "POST",
        url: BaseUrl + "/item/badge",
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${AccessToken}`
        },
        data: formData,
    });
    Re();
}