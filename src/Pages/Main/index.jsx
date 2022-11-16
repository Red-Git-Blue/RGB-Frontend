import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const gitCommitSort = () => {
    
}

const Main = () => {

    const [commit, setCommit] = useState('');
    const gitCommit = async function () {
        try {
            let res = await axios({
                method: 'GET',
                url: 'http://cors-anywhere.herokuapp.com/http://local.lite24.net:8090/api/rgb/contribution/eternrust/2022',
                credentials: 'include',
                hearders: {
                }
            });
            console.log('commit sccess!');
            // setCommit(res.data.contributions[0]);
            // console.log(res.data);
        } catch (err) {
            console.log('commit error...');
            console.log(err)
        }
    };

    useEffect(() => {
        // gitCommitSort();
        gitCommit();
    });
    return (
        <>
        </>
    )
}

export default Main;