import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "./authTypes";

const initialState = {
  user: null,
  error: null,
  successMessage: null,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        successMessage: action.payload.success,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
        successMessage: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        successMessage: action.payload.success,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
        successMessage: null,
      };
    default:
      return state;
  }
};

export default registerReducer;
