import { React, useContext, useState } from 'react'
import { Link } from "react-router-dom";

import AdminSite from "../components/AdminSite";

import { UserContext } from '../App';
// import UsersTable from "./UsersTable";


function Admin() {
    const { user, setUser } = useContext(UserContext);
    const [showAdminSite, setShowAdminSite] = useState(false);


    return (
        <>
            <Link className="nav-link" to="/home/usersTable">usersTable</Link>

            <button className="auth-button" onClick={() => setShowAdminSite(true)}>Admin</button>
            {showAdminSite && <AdminSite onClose={() => setShowAdminSite(false)} />}</>
            
    );
}
export default Admin;