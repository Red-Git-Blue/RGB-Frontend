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

const AccessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTY3MTYwNzQyMSwiZXhwIjoxNjcxNjkzODIxfQ.ngZNDffTM0ui9P8V2tAF0bRnnLtLrbXT9Rk0phau1vI";
console.log("Access Token is : " + AccessToken);

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

export async function deleteBadge(index) {
    const deleteRes = await axios({
        method: 'delete',
        url: BaseUrl + '/item/badge/' + index,
        headers: {
            Authorization: `Bearer ${AccessToken}`
        },
    });
}

////////////////////////////////////////////////////////////////////////////////////////    EDIT API    ////////////////

export async function editBadgeInfo(id, badgeJson) {
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

export async function editCategory(id, category) {
    const editCategoryRes = await axios({
        method: 'put',
        url: BaseUrl + '/item/badge/' + id + '/category',
        params: {
            category: category,
        },
        headers: {
            Authorization: `Bearer ${AccessToken}`,
        },
    });
}

export async function addTag(id, tagName, tagColor) {
    const addTagRes = await axios({
        method: 'put',
        url: BaseUrl + '/item/badge/' + id + '/tag',
        params: {
            tagName: tagName,
            tagColor: tagColor,
        },
        headers: {
            Authorization: `Bearer ${AccessToken}`,
        },
    });
}

export async function deleteTag(id, tagName) {
    const deleteTagRes = await axios({
        method: 'delete',
        url: BaseUrl + '/item/badge/' + id + '/tag',
        params: {
            tagName: tagName,
        },
        headers: {
            Authorization: `Bearer ${AccessToken}`,
        },
    });
}

export async function changeMainImg(id, formData) {
    const changeMainImgRes = await axios({
        method: 'put',
        url: BaseUrl + '/item/badge/' + id + '/main',
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${AccessToken}`
        },
        data: formData,
    });
}

export async function changeIconImg(id, formData) {
    const changeIconImgRes = await axios({
        method: 'put',
        url: BaseUrl + '/item/badge/' + id + '/icon',
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${AccessToken}`
        },
        data: formData,
    });
}

export async function deleteSubImg(id, fileId) {
    const deleteSubImgRes = await axios({
        method: 'delete',
        url: BaseUrl + '/item/badge/' + id + '/sub',
        params: {
            fileId: fileId
        },
        headers: {
            Authorization: `Bearer ${AccessToken}`
        },
    })
}

export async function changeSubImg(id, formData) {
    const changeSubImgRes = await axios({
        method: 'put',
        url: BaseUrl + '/item/badge/' + id + '/sub',
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${AccessToken}`
        },
        data: formData,
    });
}