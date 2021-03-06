import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import AuthReducer from "./AuthReducer";

// JSON.parse(localStorage.getItem("user")) ||
const INITIAL_STATE = {
  currentUser: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [createdUser, setCreatedUser] = useState();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser: state.currentUser,
        dispatch,
        createdUser,
        setCreatedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
