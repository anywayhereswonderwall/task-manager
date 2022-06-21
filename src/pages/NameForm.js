import React, { useState } from "react";
import nameIcon from "../assets/icons/name.svg";
import nameImg from "../assets/images/nameImg.svg";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const NameForm = ({ props }) => {
  const [curName, setCurName] = useState("");
  const { currentUser } = useAuth();
  const userId = currentUser.uid;
  const { setUserName } = props;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "userNames", `${userId}`), {
      name: `${curName}`,
    });
    setUserName(curName);
  };
  return (
    <>
      <div className="form-container">
        <h1 className="heading">Almost there! We'd love to know your name.</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <img
              className="input-container-icon"
              src={nameIcon}
              alt="lock icon"
            />
            <input
              value={curName}
              onChange={(e) => setCurName(e.target.value)}
              placeholder="Name"
              type="text"
            />
          </div>
          <button type="submit" className="btn btn-main">
            Get started!
          </button>
        </form>
      </div>
      <div className="image-container">
        <img src={nameImg} alt="" />
      </div>
    </>
  );
};

export default NameForm;
