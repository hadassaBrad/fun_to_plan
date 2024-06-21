import { React, useContext, useState, } from 'react'
import { Link, useNavigate } from "react-router-dom";
import AdminSite from "../components/AdminSite";
import config from '../config.js';

import { UserContext } from '../App';


// function Admin() {
//     const { user, setUser } = useContext(UserContext);
//     const [showAdminSite, setShowAdminSite] = useState(false);


//     return (
//         <>   {user && user.role === "admin" &&
//             <button className="auth-button" onClick={() => setShowAdminSite(true)}>Admin</button>}
//             {showAdminSite && <AdminSite onClose={() => setShowAdminSite(false)} />}</>
//     );
// }
// export default Admin;
async function onClickSave(site) {
    try {
        const result = await config.postData("sites", site)
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function PermissionsManagement() {
    try {
        const result = await config.postData("sites", site)
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

function Admin() {
    const { user, setUser } = useContext(UserContext);
    const [showAdminSite, setShowAdminSite] = useState(false);
    const [site, setSite] = useState({
        siteName: "",
        url: "",
        description: "",
        popularity: "",
        difficultyLevel: "",
        area: "",
        price: "",
        age: "",
        openingHour: "",
        closingHour: "",
        latitude: "",
        longitude: "",
        trackLength: ""
    });

    return (
        <>   {user && user.role === "admin" &&
            <button className="auth-button" onClick={() => setShowAdminSite(true)}>Add sites </button>}
            {user && user.role === "admin" &&
            <Link className="nav-link" to={`/home/admin/PermissionsManagement`}>Permissions management </Link>}
            {showAdminSite && <AdminSite onClickSave={onClickSave} site={site} setSite={setSite} onClose={() => setShowAdminSite(false)} />}
        </>
    );
}
export default Admin;