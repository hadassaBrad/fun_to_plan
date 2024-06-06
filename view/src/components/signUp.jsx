import { useContext, useState } from 'react';
import  config  from '../config.js';


function SignUp() {
    const { userSession, setUserSession } = useContext();

    const [formLogInData, setFormLogInData] = useState({
        username: "",
        password: "",
        email:"",
        confirmPassword: "",
    })

    const changeHandler = (event) => {
        setFormLogInData(prevFormLogInData => {
            return {
                ...prevFormLogInData,
                [event.target.name]: event.target.value
            }
        });
    }
async function handleSubmit(e)  {
        if (formLogInData.username === "" || formLogInData.password === "")
            alert("please enter all the required details");
        else {                                                              //create new user in the server
            e.preventDefault();
            const currentUser =  await config.postData("signUp", formLogInData)
            const token = currentUser.token;
            //const token = currentUser.session.token;
            sessionStorage.setItem('token', token);

            if (currentUser) {
                setUserSession(currentUser);
                //modal.close()

            } else {
                alert("failed to save user");
                setFormLogInData({
                    username: "",
                    password: "",
                    confirmPassword: "",
                });

            }
        }
    }

    return (
        <div>
            <div className='container formSignUpLogIn logInDiv'>
                <form className="form login">
                    <h1 className="title">Log In</h1>
                    <label htmlFor="username" className="FormField">User Name: </label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="username"
                        value={formLogInData.username}
                        required
                        onChange={changeHandler}
                        className="input nameSign"
                    />
                    <label htmlFor="password" className="FormField">Password: </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="password"
                        value={formLogInData.password}
                        required
                        onChange={changeHandler}
                        className="input passwordLog"
                    />
                    <button className="button okeyLog" onClick={handleSubmit}>Continue</button><br />
                    {/* <nav> <Link className="link linkCreateAccount" to="/register"> Don't have an account? Create account</Link> </nav> */}
                </form>
            </div>
        </div>
    )
        ;
}
export default SignUp;
