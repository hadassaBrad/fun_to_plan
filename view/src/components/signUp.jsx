import { useContext, useState } from 'react';
import config from '../config.js';
import { UserContext } from '../App.jsx';
import "../css/signUp.css";

function SignUp({ onClose }) {
    const { userSession, setUserSession } = useContext(UserContext);

    const [formSignUpData, setFormSignUpData] = useState({
        username: "",
        password: "",
        email: "",
        confirmPassword: "",
    });

    const changeHandler = (event) => {
        setFormSignUpData(prevFormSignUpData => ({
            ...prevFormSignUpData,
            [event.target.name]: event.target.value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (formSignUpData.username === "" || formSignUpData.password === "") {
            alert("Please enter all the required details");
        } else {
            const body = {
                role_id: 1,
                password: formSignUpData.password,
                userName: formSignUpData.username,
                email: formSignUpData.email
            }
            const currentUser = await config.postData("signUp", body);
            const token = currentUser.token;
            sessionStorage.setItem('token', token);

            if (currentUser) {
                setUserSession(currentUser);
                alert("Successfully registered");
                onClose();
            } else {
                alert("Failed to save user");
                setFormSignUpData({
                    username: "",
                    password: "",
                    email: "",
                    confirmPassword: "",
                });
            }
        }
    }

    return (
        <div className="overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose }
        >X</button>
                <form className="form signup" onSubmit={handleSubmit}>
                    <h1 className="title">Sign Up</h1>
                    <br/>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="username"
                        value={formSignUpData.username}
                        required
                        onChange={changeHandler}
                        className="input name-sign"
                    />
                    <br/>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        placeholder="email"
                        value={formSignUpData.email}
                        required
                        onChange={changeHandler}
                        className="input email-sign"
                    />
                   <br/>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="password"
                        value={formSignUpData.password}
                        required
                        onChange={changeHandler}
                        className="input password-sign"
                    />
                 <br/>
                    <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        placeholder="confirm password"
                        value={formSignUpData.confirmPassword}
                        required
                        onChange={changeHandler}
                        className="input confirm-password-sign"
                    />    <br/>
                    <button className="button okey-sign" type="submit" >Continue</button><br />
                </form>
            </div>
        </div>
    );
}

export default SignUp;