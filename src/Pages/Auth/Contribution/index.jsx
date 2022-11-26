import styled from "styled-components"
import React from "react";

const Commit_View = ({data, color}) => {
    let result = [];
    let tmp = [];
    let x = 0;
    let y = 0;
    for(let i = 0; i < data.length; i++) {
        if(data[i] === '') {
            y+=22;
            continue;
        } else {
            tmp.push(<Svg_commit_box y={y} color={color[data[i].level]} />);
            y+=22;
        }
        if((i + 1) % 7 === 0) {
            result.push(<Svg_commit_g trans={x} >{tmp}</Svg_commit_g>);
            x+=22;
            y=0;
            tmp = [];
        }
    }
    if(tmp.length) result.push(<Svg_commit_g trans={x} >{tmp}</Svg_commit_g>);

    return result;
}

const Github_view = ({ data, margin }) => {
    let commitData = [];
    let commitCount = 0;
    for(let i = 0; i < new Date('2022').getDay(); i++) {
        commitData.push('');
    }
    let color = [ '#22272E', '#2D333B', '#0E4429', '#006D32', '#26A641', '#39D353'];
    if(data == undefined) {
        for(let i = 0; i < 365; i++) {
            commitData.push({
                count: 0,
                level: 1
            });
        }
    } else {
        commitData.push(data);
        for(let i = 0; i < commitData.length; i++) {
            if(commitData[i] === '') continue;
            commitCount += commitData[i].count;
        }
    }

    return (
        <Github_box margin={margin}>
            <div>
                <span>MON</span>
                <span>WED</span>
                <span>FRI</span>
            </div>
            <div>
                <div>
                    <span>JAN</span>
                    <span>FEB</span>
                    <span>MAR</span>
                    <span>APR</span>
                    <span>MAY</span>
                    <span>JUN</span>
                    <span>JUL</span>
                    <span>AUG</span>
                    <span>SEP</span>
                    <span>OCT</span>
                    <span>NOV</span>
                    <span>DEC</span>
                </div>
                <div>
                    <svg width="1162" height="150" viewBox="0 0 1162 150" fill="none" >
                        {<Commit_View data={commitData} color={color}/>
                        }
                    </svg>
                </div>
                <div>
                    <div>
                        <Color_text color={color[5]}>{commitCount}</Color_text>
                        <Difference_text>CONTRIBUTIONS IN 2022</Difference_text>
                    </div>
                    <div>
                        <span>LESS</span>
                        <Commit_box color={color[1]} />
                        <Commit_box color={color[2]} />
                        <Commit_box color={color[3]} />
                        <Commit_box color={color[4]} />
                        <Commit_box color={color[5]} />
                        <span>MORE</span>
                    </div>
                </div>
            </div>
        </Github_box>
    )
}

export default React.memo(Github_view);

const Github_box = styled.div`
    width: 1280px;
    height: 240px;
    background: #22272E;
    backdrop-filter: blur(120px);
    border-radius: 20px;
    padding: 20px;
    margin: ${(props) => props.margin || '0 0 0 0'};
    color: #9EAAB6;
    display: flex;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    & > div {
        &:first-child {
            width: 55px;
            height: 116px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 62px 0;
        }
        &:last-child {
            width: 1162px;
            height: 240px;
            margin-left: 20px;
            & > div {
                &:nth-child(1) {
                    display: flex;
                    & > span {
                        &:nth-child(1) { margin-right: 63px; }
                        &:nth-child(2) { margin-right: 46px; }
                        &:nth-child(3) { margin-right: 35px; }
                        &:nth-child(4) { margin-right: 63px; }
                        &:nth-child(5) { margin-right: 37px; }
                        &:nth-child(6) { margin-right: 41px; }
                        &:nth-child(7) { margin-right: 67px; }
                        &:nth-child(8) { margin-right: 39px; }
                        &:nth-child(9) { margin-right: 44px; }
                        &:nth-child(10) { margin-right: 63px; }
                        &:nth-child(11) { margin-right: 39px; }
                    }
                }
                &:nth-child(2) {
                    width: 1162px;
                    height: 154px;
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;
                    margin: 17px 0;
                }
                &:nth-child(3) {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    & > div {
                        display: flex;
                        align-items: center;
                        & > span {
                            margin-right: 10px;
                        }
                        &:first-child {
                            font-weight: 900;
                        }
                        &:last-child {
                            font-size: 20px;
                            line-height: 23px;
                            & > span:last-child {
                            margin-left: 6px;
                        }
                        }
                    }
                }
            }
        }
    }
`

const Svg_commit_g = styled.g`
    transform: translate(${(props) => props.trans || 0}px, 0);
`

const Svg_commit_box = styled.rect`
    width: 18px;
    height: 18px;
    rx: 3px;
    y: ${(props) => props.y};
    fill: ${(props) => props.color};
`

const Commit_box = styled.div`
    width: 18px;
    height: 18px;
    margin: 0 4px 0 0;
    background: ${(props) => props.color };
    backdrop-filter: blur(120px);
    border-radius: 3px;
`

const Color_text = styled.span`
    color: ${(props) => props.color}
`
const Difference_text = styled.span`
    color: #ffffff;
    mix-blend-mode: difference;
`