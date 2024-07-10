import { useState, Link, useContext } from 'react';
import "../css/login.css"
import config from '../config.js';
import { UserContext } from '../App.jsx';


function Login({ onClose, openSignUp }) {
    const { setUser } = useContext(UserContext);
    const [loginError, setLoginError] = useState('');
    const [formLogInData, setFormLogInData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const changeHandler = (event) => {
        setFormLogInData(prevFormLogInData => {
            return {
                ...prevFormLogInData,
                [event.target.name]: event.target.value
            }
        });
    }

    async function deleteBasketFromDBAddToLS(connectedUser) {
        await config.deleteAllDataByKey("basket", "user_id", connectedUser.id);
        const items = localStorage.getItem("basket");
        if (items) {
            const body = {
                site: JSON.parse(items),
                user: connectedUser
            }
            config.postData("basket", body);
        }
    }

    async function deleteBasketFromLSAddToDB(connectedUser) {
        if (localStorage.getItem("basket") != null)
            localStorage.removeItem(
                "basket"
            );
        const items = await config.getData("basket", ["user_id"], [connectedUser.id]);
        if (items.length) {
            localStorage.setItem("basket", JSON.stringify(items));
        }
    }

    async function addBasketToDB(connectedUser) {
        if (connectedUser.role != "user") {
            return;
        }
        if (localStorage.getItem("basket") == null) {
            deleteBasketFromLSAddToDB(connectedUser);
            return;
        }

        const result = window.confirm("Do you want to change the basket you had before in DB with the new one?");
        if (result) {
            deleteBasketFromDBAddToLS(connectedUser);
        }
        else {
            deleteBasketFromLSAddToDB(connectedUser)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (formLogInData.email === "" || formLogInData.password === "")
            alert("please enter all the required details");

        else {                                 
            const body = {
                email: formLogInData.email,
                password: formLogInData.password
            }
            try {
                const response = await config.postData("login", body)
                if (response) {
                    setUser(response.user);
                    alert("succesfully connected");
                    addBasketToDB(response.user);
                    onClose();
                } else {
                    setFormLogInData({
                        email: "",
                        password: "",
                        confirmPassword: "",
                    });
                }
            }

            catch (err) {
                setLoginError(err.message);
            }

        }
    }

    function moveToSignUp() {
        onClose();
        openSignUp();
    }

    return (
        <div className="overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose}>X</button>
                <form className="form login" onSubmit={handleSubmit}>
                    <h1 className="title">Log In</h1>
                    <label htmlFor="email" className="form-field">User Name: </label>
                    <input
                        id="email"
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
                    <a href="#" onClick={moveToSignUp}>not signed up? sign up</a>
                    <br />
                </form>
            </div>
        </div>
    );
}

export default Login;
