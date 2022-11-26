import {Fragment, useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {useMediaQuery} from "react-responsive";

const Badge = () => {
    return(
        <Fragment>
            <p style={{color:"white"}}>hello! this is Badge Page!</p>
        </Fragment>
    );
}

export default Badge;