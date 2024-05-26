
import { Link, useNavigate } from "react-router-dom";
import { React, useContext } from 'react'
import { NavLink } from "react-router-dom"
import { UserContext } from '../App'

function Header() {
    const userSetion = useContext(userSetion);
 
    const navigate = useNavigate();
    return (
        <header>
            <nav>
                {user && <button
                    onClick={() => {
                        localStorage.clear();
                        setCurrentUser({});
                        navigate("/home");
                    }}
                >Logout  </button>}
              {userSetion==="admin"? <Link to={`/home/admin`}> Admin </Link>:null} 
                <Link to={`/home/about`}> About </Link>
                <Link to={`/home/gallery`}> Gallery </Link>
                <Link to={`/home/sites`}> Sites </Link>
                <Link to={`/home/basket`}> Basket </Link>
                <Link to={`/home/tripRoute`}>  My Trip Routes  </Link>
                {!user && <><button
                    onClick={() => {

                    }}
                >  Login  </button>
                    <button
                        onClick={() => {

                        }}
                    >  Signup  </button></>}
            </nav>
        </header>
    );
}
export default Header;
