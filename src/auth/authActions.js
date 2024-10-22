import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, storage } from "../firebase/firebaseConfig";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "./authTypes";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { checkCurrentUser } from "../store/features/authSlice";

export const registerUser =
  (firstName, lastName, email, password) => async (dispatch) => {
    if (!email || !password || !firstName || !lastName) return;

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const docRef = doc(storage, "users", user.uid);

      const userDoc = await getDoc(docRef);

      if (!userDoc.exists()) {
        await setDoc(docRef, {
          userId: user.uid,
          username: `${firstName} ${lastName}`,
          email: email,
        });
      }
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          uid: user.uid,
          email: email,
          username: `${firstName} ${lastName}`,
        },
      });
      dispatch(checkCurrentUser());
      return { success: "Sign Up Successful" };
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.message,
      });
      return { error: error.message };
    }
  };

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { uid: user.uid, email: user.email },
    });
    dispatch(checkCurrentUser());
    return { success: "Login Successful" };
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
    return { error: error.message };
  }
};
