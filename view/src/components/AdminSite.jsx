
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
            if (response) {
                
            console.log("Site details submitted successfully");
               alert("Site added successfuly")
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