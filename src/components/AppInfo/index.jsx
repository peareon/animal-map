import { Link } from "react-router-dom";
import { AppInfoContainer } from "./styles";


const AppInfo = () =>{
    return(
        <AppInfoContainer>
            <Link to={'/appInfo'}>Conocer más sobre la app</Link>
        </AppInfoContainer>
    )
};

export default AppInfo;