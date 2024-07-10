import React, { useState, useContext } from "react";

function AdminSite({ onClose, site, setSite, onClickSave }) {
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

        for (const key in site) {
            if (site[key] === "") {
                setFormError("Please enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}");
                return;
            }
        }

        setFormError('');

        try {
            const response = onClickSave(site);
            if (response) {
                alert("Site X successfuly")
                onClose();
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