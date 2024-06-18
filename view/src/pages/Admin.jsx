// import { React, useContext, useState } from 'react'
// import AdminSite from "../components/AdminSite";

// import { UserContext } from '../App';


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
            <button className="auth-button" onClick={() => setShowAdminSite(true)}>Admin</button>}
            {showAdminSite && <AdminSite site={site} setSite={setSite} onClose={() => setShowAdminSite(false)} />}
        </>
    );
}
export default Admin;