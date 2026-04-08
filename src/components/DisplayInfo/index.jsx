import { useEffect } from "react"
import { MapContainer, TileLayer } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux"
import { getDescriptions } from "../../redux/slices/gbif.slice";
import { IDLE } from "../../redux/slices/status";
import { DataSpecies, DisplayInfoContainer, Habitat, PieceOfData, ThreatStatusTitle, Title } from "./styles";
import Description from "../Description";
import { Link } from "react-router-dom";

const DisplayInfo = () => {
    const dispatch = useDispatch();
    
    // Select the specific string to make the dependency array more "sensitive"
    const scientificNameObj = useSelector((state) => state.gemini?.scientificName);
    const speciesString = scientificNameObj?.species;
    
    const descriptions = useSelector((state) => state.gbif?.animalInfo?.description);
    const statusDescriptions = useSelector((state) => state.gbif?.statusDescriptions);
    const taxonID = useSelector((state)=> state.gbif?.animalInfo?.taxonID);
    const threatStatus = useSelector((state)=> state.gbif?.animalInfo?.threatStatus);

    // DEBUG LOG: See if the component even knows the data exists
    console.log("RENDER CHECK - Species String:", speciesString);
    useEffect(() => {
        if (speciesString) {
            console.log("EFFECT TRIGGERED - Dispatching for:", speciesString);
            dispatch(getDescriptions(speciesString)); 
        } else {
            console.log("EFFECT BLOCKED - speciesString is empty/null");
        }
    }, [speciesString, dispatch]); 

    
    if (statusDescriptions === IDLE || !speciesString) return null;

    return (
        <DisplayInfoContainer>
            <Title>Información de {speciesString}</Title>
            {taxonID?
            <>
            <div>
                <Habitat>Hábitat de la especie</Habitat>
                <MapContainer 
                
                maxBounds={[[-90, -180], [90, 180]]} // Locks the camera to the world's edges
                maxBoundsViscosity={1.0} // Makes the edges "hard" so you can't bounce off them
                center={[0, -0]} zoom={4} style={{ height: '40vh' }}>
                    <TileLayer 
                    
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                    />
        
                    <TileLayer 
                    
                    url={`https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?srs=EPSG:3857&taxonKey=${taxonID}&bin=hex&hexPerTile=620&style=green-noborder.poly`} 
                    transparent={true} 
                    opacity={0.8} 
                    />
                </MapContainer>
            </div>
            <div>
                <Habitat>Datos sobre la especie</Habitat>
                <DataSpecies>
                {descriptions.slice(0, 4).map((description, index) => 
                    <Description
                        key={`${taxonID}-${index}`}
                        description={description}
                    />
                 )}
                 <PieceOfData><Link to={'/speciesInfo'}>Click para más información</Link></PieceOfData>
                </DataSpecies>
            </div>
            <div>
                <ThreatStatusTitle threatStatus={threatStatus}>Estado de la especie: <span>{threatStatus}</span></ThreatStatusTitle>
            </div>
            </>
            :
            <></>
            }
            
        </DisplayInfoContainer>
    );
};

export default DisplayInfo;