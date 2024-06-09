import { useContext, useEffect, useState } from 'react';
import config from '../config.js';
import { UserContext } from '../App';



function SignUp() {

    const { userSession, setUserSession } = useContext(UserContext);

    const [formsignInData, setFormsignInData] = useState({
        username: "",
        password: "",
        email: "",
        confirmPassword: "",
    })


    const changeHandler = (event) => {
        setFormsignInData(prevFormsignInData => {
            return {
                ...prevFormsignInData,
                [event.target.name]: event.target.value
            }
        });
    }
    async function handleSubmit(e) {
        if (formsignInData.username === "" || formsignInData.password === "")
            alert("please enter all the required details");
        else {                                                              //create new user in the server
            e.preventDefault();
            const body = {
                role_id: 1,
                password: formsignInData.password,
                userName: formsignInData.username,
                email: formsignInData.email
            }
            const currentUser = await config.postData("signUp", body)
            const token = currentUser.token;
            //const token = currentUser.session.token;
            sessionStorage.setItem('token', token);

            if (currentUser) {
                setUserSession(currentUser);
                //modal.close()

            } else {
                alert("failed to save user");
                setFormsignInData({
                    username: "",
                    password: "",
                    confirmPassword: "",
                });

            }
        }
    }

    return (
        <div>
            <div className='container formSignUpsignIn signInDiv'>
                <form className="form signin">
                    <h1 className="title">Sign Up</h1>
                    <label htmlFor="username" className="FormField">User Name: </label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="username"
                        value={formsignInData.username}
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
                        value={formsignInData.password}
                        required
                        onChange={changeHandler}
                        className="input passwordsign"
                    />
                    <button className="button okeysign" onClick={handleSubmit}>Continue</button><br />
                    {/* <nav> <Link className="link linkCreateAccount" to="/register"> Don't have an account? Create account</Link> </nav> */}
                </form>
            </div>
        </div>
    )
        ;
}
export default SignUp;
