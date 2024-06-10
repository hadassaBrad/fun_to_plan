import { useState, Link, useContext } from 'react';
import useServer from '../config';
import "../css/login.css"
import config from '../config.js';
import { UserContext } from '../App.jsx';


function Login({ onClose }) {
    const { user, setUser } = useContext(UserContext);

    const [formLogInData, setFormLogInData] = useState({                       //keeps the input
        email: "",
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
    async function handleSubmit  (e)  {
        if (formLogInData.email === "" || formLogInData.password === "")
            alert("please enter all the required details");
        else {                                                              //create new user in the server
            e.preventDefault();
            const body={
                email:formLogInData.email,
                password:formLogInData.password
            }
            const user = await config.postData("login", body)
            console.log(user);

            // fetch(`http://localhost:3000/users?email=${FormLogInData.email}`)
        const token = user.token;
            //const currentUser = users.find(user => user.website === FormLogInData.password);
            if (user) {
               // const userToLocalStorage = { ...currentUser, website: "" }
                // localStorage.setItem("user", JSON.stringify(userToLocalStorage));
                setUser(user);
                alert("succesfully connected");
                onClose();
              //  navigate(`/home/users/${currentUser.id}`);
            } else {
                alert("Uncorrect email or Password");
                setFormLogInData({
                    email: "",
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
                          <button className="close-button" onClick={onClose }>X</button>
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
                    {/* <nav>
                        <Link className="link create-account-link" to="/register">Don't have an account? Create account</Link>
                    </nav> */}
                </form>
            </div>
        </div>
    );
}

export default Login;
