
import { Link, useNavigate } from "react-router-dom";
import { React, useContext } from 'react'
import { NavLink } from "react-router-dom"
import { UserContext } from '../App';
import SignUp from './SignUp'

function Header() {
    const {userSession, setUserSession} = useContext(UserContext);
 console.log(userSession);
    const navigate = useNavigate();
    return (
        <header>
            <nav>
                {userSession !=null && <button
                    onClick={() => {
                        localStorage.clear();
                       // setCurrentUser({});n
                        navigate("/home");
                    }}
                >Logout  </button>}
              {userSession==="admin"? <Link to={`/home/admin`}> Admin </Link>:null} 
                <Link to={`/home/about`}> About </Link>
                <Link to={`/home/gallery`}> Gallery </Link>
                <Link to={`/home/sites`}> Sites </Link>
                <Link to={`/home/basket`}> Basket </Link>
                {userSession==="user"?   <Link to={`/home/tripRoute`}>  My Trip Routes  </Link>:null} 
             
                {!userSession&& <><button
                    onClick={() => {

                    }}
                >  Login  </button>
                    <button
                        onClick={() => {
                    <SignUp></SignUp>
                        }}
                    >  Signup  </button></>}
            </nav>
        </header>
    );
}
export default Header;
