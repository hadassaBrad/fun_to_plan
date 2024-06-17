// import React from "react";
// // import Site from "./Site";
// import { useState, useEfect, useContext } from "react";
// import { UserContext } from '../App.jsx';
// function AdminSite({ site }) {
//     const { user, setUser } = useContext(UserContext);
//     const [site, setSite] = useState({
//         siteName:"",
//         url:"",
//         description:"",
//         popularity:"",
//         difficultyLevel:"",
//         area:"",
//         price:"",
//         age:"",
//         openingHour:"",
//         closingHour:"",
//         latitude:"",
//         logitude:"",
//         trackLength:""
//     });

//     return (
//         <>
//             <form className="form login" onSubmit={handleSubmit}>
//                 <h1 className="title">Enter site details</h1>
//                 <label htmlFor="email" className="form-field">User Name: </label>
//                 <input
//                     id=""
//                     type="text"
//                     name="email"
//                     placeholder="email"
//                     value={formLogInData.email}
//                     required
//                     onChange={changeHandler}
//                     className="input name-sign"
//                 />
//                 <label htmlFor="password" className="form-field">Password: </label>
//                 <input
//                     id="password"
//                     type="password"
//                     name="password"
//                     placeholder="password"
//                     value={formLogInData.password}
//                     required
//                     onChange={changeHandler}
//                     className="input password-log"
//                 />
//                 <button className="button okey-log" type="submit">Continue</button><br />
//                 {loginError && <p className='error' style={{ color: loginError == "Registration successful" ? 'green' : "red" }}>{loginError}</p>}
//                 <br />
//                 {/* <button onClick={moveToSignUp}>not signed up? sign up</button> */}
//                 <a href="#" onClick={moveToSignUp}>not signed up? sign up</a>
//                 <br />
//             </form>
//         </>
//     );

// }

// export default AdminSite;


import React, { useState, useContext } from "react";
import { UserContext } from '../App.jsx';
import config from '../config.js';

function AdminSite({ onClose }) {
    const { user, setUser } = useContext(UserContext);
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
    const [formError, setFormError] = useState('');

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setSite(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // בדיקת תקינות טופס
        for (const key in site) {
            if (site[key] === "") {
                setFormError("Please enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}");
                return;
            }
        }

        // Reset form error
        setFormError('');

        // לוגיקה לשליחת הנתונים לשרת
        try {
            console.log("site:   " + site);
            const response = await config.postData("sites", site)
            // fetch('/api/sites', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(site),
            // });
            if (response.ok) {
                console.log("Site details submitted successfully");
                onClose(); // Close the modal after successful submission
            } else {
                console.error("Failed to submit site details");
            }
        } catch (error) {
            console.error("Error submitting site details", error);
        }
    };

    return (
        <div className="overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose}>X</button>
                <form className="form login" onSubmit={handleSubmit}>
                    <h1 className="title">Enter site details</h1>
                    {Object.keys(site).map(key => (
                        <div key={key} className="form-field">
                            <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</label>
                            <input
                                id={key}
                                type="text"
                                name={key}
                                value={site[key]}
                                onChange={changeHandler}
                                required
                                className="input"
                            />
                        </div>
                    ))}
                    {formError && <p className='error' style={{ color: 'red' }}>{formError}</p>}
                    <button className="button okey-log" type="submit">Submit</button><br />
                </form>
            </div>
        </div>
    );
}

export default AdminSite;