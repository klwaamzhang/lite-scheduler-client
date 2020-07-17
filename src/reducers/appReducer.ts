import { AppState, AppAction } from "../@types/app";

const initialState: AppState = {
  userData: {
    _id: "123",
    emailAddress: "",
    userName: "",
    password: "",
    accountType: "Unregistered",
  },
  isSignedin: false,
};

export function appReducer(state = initialState, action: AppAction): AppState {
  switch (action.type) {
    case "FETCH_USER_DATA":
      return { ...state, userData: action.payload };
    case "SIGN_IN":
      return { ...state, isSignedin: true };
    default:
      return state;
  }
}
