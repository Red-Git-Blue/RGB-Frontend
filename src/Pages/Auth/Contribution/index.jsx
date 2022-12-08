import styled from "styled-components"
import React, { useState } from "react";

const Commit_View = ({ data, color, func }) => {
    let result = [];
    let tmp = [];
    let x = 0;
    let y = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i] === '') {
            y += 22;
            continue;
        } else {
            tmp.push(<Svg_commit_box
                key={i}
                y={y}
                color={color[data[i].level]}
                data-count={data[i].count}
                data-level={data[i].level}
                data-date={data[i].date}
                onMouseOver={((event) => func(event, 'visibility'))}
                onMouseLeave={((event) => func(event, 'hidden'))}
            />);
            y += 22;
        }
        if ((i + 1) % 7 === 0) {
            result.push(<Svg_commit_g key={i + 365} trans={x} >{tmp}</Svg_commit_g>);
            x += 22;
            y = 0;
            tmp = [];
        }
    }
    if (tmp.length) result.push(<Svg_commit_g key={1000} trans={x} >{tmp}</Svg_commit_g>);

    return result;
}

const Github_view = ({ data, margin = 0 }) => {
    const [commit_view_data, set_commit_data] = useState(['','','','','hidden']);
    let commitData = [];
    let commitCount = 0;
    
    const date = new Date('2022');
    for (let i = 0; i < date.getDay(); i++) {
        commitData.push('');
    }
    let color = ['#2D333B', '#0E4429', '#006D32', '#26A641', '#39D353'];
    
    if (data == undefined) {
        for (let i = 0; i < 365; i++) {
            commitData.push({
                date: [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'),
                count: 0,
                level: 0
            });
            date.setDate(date.getDate() + 1);
        }
    } else {
        const TmpData = data.contribution.contributions;
        for (let i = 0; i < TmpData.length; i++) {
            commitCount += TmpData[i].count;
            commitData.push(TmpData[i]);
        }
    }

    const detail_commit = (e, view = 'view') => {
        let count;
        const DateArr = e.target.dataset.date.split('-');
        const MonthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if(Number(e.target.dataset.count)) {
            count = `${e.target.dataset.count} contributions`;
        } else {
            count = 'No contributions';
        }
        let text = `on ${MonthArr[Number(DateArr[1]) - 1]} ${DateArr[2]}, ${DateArr[0]}`;
        
        const Top = window.pageYOffset + e.target.getBoundingClientRect().top - 30;
        const Left = window.pageXOffset + e.target.getBoundingClientRect().left - 175;

        set_commit_data([`${Top}px`,`${Left}px`, count, text, view]);
    }

    return (
        <>
            <Github_box>
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
                            {<Commit_View data={commitData} color={color} func={detail_commit} />}
                        </svg>
                    </div>
                    <div>
                        <div>
                            <Color_text color={color[4]}>{commitCount}</Color_text>
                            <Difference_text>CONTRIBUTIONS IN 2022</Difference_text>
                        </div>
                        <div>
                            <span>LESS</span>
                            <Commit_box color={color[0]} />
                            <Commit_box color={color[1]} />
                            <Commit_box color={color[2]} />
                            <Commit_box color={color[3]} />
                            <Commit_box color={color[4]} />
                            <span>MORE</span>
                        </div>
                    </div>
                </div>
            </Github_box>
            <Tip_text margin={margin}>
                Tip! 자신의 Commit이 다 보이지 않나요?
                그렇다면 Github contributions에서
                Private contributions를 활성화했는지 확인하세요!
            </Tip_text>
            {
                commit_view_data[4] !== 'hidden' ?
                <Detail_commit_view
                    top={commit_view_data[0]}
                    left={commit_view_data[1]}
                >
                    <span>{commit_view_data[2]}</span>
                    <span>{commit_view_data[3]}</span>
                </Detail_commit_view>
                :
                <></>
            }
        </>
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
    margin-bottom: 20px;
    color: #9EAAB6;
    display: flex;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    & > div {
        &:nth-child(1) {
            width: 60px;
            height: 116px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 62px 0;
        }
        &:nth-child(2) {
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
                    margin: 17px 0 13px 0;
                    overflow: hidden;
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
    ry: 3px;
    y: ${(props) => props.y};
    fill: ${(props) => props.color};
`

const Commit_box = styled.div`
    width: 18px;
    height: 18px;
    margin: 0 4px 0 0;
    background: ${(props) => props.color};
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

const Tip_text = styled.div`
    width: 1280px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: #ffffff;
    margin-bottom: ${(props) => props.margin || '0'};
`

const Detail_commit_view = styled.div`
    width: 300px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    padding: 5px;
    border-radius: 10px;
    position: absolute;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    top: ${(props) => props.top || '0px'};
    left: ${(props) => props.left || '0px'};
    span:last-child {
        font-weight: 400;
        margin-left: 5px;
    }
`