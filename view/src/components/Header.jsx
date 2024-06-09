
import { Link, useNavigate } from "react-router-dom";
import { React, useContext, useState } from 'react'
import { NavLink } from "react-router-dom"
import { UserContext } from '../App';
import SignUp from './SignUp'

function Header() {
    const {userSession, setUserSession} = useContext(UserContext);
 console.log(userSession);
    const navigate = useNavigate();
    // return (
    //     <header>
    //         <nav>
    //             {userSession !=null && <button
    //                 onClick={() => {
    //                     localStorage.clear();
    //                    // setCurrentUser({});n
    //                     navigate("/home");
    //                 }}
    //             >Logout  </button>}
    //           {userSession==="admin"? <Link to={`/home/admin`}> Admin </Link>:null} 
    //             <Link to={`/home/about`}> About </Link>
    //             <Link to={`/home/gallery`}> Gallery </Link>
    //             <Link to={`/home/sites`}> Sites </Link>
    //             <Link to={`/home/basket`}> Basket </Link>
    //             {userSession==="user"?   <Link to={`/home/tripRoute`}>  My Trip Routes  </Link>:null} 
             
    //             {!userSession&& <><button
    //                 onClick={() => {

    //                 }}
    //             >  Login  </button>
    //                 <button
    //                     onClick={() => {
    //                         console.log("here")
    //                         return( <SignUp/>)
    //                     }}
    //                 >  Signup  </button></>}
    //         </nav>
    //     </header>
    // );

    const [showSignUp, setShowSignUp] = useState(false);

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
                        <button onClick={() => {}}>Login</button>
                        <button onClick={() => setShowSignUp(true)}>Signup</button>
                    </>
                }
            </nav>
            {showSignUp && <SignUp />}
        </header>
    );

}
export default Header;
