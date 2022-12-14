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

const AccessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTY3MDk4MDYxMSwiZXhwIjoxNjcxMDY3MDExfQ.Thh_X-XW0oi89SfwXezi1ffsecgNhTaz-GxzEx33qRM";
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

export async function deleteBadge(index){
    const deleteRes = await axios({
        method: 'delete',
        url: BaseUrl + '/item/badge/' + index,
        headers:{
            Authorization: `Bearer ${AccessToken}`
        },
    });
}

////////////////////////////////////////////////////////////////////////////////////////    EDIT API    ////////////////

export async function editBadgeInfo(id, badgeJson) {
    console.log(JSON.stringify(badgeJson));
    const editInfoRes = await axios({
        method: 'put',
        url: BaseUrl + '/item/badge/' + id,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AccessToken}`,
        },
        data: JSON.stringify(badgeJson),
    });
}