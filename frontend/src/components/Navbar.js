import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../Assets/inotebook-icon.jpg"

const Navbar = (props) => {
    // useNavigate hook returns a function which can be used for programmatic navigation.
    let navigate = useNavigate();

    // Searchbar - live search
    const handleSearch = (event) => {
        props.setSearchQuery(event.target.value);
    };
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
                <nav className={`navbar navbar-expand-sm ${props.navBg ? 'fixed-top' : ""} navbar-dark bg-dark`}>
                    <div className="container ">
                        <Link to="/">
                            <img src={Logo} alt='logo' className='navbar--logo' />
                        </Link>
                        <Link className="navbar-brand mx-3" to="/">iNotebook</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        {/* Searchbar  */}
                        {localStorage.getItem("token") ?
                        <form className="mx-md-5 mx-2 my-2 search-bar" role="search">
                            <div className="input-group">
                                <input type="text" className="search form-control" placeholder="Search" value={props.searchQuery}
                                    onChange={handleSearch} />
                                <button className={`btn btn-reset d-${props.searchQuery.length > 0 ? 'block' : 'none'}`} type="reset" onClick={() => props.setSearchQuery('')} id="button-addon2">❌</button>
                                <button className="btn btn-search" type="button" id="button-addon2">🔍</button>
                            </div>
                        </form>:<></>
                        }

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            </ul>
                            {!localStorage.getItem("token") ?
                                <form className="d-flex flex-column flex-sm-row ">
                                    <Link className="btn btn-outline-primary mx-3 mb-2 mb-sm-0 py-3 py-sm-2" to="/login" role="button">Log In</Link>
                                    <Link className="btn btn-primary mx-3 py-3 py-sm-2" to="/signup" role="button">Sign Up</Link>
                                </form> :
                                <div className="d-flex">
                                    <button onClick={handleLogout} className="btn btn-dark text-danger mx-2 w-100 text-start">Log Out</button>
                                </div>
                            }
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Navbar;