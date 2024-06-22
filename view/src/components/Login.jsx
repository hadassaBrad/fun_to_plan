import { useState, Link, useContext } from 'react';
import "../css/login.css"
import config from '../config.js';
import { UserContext } from '../App.jsx';


function Login({ onClose, openSignUp }) {
    const { user, setUser } = useContext(UserContext);
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

    function addBasketToDB(connectedUser) {
        const result = window.confirm("Do you want to delete the basket you had before?");
        if (result) {
            config.deleteAllDataByKey("basket", "user_id", connectedUser.id);
        } else {

        } 

        //לא עובד ההוספה אחרי המחיקה מהכל...
        const items = localStorage.getItem("basket")
        if (items) {
            console.log("items... ");
            console.log(JSON.parse(items));
            const body = {
                site: JSON.parse(items),
                user: connectedUser
            }
            config.postData("basket", body);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (formLogInData.email === "" || formLogInData.password === "")
            alert("please enter all the required details");
        else {                                                              //create new user in the server
            const body = {
                email: formLogInData.email,
                password: formLogInData.password
            }
            try {

                const response = await config.postData("login", body)
                const token = response.token;
                if (response) {
                    console.log("response: " + response)
                    setUser(response);
                    console.log("user: " + response.id)

                    alert("succesfully connected");
                    addBasketToDB(response);
                    onClose();
                } else {
                    // alert("Uncorrect email or Password");
                    setFormLogInData({
                        email: "",
                        password: "",
                        confirmPassword: "",
                    });
                    //   navigate("/login");
                }
            }

            catch (err) {
                console.log(err);
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
                    {/* <button onClick={moveToSignUp}>not signed up? sign up</button> */}
                    <a href="#" onClick={moveToSignUp}>not signed up? sign up</a>
                    <br />
                </form>
            </div>
        </div>
    );
}

export default Login;
