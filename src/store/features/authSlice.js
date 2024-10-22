import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, storage } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const initialState = {
  currentUser: null,
};

const getCurrentUserFromAuth = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user && user.uid) {
        const userRef = doc(storage, "users", user.uid);
        const userSnapShot = await getDoc(userRef);
        if (userSnapShot.exists()) {
          const response = { id: userSnapShot.id, ...userSnapShot.data() };
          resolve(response);
        } else {
          reject(new Error("User data does not exist"));
        }
      } else {
        resolve(null);
      }
    });
  });
};

export const checkCurrentUser = createAsyncThunk(
  "auth/checkCurrentUser",
  async () => {
    const user = await getCurrentUserFromAuth();
    return user;
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkCurrentUser.pending, () => {
        console.log("Checking current user...");
      })
      .addCase(checkCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        console.log("Current User:", action.payload);
      })
      .addCase(checkCurrentUser.rejected, (state, action) => {
        console.error("Error fetching user:", action.error.message);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.error("Error logging out:", action.error.message);
      });
  },
});

export default authSlice.reducer;

export const getCurrentUser = (state) => state.auth.currentUser;
