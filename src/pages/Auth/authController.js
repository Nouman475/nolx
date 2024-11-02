import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, firestore } from "config/firebase";
import { useAuthContext } from "contexts/AuthContext";

const AuthController = () => {
  const { dispatch } = useAuthContext();
  const provider = new GoogleAuthProvider();

  const addUserToDB = async (user, additionalData = {}) => {
    const userData = {
      fullName: user.displayName || "Anonymous",
      email: user.email || "",
      uid: user.uid,
      phone: user.phoneNumber || "",
      dateCreated: serverTimestamp(),
      isActive: true,
      ...additionalData,
    };

    try {
      await setDoc(doc(firestore, "users", user.uid), userData);
      dispatch({ type: "SET_LOGGED_IN", payload: { user: userData } });
    } catch (error) {
      console.error("Error adding user to database:", error);
    }
  };

  const register = async (fullName, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await addUserToDB({ ...user, displayName: fullName });
      return user;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch({ type: "SET_LOGGED_IN", payload: { user } });
      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await addUserToDB(user);
      dispatch({ type: "SET_LOGGED_IN", payload: { user } });
      return user;
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  };

  //LOGOUT FUNCTION

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "SET_LOGGED_OUT" }); // Dispatch a logout action
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  // New phone-based signup with password function
  
  let recaptchaVerifier = null;

  const initializeRecaptcha = () => {
    if (!recaptchaVerifier) {
      recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA solved");
          },
        },
        auth
      );
    }
  };

  const signInWithPhone = async (phoneNumber) => {
    try {
      initializeRecaptcha(); // Ensure recaptcha is initialized
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      return confirmationResult;
    } catch (error) {
      console.error("Error during phone sign-in:", error);
      throw error;
    }
  };

  const verifyOtp = async (confirmationResult, otp) => {
    try {
      const userCredential = await confirmationResult.confirm(otp);
      return userCredential.user;
    } catch (error) {
      console.error("OTP verification failed:", error);
      throw error;
    }
  };

  return {
    register,
    login,
    loginWithGoogle,
    initializeRecaptcha,  // Add initializeRecaptcha here
    signInWithPhone,
    verifyOtp,
    logout,
  };
};

export default AuthController;
