import { useNavigate } from "react-router-dom";
import logo from "../../assets/dynatrace.png";

const Header = ()=>{
    const navigate = useNavigate(); 
    return (
        <img className='dynatrace-logo' alt="logo icon" src={logo} onClick={()=>navigate('/')}/>
    )
}

export default Header;