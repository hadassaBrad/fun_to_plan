// import { Link } from "react-router-dom";

function Header() {
  
    
    return (
        <header>
            <nav>
                <button
                    onClick={() => {
                        localStorage.clear();
                        setCurrentUser({});
                        navigate("/home");
                    }}
                >Logout</button>
        
                <Link to={`/home/about`}>About</Link>
                <Link to={`/home/gallery`}>Gallery</Link>
                <Link to={`/home/sites`}>Sites</Link>
                <Link to={`/home/basket`}>Basket</Link>
                <Link to={`/home/tripRoute`}>My Trip Routes</Link>//רק במקרה שהיש משתמש מחובר רואים את זה
                <button
                    onClick={() => {
                    
                    }}
                >Login</button>
                <button
                    onClick={() => {
                     
                    }}
                >
                    Signup
                </button>
            </nav>
        </header>
    );
}
export default Header;
