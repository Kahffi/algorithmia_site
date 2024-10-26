import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from "react";

export type TUser =
  | {
      _id: string;
      username: string;
      fullname: string;
      password: string;
      whatsapp: string;
      poin: number;
      __v: number;
    }
  | any;

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
      localStorage.removeItem("user");
      return null;
    default:
      return { ...state };
  }
};
export const UserContext = createContext<null | {
  state: TUser | null;
  dispatch: Dispatch<TUserReducerAction>;
}>({ state: null, dispatch: () => undefined });

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    userReducer,
    JSON.parse(localStorage.getItem("user") as string)
  );

  useEffect(() => {
    const prevSession = JSON.parse(localStorage.getItem("user") as string);

    if (prevSession) {
      dispatch({ type: "LOGIN", payload: prevSession });
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
