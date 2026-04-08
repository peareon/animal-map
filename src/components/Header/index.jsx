import { Link } from "react-router-dom";
import { HeaderTitle } from "./styles"


const Header = () =>{
    return(
        <HeaderTitle>
           <Link to={'/'}>Phyloc</Link> 
        </HeaderTitle>
    )
}

export default Header;