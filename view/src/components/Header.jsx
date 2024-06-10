
import { Link, useNavigate } from "react-router-dom";
import { React, useContext, useState } from 'react'
import { NavLink } from "react-router-dom"
import { UserContext } from '../App';
import SignUp from "./SignUp";
import Login from "./Login";
function Header() {
    const {userSession, setUserSession} = useContext(UserContext);
 console.log(userSession);
    const navigate = useNavigate();
   
   

    const [showSignUp, setShowSignUp] = useState(false);
const [showLogin,setShowLogin]=useState(false);
    return (
        <header>
            <nav>
                {userSession !== null && 
                    <button onClick={() => { 
                        localStorage.clear(); 
                        // setCurrentUser({});
                        navigate("/home");
                    }}>Logout</button>}
                {userSession === "admin" && <Link to={`/home/admin`}>Admin</Link>}
                <Link to={`/home/about`}>About</Link>
                <Link to={`/home/gallery`}>Gallery</Link>
                <Link to={`/home/sites`}>Sites</Link>
                <Link to={`/home/basket`}>Basket</Link>
                {userSession === "user" && <Link to={`/home/tripRoute`}>My Trip Routes</Link>}
                {!userSession && 
                    <>
                        <button onClick={() => setShowLogin(true)}>Login</button>
                        <button onClick={() => setShowSignUp(true)}>Signup</button>
                    </>
                }
            </nav>
            {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
            {showLogin && <Login  onClose={() => setShowLogin(false)} />}
        </header>
    );

}
export default Header;
