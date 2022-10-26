import styled from "styled-components";
import { Text, Blur_box } from "../../../styleds";

const ErrorPage = () => {
    return (
        <>
            <Center>
                <Blur_box>
                    <Flex_box>
                        <Text size='70px' height='160%'>404오류입니다!</Text>
                        <Text size='70px' height='160%'>페이지가 존재하지 않거나</Text>
                        <Text size='70px' height='160%'>잘못된 페이지입니다!</Text>
                    </Flex_box>
                </Blur_box>
            </Center>
        </>
    );
}

export default ErrorPage;

const Center = styled.div`
    width: 100%;
    height: calc(100vh - 100px);
    display: flex;
    justify-content: center;
    align-items: center;
`

const Flex_box = styled.div`
    width: 874px;
    height: 438px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    padding: 100px;
`