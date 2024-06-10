// הקובץ Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { React, useContext, useState } from 'react'
import { NavLink } from "react-router-dom"
import { UserContext } from '../App';
import SignUp from "./SignUp";
import Login from "./Login";
import "../css/styles.css"; // הוספת קובץ ה-CSS

function Header() {
    const { userSession, setUserSession } = useContext(UserContext);
    const navigate = useNavigate();
    const [showSignUp, setShowSignUp] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    return (
        <header className="header">
            <nav className="nav">
                {userSession !== null && 
                    <button className="logout-button" onClick={() => { 
                        localStorage.clear(); 
                        navigate("/home");
                    }}>
                        <span className="icon">🔒</span> Logout
                    </button>}
                {userSession === "admin" && <Link className="nav-link" to={`/home/admin`}>Admin</Link>}
                <Link className="nav-link" to={`/home/about`}>About</Link>
                <Link className="nav-link" to={`/home/gallery`}>Gallery</Link>
                <Link className="nav-link" to={`/home/sites`}>Sites</Link>
                <Link className="nav-link" to={`/home/basket`}>Basket</Link>
                {userSession === "user" && <Link className="nav-link" to={`/home/tripRoute`}>My Trip Routes</Link>}
                {!userSession && 
                    <>
                        <button className="auth-button" onClick={() => setShowLogin(true)}>Login</button>
                        <button className="auth-button" onClick={() => setShowSignUp(true)}>Signup</button>
                    </>
                }
            </nav>
            {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
            {showLogin && <Login  onClose={() => setShowLogin(false)} />}
        </header>
    );
}

export default Header;