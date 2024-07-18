import React, { useEffect } from 'react';

const GoogleAuth = (props) => {
  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const authToken = urlParams.get('authtoken');
    const errval = urlParams.get('errval');
    if (authToken) {
      // Store the token in local storage
      // console.log(props);
      console.log(authToken);
      localStorage.setItem('token', authToken);
      props.showAlert("Login Successful", "success");
      window.location.href = "/";
    } 
    if(errval){
        props.showAlert("Invalid Credentials", "danger");
    }
    // else{
    // }
  }, [props]);

  const handleGoogleLogin = () => {
    // Redirect to the Google authentication endpoint on your backend
    window.location.href = `${props.apiUrl}/auth/google`;
  };

  return (
    <div className="d-grid gap-2">
      <button className="btn btn-danger btn-block" onClick={handleGoogleLogin}>
        <i className="bi bi-google"></i> Sign in with Google
      </button>
    </div>
  );
};

export default GoogleAuth;
