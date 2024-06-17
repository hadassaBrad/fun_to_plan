// הקובץ Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { React, useContext, useState } from 'react'
import { NavLink } from "react-router-dom"
import { UserContext } from '../App';
import SignUp from "./SignUp";
import Login from "./Login";
import "../css/styles.css"; // הוספת קובץ ה-CSS
import AdminSite from "./AdminSite";

function Header() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [showSignUp, setShowSignUp] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    return (
        <header className="header">
            <nav className="nav">
                {console.log("user  " + user)}
                {user !== null && <>
                    <button className="logout-button" onClick={() => {
                        sessionStorage.clear();
                        setUser(null);
                    }}>
                        <span className="icon">🔒</span> Logout
                    </button>
                    <br />
                    {console.log("user  " + user.userName)}
                    <br />
                    <h2>🤬{user.userName}</h2></>
                }
                {user && user.role === "admin" &&
                    <Link className="admin-link" to="/home/admin">Admin</Link>}
                <Link className="nav-link" to={`/home`}>Home</Link>
                <Link className="nav-link" to={`/home/about`}>About</Link>
                <Link className="nav-link" to={`/home/gallery`}>Gallery</Link>
                <Link className="nav-link" to={`/home/sites`}>Sites</Link>
                <Link className="nav-link" to={`/home/basket`}>Basket</Link>
                {user && user.role === "user" && <Link className="nav-link" to={`/home/tripRoute`}>My Trip Routes</Link>}
                {!user &&
                    <>
                        <button className="auth-button" onClick={() => setShowLogin(true)}>Login</button>
                        <button className="auth-button" onClick={() => setShowSignUp(true)}>Signup</button>
                    </>
                }
            </nav>
            {showSignUp && <SignUp onClose={() => setShowSignUp(false)} openLogin={() => setShowLogin(true)} />}
            {showLogin && <Login onClose={() => setShowLogin(false)} openSignUp={() => setShowSignUp(true)} />}
        </header>
    );
}

export default Header;