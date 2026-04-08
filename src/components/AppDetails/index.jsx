import { AppDetail } from "./styles";


const AppDetails = () =>{

    return(
        <AppDetail>
            Esta aplicación utiliza la API de https://techdocs.gbif.org/en/. Específicamente los endpoints para obtener información sobre
            mapas y obetener información sobre especies. Como input se utiliza el nombre común (o científico) de la especie.
            Este input se comparte con gemini para que busque el nombre de la especie , y provea a gbif con el nombre científico.
        </AppDetail>
    )

};

export default AppDetails;