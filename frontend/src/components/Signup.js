import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import sideImage from "../Assets/undraw_file_sync_ot38.svg";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let navigate = useNavigate();

  //when user clicks on Submit to signup then I will create entry of that user in my database by using the /createuser route
  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`${props.apiUrl}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Account created Successfully", "success");
    } else {
      props.showAlert("User already exists", "danger");
    }
  };

  const onChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className='container mb-5 signup--container'>
        <div className="row">
          <div className="col-md-6 order-md-2">
            <img src={sideImage} alt="coverImage" className="img-fluid" />
          </div>

          <div className="col-md-6 contents">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="mb-4">
                  <h3 className='signup--heading'>Sign up to<strong> iNotebook</strong></h3>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <div className="form-group first">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onChange={onChange} name='name' minLength={3} required />
                      <div id="nameHelp" className="form-text">*Name must be atleast 3 characters long.</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-group first">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} name='email' placeholder='example@mail.com' required />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-group first">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" className="form-control" id="password" onChange={onChange} name='password' minLength={6} required />
                      <div id="passwordHelp" className="form-text">*Password must be atleast 6 characters long.</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-group last mb-4">
                      <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                      <input type="password" className="form-control" id="confirmpassword" onChange={onChange} name='cpassword' minLength={6} required />
                    </div>
                    <div className="passwordMatching text my-1">
                      {
                        credentials.password === credentials.cpassword ? "" : "⚠️ Password does not match."
                      }
                    </div>
                  </div>

                  <button disabled={credentials.name.length < 3 || !credentials.email.includes("@") || credentials.password !== credentials.cpassword || credentials.password.length < 7} type="submit" className="btn btn-primary btn-block my-2 signup--btn">Sign Up</button>
                  <div id="logIn" className="form-text mt-4 redirect">Already have an account?
                    <Link className='redirect--link' to="/login"> Log in </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;