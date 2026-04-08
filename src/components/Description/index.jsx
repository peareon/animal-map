import { PieceOfData } from "./styles";


const Description = ({description}) =>{
    return(
        <>
        <PieceOfData> <span>&#8226;</span> {description.description}</PieceOfData>
        </>
    )
}

export default Description;