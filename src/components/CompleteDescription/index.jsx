import { useSelector } from "react-redux";
import Description from "../Description";
import { DetailsContainer, DetailsHeader, ScrollableDetails } from "./styles";


const CompleteDescription = () => {
    
    const descriptions = useSelector((state)=> state.gbif?.animalInfo?.description);
    const specieName = useSelector((state)=> state.gemini?.scientificName?.species);
    const taxonID = useSelector((state)=> state.gbif?.animalInfo?.taxonID);
    
    return(
        <DetailsContainer>
            <DetailsHeader>Información de {specieName}</DetailsHeader>

            <ScrollableDetails>
            {descriptions.map((description, index) => 
                    <Description
                        key={`${taxonID}-${index}`}
                        description={description}
                    />
                    )}
            </ScrollableDetails>
        </DetailsContainer>
    )
};

export default CompleteDescription;