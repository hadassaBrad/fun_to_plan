
import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from 'react';
import { UserContext } from '../App';


function Header() {
    const { user } = useContext(UserContext);

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
                >Logout</button>}
                <Link to={`/home/about`}>About</Link>
                <Link to={`/home/gallery`}>Gallery</Link>
                <Link to={`/home/sites`}>Sites</Link>
                <Link to={`/home/basket`}>Basket</Link>
                <Link to={`/home/tripRoute`}>My Trip Routes</Link>
                {!user && <><button
                    onClick={() => {

                    }}
                >Login</button>
                    <button
                        onClick={() => {

                        }}
                    >Signup</button></>}
            </nav>
        </header>
    );
}
export default Header;
