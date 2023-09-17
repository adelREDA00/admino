import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  Id: JSON.parse(localStorage.getItem("Id")) || null,
};

export const EditContext = createContext(INITIAL_STATE);


const AuthReducer = (state, action) => {
  switch (action.type) {
    case "EDIT_START":
      return {
        Id: action.payload,
      };
    case "EDIT_SUCCESS":
      return {
        Id: null,
      };
    default:
      return state;
  }
};


export const EditContextProvider = ({ children }) => {
  const [state, dispatchEdit] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("Id", JSON.stringify(state.Id));
  }, [state.Id]);


  return (
    <EditContext.Provider
      value={{
        Id: state.Id,
        dispatchEdit,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};