// import { Link, useNavigate } from "react-router-dom";
// import { React, useContext, useState } from 'react';
// import { UserContext } from '../App';
// import { SlBasket } from "react-icons/sl";
// import "../css/styles.css"; // We'll create a separate CSS file for the header

// function Header() {
//     const { user, setUser, showLogin, setShowLogin } = useContext(UserContext);
//     const navigate = useNavigate();
//     const [showSignUp, setShowSignUp] = useState(false);

//     async function logOut() {
//         // ... (logOut function remains the same)
//     }

//     return (
//         <header className="header">
//             <nav className="navbar">
//                 <div className="nav-left">
//                     {user !== null && (
//                         <>
//                             <span className="user-name">{user.userName}</span>
//                             <button className="logout-button" onClick={logOut}>
//                                 <span className="icon">🔐</span> Logout
//                             </button>
//                         </>
//                     )}
//                 </div>
//                 <div className="nav-center">
//                     <Link className="nav-link" to="/home">Home</Link>
//                     <Link className="nav-link" to="/home/about">About</Link>
//                     <Link className="nav-link" to="/home/gallery">Gallery</Link>
//                     <Link className="nav-link" to="/home/sites">Sites</Link>
//                     {(user == null || user.role === "user") && (
//                         <Link className="nav-link" to="/home/basket">
//                             <SlBasket />
//                         </Link>
//                     )}
//                     {user !== null && user.role === "user" && (
//                         <Link className="nav-link" to="/home/tripRoutes">My Trip Routes</Link>
//                     )}
//                     {user !== null && user.role === "guide" && (
//                         <Link className="nav-link" to="/home/tripRoutes">Guides Trip Routes</Link>
//                     )}
//                     {user !== null && user.role === "admin" && (
//                         <Link className="nav-link" to="/home/admin">Admin</Link>
//                     )}
//                 </div>
//                 <div className="nav-right">
//                     {!user && (
//                         <>
//                             <button className="auth-button" onClick={() => setShowLogin(true)}>Login</button>
//                             <button className="auth-button" onClick={() => setShowSignUp(true)}>Signup</button>
//                         </>
//                     )}
//                 </div>
//             </nav>
//             {showSignUp && <SignUp onClose={() => setShowSignUp(false)} openLogin={() => setShowLogin(true)} />}
//             {showLogin && <Login onClose={() => setShowLogin(false)} openSignUp={() => setShowSignUp(true)} />}
//         </header>
//     );
// }

// export default Header;
import { Link, useNavigate } from "react-router-dom";
import { React, useContext, useState } from 'react';
import { UserContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SlBasket } from "react-icons/sl";

import { faUser } from '@fortawesome/free-solid-svg-icons';

import SignUp from "./SignUp"
import Login from "./Login";
import "../css/styles.css"; // ׳”׳•׳¡׳₪׳× ׳§׳•׳‘׳¥ ׳”-CSS

function Header() {
    const { user, setUser, showLogin, setShowLogin } = useContext(UserContext);
    console.log("user in header start render: ");
    console.log(user);
    const navigate = useNavigate();
    const [showSignUp, setShowSignUp] = useState(false);


    async function logOut() {
        localStorage.removeItem("basket");

        // בקשה לשרת למחוק את העוגיה

        fetch('http://localhost:3000/logout', { method: 'GET', credentials: 'include' })
            .then(response => {
                if (response.ok) {
                    setUser(null);
                    navigate(`/home`);
                } else {
                    console.error('Logout failed');
                }
            })
            .catch(error => {
                console.error('Logout error:', error);
            });
    }
    return (
        <header className="header">
            <nav className="navbar">
                <div className="nav-left">
                    {/* {console.log(user)}
                    {console.log(user.userName)} */}
                    {user !== null && <>
                        <button className="logout-button" onClick={() => {
                            logOut();
                        }}>
                            <span className="icon">🔐</span> Logout
                        </button>
                        <br />
                        <h2>
                            {user.userName}
                            {/* {<FontAwesomeIcon icon={faUser} className="d-inline-block dropdown-toggle icon-no-margin" />  { user.userName} */}
                        </h2>
                    </>}
                </div>
                <div className="nav-center">
                    <Link className="nav-link" to={`/home`}>Home</Link>
                    <Link className="nav-link" to={`/home/about`}>About</Link>
                    <Link className="nav-link" to={`/home/gallery`}>Gallery</Link>
                    <Link className="nav-link" to={`/home/sites`}>Sites</Link>

                    {(user == null || user.role == "user") && (
                <Link className="nav-link" to={`/home/basket`}>
                    <SlBasket />
                </Link>
            )}
                    {user !== null && user.role === "user" && <Link className="nav-link" to={`/home/tripRoutes`}>My Trip Routes</Link>}
                    {user !== null && user.role === "guide" && <Link className="nav-link" to={`/home/tripRoutes`}>Guides Trip Routes</Link>}

                    {user !== null && user.role === "admin" && <Link className="nav-link" to="/home/admin">Admin</Link>}
                </div>
                <div className="nav-right">
                    {!user && <>
                        <button className="auth-button" onClick={() => setShowLogin(true)}>Login</button>
                        <button className="auth-button" onClick={() => setShowSignUp(true)}>Signup</button>
                    </>}
                </div>
            </nav>
            {showSignUp && <SignUp onClose={() => setShowSignUp(false)} openLogin={() => setShowLogin(true)} />}
            {showLogin && <Login onClose={() => setShowLogin(false)} openSignUp={() => setShowSignUp(true)} />}
        </header>
    );
}

export default Header;