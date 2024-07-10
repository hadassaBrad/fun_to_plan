import { useContext, useState } from 'react';
import config from '../config.js';
import { UserContext } from '../App.jsx';
import "../css/signUp.css";

function SignUp({ onClose, openLogin }) {
    const { user, setUser } = useContext(UserContext);
    const [signUpError, setSignUpError] = useState('');
    const [formSignUpData, setFormSignUpData] = useState({
        username: "",
        password: "",
        email: "",
        confirmPassword: "",
        confirmguide: false,
    });

    const changeHandler = (event) => {
        const { name, value, type, checked } = event.target;
        setFormSignUpData(prevFormSignUpData => ({
            ...prevFormSignUpData,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    function addBasketToDB(newUser) {
        const items = localStorage.getItem("basket")
        if (items) {
            const body={
                site:JSON.parse(items),
                user:newUser
            }
            config.postData("basket",body);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSignUpError("");
        if (formSignUpData.username === "" || formSignUpData.password === "") {
            alert("Please enter all the required details");
        } else {
            const body = {
                role_id: 1,
                password: formSignUpData.password,
                userName: formSignUpData.username,
                email: formSignUpData.email,
                confirmguide: formSignUpData.confirmguide
            }
            try {
                const response = await config.postData("signUp", body);

                if (response.user) {
                    setUser(response.user);
                    alert("Successfully registered");
                    addBasketToDB(response.user);
                    onClose();
                } else {
                    alert("Failed to save user");
                    setFormSignUpData({
                        username: "",
                        password: "",
                        email: "",
                        confirmPassword: "",
                        confirmguide: false,
                    });
                }
            } catch (err) {
                setSignUpError(err.message);
            }
            if (localStorage.getItem("basket") != []) {
            }
        }
    }

    function moveToLogin() {
        onClose();
        openLogin();
    }

    return (
        <div className="overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose}
                >X</button>
                <form className="form signup" onSubmit={handleSubmit}>
                    <h1 className="title">Sign Up</h1>
                    <br />
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
                    <br />
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
                    <br />
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
                    <br />
                    <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        placeholder="confirm password"
                        value={formSignUpData.confirmPassword}
                        required
                        onChange={changeHandler}
                        className="input confirm-password-sign"
                    />    <br />
                    <label>Do you want to work with us? Check here and we will connect you by email</label>
                    <input
                        id="guide"
                        type="checkbox"
                        name="confirmguide"
                        checked={formSignUpData.confirmguide}
                        onChange={changeHandler}
                        className="input confirm-guide-sign"
                    />    <br />

                    <button className="button okey-sign" type="submit" >Continue</button><br />
                    {signUpError && <p className='error' style={{ color: signUpError === "Registration successful" ? 'green' : "red" }}>{signUpError}</p>}

                    <br />
                    <a href="#" style={{ textDecoration: 'none', borderBottom: '1px dashed transparent', transition: 'borderColor 0.3s' }} onClick={moveToLogin}>already signed up? login</a>
                    <br />
                </form>
            </div>
        </div>
    );
}

export default SignUp;
