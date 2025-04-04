
import { useNavigate } from "react-router-dom";

const Logout=()=>
{
const navigate=useNavigate();
const {user,loggedOut}=useAuth();
    loggedOut();
    navigate("/login");

}
export default Logout;