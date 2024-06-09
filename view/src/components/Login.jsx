import { useState, Link, useContext } from 'react';
import useServer from '../config';
import "../css/login.css"
import config from '../config.js';
import { UserContext } from '../App.jsx';


function Login() {
    const { userSession, setUserSession } = useContext(UserContext);

    const [formLogInData, setFormLogInData] = useState({                       //keeps the input
        username: "",
        password: "",
        confirmPassword: "",
    });

    const changeHandler = (event) => {                                         //handle input
        setFormLogInData(prevFormLogInData => {
            return {
                ...prevFormLogInData,
                [event.target.name]: event.target.value
            }
        });
    }
    const handleSubmit = (e) => {
        if (formLogInData.username === "" || formLogInData.password === "")
            alert("please enter all the required details");
        else {                                                              //create new user in the server
            e.preventDefault();
            const user = config.postData("login", formLogInData)
            // fetch(`http://localhost:3000/users?username=${FormLogInData.username}`)
            const token = user.token;
console.log(user);
            //const currentUser = users.find(user => user.website === FormLogInData.password);
            if (user.user) {
               // const userToLocalStorage = { ...currentUser, website: "" }
                // localStorage.setItem("user", JSON.stringify(userToLocalStorage));
                setUserSession(user.user);
                alert("succesfully connected");
              //  navigate(`/home/users/${currentUser.id}`);
            } else {
                alert("Uncorrect userName or Password");
                setFormLogInData({
                    username: "",
                    password: "",
                    confirmPassword: "",
                });
             //   navigate("/login");
            }
        }
    }



    return (
        <div className="overlay">
            <div className="modal">
                <button className="close-button" onClick={() => navigate('/')}>X</button>
                <form className="form login" onSubmit={handleSubmit}>
                    <h1 className="title">Log In</h1>
                    <label htmlFor="username" className="form-field">User Name: </label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="username"
                        value={formLogInData.username}
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
                    {/* <nav>
                        <Link className="link create-account-link" to="/register">Don't have an account? Create account</Link>
                    </nav> */}
                </form>
            </div>
        </div>
    );
}

export default Login;
