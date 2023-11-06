import { GOOGLE_MAP } from "../constants/map";
import { isEmpty } from "validator";

let initalState = {
  userProfile: {}
};

const mapReducer = (state = initalState, action) => {
  switch (action.type) {
    case GOOGLE_MAP: 
    {
      const updateState = { ...state };
      updateState.userProfile = action.payload;
      updateState.isAuthenticated = !isEmpty(action.payload.username);
      return updateState;
    }
    default:
      return state;
  }
};
export default mapReducer;