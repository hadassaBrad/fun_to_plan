import React from "react";
// import Site from "./Site";
import { useState, useEfect, useContext } from "react";
import { UserContext } from '../App.jsx';
function AdminSite({ site }) {
    const { user, setUser } = useContext(UserContext);
    const [site, setSite] = useState({
        siteName:"",
        url:"",
        description:"",
        popularity:"",
        difficultyLevel:"",
        area:"",
        price:"",
        age:"",
        openingHour:"",
        closingHour:"",
        latitude:"",
        logitude:"",
        trackLength:""
    });

    return (
        <>
            <form className="form login" onSubmit={handleSubmit}>
                <h1 className="title">Enter site details</h1>
                <label htmlFor="email" className="form-field">User Name: </label>
                <input
                    id=""
                    type="text"
                    name="email"
                    placeholder="email"
                    value={formLogInData.email}
                    required
                    onChange={changeHandler}
                    className="input name-sign"
                />
                <label htmlFor="password" className="form-field">Password: </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={formLogInData.password}
                    required
                    onChange={changeHandler}
                    className="input password-log"
                />
                <button className="button okey-log" type="submit">Continue</button><br />
                {loginError && <p className='error' style={{ color: loginError == "Registration successful" ? 'green' : "red" }}>{loginError}</p>}
                <br />
                {/* <button onClick={moveToSignUp}>not signed up? sign up</button> */}
                <a href="#" onClick={moveToSignUp}>not signed up? sign up</a>
                <br />
            </form>
        </>
    );

}

export default AdminSite;