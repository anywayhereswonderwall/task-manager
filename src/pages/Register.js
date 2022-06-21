import React, { useEffect, useState } from "react";
import at from "../assets/icons/at.svg";
import lock from "../assets/icons/lock.svg";
import registerImg from "../assets/images/registerImg.svg";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [passwordError, setPasswordError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const { setCreatedUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordError && !passwordLengthError && email) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setCreatedUser(true);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (password !== confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (password.length < 6 && password.length !== 0) {
      setPasswordLengthError(true);
    } else {
      setPasswordLengthError(false);
    }
  }, [password, confirmPassword]);

  return (
    <>
      <div className="form-container">
        <h1 className="heading">Let's sign up!</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <img className="input-container-icon" src={at} alt="at icon" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
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
          <div className="input-container">
            <img className="input-container-icon" src={lock} alt="lock icon" />
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              type="password"
            />
          </div>
          {passwordError && <span>Passwords don't match</span>}
          {passwordLengthError && <span>Password is too weak</span>}
          <button type="submit" className="btn btn-main">
            Sign up
          </button>
          <Link to="/">
            <button className="btn btn-secondary">Back</button>
          </Link>
        </form>
      </div>
      <div className="image-container">
        <img src={registerImg} alt="" />
      </div>
    </>
  );
};

export default Register;
