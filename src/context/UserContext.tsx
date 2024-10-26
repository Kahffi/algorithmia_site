import { createContext, Dispatch, ReactNode, useReducer } from "react";

export type TUser = {
  _id: string;
  username: string;
  fullname: string;
  password: string;
  whatsapp: string;
  poin: number;
  __v: number;
};

type TUserReducerAction = {
  payload?: unknown;
  type: "LOGIN" | "LOGOUT";
};

const userReducer = (state: TUser, action: TUserReducerAction) => {
  switch (action.type) {
    case "LOGIN":
      console.log(state);
      return { ...(action.payload as TUser) };

    case "LOGOUT":
      return {
        _id: "",
        fullname: "",
        username: "",
        password: "",
        whatsapp: "",
        poin: 0,
        __v: 0,
      };
    default:
      return { ...state };
  }
};
export const UserContext = createContext<null | {
  state: TUser | null;
  dispatch: Dispatch<TUserReducerAction>;
}>({ state: null, dispatch: () => undefined });

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, {
    _id: "",
    fullname: "",
    username: "",
    password: "",
    whatsapp: "",
    poin: 0,
    __v: 0,
  });

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
