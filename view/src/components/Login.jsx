import { useServer } from "../App";
import useServer from '../config';

function Login() {
    const { user, setUser, postData } = useServer();

    const [formLogInData, setFormLogInData] = useState({                       //keeps the input
        username: "",
        password: "",
        confirmPassword: "",
    })

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
            const user = postData("login", formLogInData)
            // fetch(`http://localhost:3000/users?username=${FormLogInData.username}`)
         const token=user.token;

            const currentUser = users.find(user => user.website === FormLogInData.password);
            if (currentUser) {
                const userToLocalStorage = { ...currentUser, website: "" }
                localStorage.setItem("user", JSON.stringify(userToLocalStorage));
                setUser(currentUser);
                alert("succesfully connected");
                navigate(`/home/users/${currentUser.id}`);
            } else {
                alert("Uncorrect userName or Password");
                setFormLogInData({
                    username: "",
                    password: "",
                    confirmPassword: "",
                });
                navigate("/login");
            }
        })
    }
};
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
                    value={FormLogInData.username}
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
                    value={FormLogInData.password}
                    required
                    onChange={changeHandler}
                    className="input passwordLog"
                />
                <button className="button okeyLog" onClick={handleSubmit}>Continue</button><br />
                <nav> <Link className="link linkCreateAccount" to="/register"> Don't have an account? Create account</Link> </nav>
            </form>
        </div>
    </div>
)
}

export default Login;
