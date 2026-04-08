import styled from "styled-components";


const DisplayInfoContainer = styled.section`
    display: flex;
    width: 63%;
    max-height: 100%;
    flex-direction: column;
    justify-content: space-around;
    gap: 15px;
`

const DataSpecies = styled.article`
    max-height: 50vh;
    overflow-y: scroll;
`

const Title = styled.h3`
    font-size: 26px;
    font-weight: 700;
    color: #053f00;
`

const Habitat = styled.h4`
    font-size: 18px;
    font-weight: 600;
    color: #011f01;
    margin-bottom: 20px;
`

const ThreatStatusTitle = styled.h4`
    font-size: 18px;
    font-weight: 700;
    color: #002100;
    margin-bottom: 20px;
    span{
        font-size: 18px;
        font-weight: 500;
        color: ${props => {
            if(!props.threatStatus) return;
            if(props.threatStatus.toUpperCase() === 'EXTINCT') return '#fa1d09'
            if(props.threatStatus.toUpperCase() === 'EXTINCT_IN_THE_WILD') return '#ff3b09'
            if(props.threatStatus.toUpperCase() === 'REGIONALLY_EXTINCT') return '#e0350b'
            if(props.threatStatus.toUpperCase() === 'CRITICALLY_ENDANGERED') return '#f2720a'
            if(props.threatStatus.toUpperCase() === 'VULNERABLE') return '#e9b413'
            if(props.threatStatus.toUpperCase() === 'NEAR_THREATENED') return '#e4eb20'
            if(props.threatStatus.toUpperCase() === 'LEAST_CONCERN') return '#003c10'
            if(props.threatStatus.toUpperCase() === 'DATA_DEFICIENT') return '#6a6a6a'
            if(props.threatStatus.toUpperCase() === 'NOT_APPLICABLE') return '#6a6a6a'
            if(props.threatStatus.toUpperCase() === 'NOT_EVALUATED') return '#6a6a6a'
        }};
    }
`

const PieceOfData = styled.article`
    margin-bottom: 10px;
    font-weight: 100;
    line-height: 1.2;
    text-align: justify;
    color: #f3fff3;
`


export {
    DisplayInfoContainer,
    DataSpecies,
    Title,
    Habitat,
    ThreatStatusTitle,
    PieceOfData
};