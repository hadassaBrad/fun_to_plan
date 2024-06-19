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
    });

    const changeHandler = (event) => {
        setFormSignUpData(prevFormSignUpData => ({
            ...prevFormSignUpData,
            [event.target.name]: event.target.value
        }));
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
                email: formSignUpData.email
            }
            try {

                const response = await config.postData("signUp", body);
                console.log("response  1  " + response);
                const token = response.token;
                sessionStorage.setItem('token', token);
                console.log("response  2  " + token);
                if (response) {
                    setUser(response.user);
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
            } catch (err) {
                console.log(err.message);
                setSignUpError(err.message);
            }
            if(localStorage.getItem("basket")!=[])
            {
                //לשלוח את כל הסל ולהוסיף אותו
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
                    <button className="button okey-sign" type="submit" >Continue</button><br />
                    {signUpError && <p className='error' style={{ color: signUpError == "Registration successful" ? 'green' : "red" }}>{signUpError}</p>}

                    <br />
                    {/* <button onClick={moveToLogin}>not signed up? login</button> */}
                    <a href="#"  style={{textDecoration: 'none', borderBottom: '1px dashed transparent', transition: 'borderColor 0.3s'}} onClick={moveToLogin}>already signed up? login</a>

                    
                    <br />
                </form>
            </div>
        </div>
    );
}

export default SignUp;