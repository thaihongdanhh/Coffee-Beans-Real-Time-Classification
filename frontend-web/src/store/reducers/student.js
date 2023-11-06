import { GET_STUDENT } from "../constants/student";
import { isEmpty } from "validator";

let initalState = {
  studentProfile: {}
};

const studentReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_STUDENT: 
    {
      const updateState = { ...state };
      updateState.studentProfile = action.payload;
      updateState.isAuthenticated = !isEmpty(action.payload.id);
      return updateState;
    }
    default:
      return state;
  }
};
export default studentReducer;
