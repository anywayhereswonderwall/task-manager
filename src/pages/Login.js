import React, { useState } from "react";
import at from "../assets/icons/at.svg";
import lock from "../assets/icons/lock.svg";
import loginImg from "../assets/images/loginImg.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createdUser, setCreatedUser] = useState(false);

  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          dispatch({ type: "LOGIN", payload: user });
          navigate("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="form-container">
        <h1 className="heading">Hello!</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <img className="input-container-icon" src={at} alt="at icon" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
            />
          </div>
          <div className="input-container">
            <img className="input-container-icon" src={lock} alt="lock icon" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />
          </div>
          {error && <span>Password or email is incorrect :/</span>}
          <button type="submit" className="btn btn-main">
            Sign in
          </button>
          <p className="or">or</p>
          <p>Don't have an account?</p>
          <Link to="signup">
            <button className="btn btn-secondary">Sign up</button>
          </Link>
        </form>
      </div>
      <div className="image-container">
        <img src={loginImg} alt="" />
      </div>
    </>
  );
};

export default Login;
