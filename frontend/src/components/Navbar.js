import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../Assets/inotebook-icon.jpg"

const Navbar = () => {
    // useNavigate hook returns a function which can be used for programmatic navigation.
    let navigate = useNavigate();

    // useLocation hook returns the location object used by the react-router. This object represents the current URL and is immutable. Whenever the URL changes, the useLocation hook returns a newly updated location object.
    //when user logouts then we will also remove the auth-token from the local storage too
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    //here navbar is created using bootstrap
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-md gx-0">
                        <Link to="/">
                            <img src={Logo} alt='logo' className='navbar--logo' />
                        </Link>
                        <Link className="navbar-brand mx-3" to="/">iNotebook</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            
                            </ul>
                            {!localStorage.getItem("token") ?
                                <form className="d-flex">
                                    <Link className="btn btn-outline-primary mx-2" to="/login" role="button">Log In</Link>
                                    <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link>
                                </form> :
                                <button onClick={handleLogout} className="btn btn-primary mx-2">Log Out</button>
                            }
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Navbar;