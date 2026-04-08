import styled from "styled-components";


const MainContainer = styled.section`
    display: flex;
    max-width: 100vw;
    max-height: 100vh;
    box-sizing: border-box;
    justify-content: space-between;
`

const OverviewContainer = styled.section`
    display: flex;
    flex-direction: column;
    width: 33%;
`
const TitleSearchContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export {
    MainContainer,
    OverviewContainer,
    TitleSearchContainer
}