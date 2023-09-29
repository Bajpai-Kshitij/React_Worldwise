/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const reducerInitialState = {
  user: null,
  isAuthenticated: false,
};

const reducerFunction = function (state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknown function");
  }
};

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatcher] = useReducer(
    reducerFunction,
    reducerInitialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatcher({ type: "login", action: FAKE_USER });
    }
  }

  function logout() {
    dispatcher({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ login, logout, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Auth Context was used outside Auth provider");

  return context;
}

export { AuthProvider, useAuth };
