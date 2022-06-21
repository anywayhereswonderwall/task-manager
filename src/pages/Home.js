import React, { useEffect, useState } from "react";
import x from "../assets/icons/x.svg";
import bars from "../assets/icons/bars.svg";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import NameForm from "../pages/NameForm";
import Todo from "../components/Todo";

const Home = () => {
  const [userName, setUserName] = useState("");
  const { dispatch, currentUser } = useAuth();
  const userId = currentUser.uid;

  const getUserName = async () => {
    const docRef = doc(db, "userNames", `${userId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const name = docSnap.data().name;
      setUserName(name);
    }
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUserName();
  }, [currentUser]);

  return userName ? (
    <>
      <nav className="nav">
        <h1>Hello, {userName}</h1>
        <button onClick={() => logOut()}>Sign out</button>
      </nav>
      <div className="todos-container">
        <Todo />
      </div>
    </>
  ) : (
    <NameForm props={{ setUserName }} />
  );
};

export default Home;
