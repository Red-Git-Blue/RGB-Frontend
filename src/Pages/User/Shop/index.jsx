import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { BaseUrl } from "../../../export/baseUrl";
import { Image } from "../../../styleds";

const ShopView = () => {
    const [cookies, , ] = useCookies(['accessToken']);
    const [Ad, SetAd] = useState(undefined);
    const [Badge, setBadge] = useState(undefined);

    const GetAd = () => {
        axios({
            method: 'GET',
            url: BaseUrl + '/advertise/now',
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
            },
            params: {
                idx: 0,
                size: 10
            }
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const GetBadge = () => {
        axios({
            method: 'Get',
            url: BaseUrl + '/item/badge/details',
            params: {
              idx: 0,
              size: 5
            }
        })
        .then((res) => {
            setBadge(res.data.content);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        //GetAd();
        GetBadge();
    }, [])

    return (
        <>
            <AdView data={Ad} />
            <OutBox>
                <SubTitle title='category' text='카테고리'/>
                <CategoryOutBox>
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                </CategoryOutBox>
                <SubTitle title='NEW badge' text='신규 배지'/>
                <ShopViewBox>
                {
                    Badge && Badge.map((item) => 
                        <Shop_view_detail data={item} />
                    )
                }
                </ShopViewBox>
                <SubTitle title='GATCHA' text='잔디뽑기'/>
                <GatchaOutBox>

                </GatchaOutBox>
            </OutBox>
        </>
    )
}

export default ShopView;

const AdView = ({data}) => {
    if(data === undefined) return (
        <UnAdBox>
            <span>현재 광고가 존재하지 않거나</span>
            <span>AdBlock같은 광고차단 프로그램이 꺼야합니다.</span>
        </UnAdBox>
    )
    return (
        <AdBox>
        </AdBox>
    )

}

const UnAdBox = styled.div`
    width: 100vw;
    height: 290px;
    background: #222222;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'NanumGothic';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 37px;
    color: #888888;
`

const AdBox = styled.div`
    width: 100vw;
    height: 290px;
    background: #ffffff;
    display: flex;
`

const OutBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SubTitle = ({title, text}) => {
    return (
        <SubTitleBox>
            <span>{title}</span>
            <span>{text}</span>
        </SubTitleBox>
    )
}

const SubTitleBox = styled.div`
    width: 1320px;
    display: flex;
    flex-direction: column;
    margin: 100px 0 60px;
    color: #ffffff;
    & > span {
        &:first-child {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            margin-bottom: 8px;
            text-transform: uppercase;
        }
        &:last-child {
            font-family: 'NanumGothic';
            font-style: normal;
            font-weight: 700;
            font-size: 32px;
            line-height: 37px;
        }
    }
`

const CategoryOutBox = styled.div`
    width: 1320px;
    height: auto;
    margin-bottom: 60px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, auto));
    row-gap: 40px;
    column-gap: 24px;
`

const Category = ({data = undefined}) => {
    return (
        <CategoryBox>
            <Image src='./image/star.png' width='36.25' height='30px'/>
            <span>인기</span>
        </CategoryBox>
    )
}

const CategoryBox = styled.div`
    width: 194px;
    height: 94px;

    border-radius: 20px;
    border: 3px solid transparent;
    background-image: linear-gradient(#000, #000), 
                      linear-gradient(90deg, rgba(0,255,209,1) 0%, rgba(0,87,255,1) 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;

    display: flex;
    align-items: center;

    transition: 0.3s;
    cursor: pointer;
    & > img {
        margin: 0 19.75px 0 40px;
    }

    font-family: 'NanumGothic';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    color: #FFFFFF;

    &:hover {
        transform: scale(1.02);
    }
`
const ShopViewBox = styled.div`
    width: 1320px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 60px;
`

const Shop_view_detail = ({ data }) => {
    return (
      <Shop_view_detail_box data-id={data.id}>
        <Image width='240px' height='240px' radius='10px' alt='뱃지 이미지' src={data.badgeMainFile.fileUrl}/>
        <span>{data.name}</span>
        <span>{data.introduction}</span>
        <span>{data.price.toLocaleString('ko-KR')}원</span>
      </Shop_view_detail_box>
    )
}

const Shop_view_detail_box = styled.div`
  width: 240px;
  height: 393px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    transform: scale(1.05);
  }
  span {
    font-family: 'NanumGothic', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    color: #ffffff;

    &:nth-child(2) {
      margin-top: 30px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &:nth-child(3) {
      margin-top: 10px;
      font-weight: 400;
      line-height: 160%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    &:nth-child(4) {
      margin-top: 20px;
      font-size: 20px;
      line-height: 23px;
    }
  }
`

const GatchaOutBox = styled.div`
    width: 1260px;
    min-height: 180px;
    background: #222222;
    border-radius: 20px;
    margin-bottom: 260px;
    padding: 30px;
    display: grid;
    
    grid-template-columns: 1fr 1fr;
    gap: 30px;
`

const Gatcha = ({data}) => {
    return (
        <>
        </>
    )
}