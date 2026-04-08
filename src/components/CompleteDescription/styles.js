import styled from "styled-components"


const DetailsHeader = styled.h2`
    font-weight: 700;
    font-size: 28px;
    color: #053f00;
    position: sticky;
`


const DetailsContainer = styled.section`
    display: flex;
    flex-direction: column;
    max-width: 66%;
    gap: 20px;
    max-height: 100vh;

    box-sizing: border-box;
    margin-left: 15px;
`

const ScrollableDetails = styled.p`
    overflow-y: auto;
`

export {
    DetailsContainer,
    DetailsHeader,
    ScrollableDetails
}