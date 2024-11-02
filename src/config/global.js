import { message } from "antd";
import { firestore , storage } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

window.isEmail = (email) => emailRegex.test(email);

window.toastify = (msg = "", type) => {
  switch (type) {
    case "success":
      message.success(msg);
      break;
    case "error":
      message.error(msg);
      break;
    case "info":
      message.info(msg);
      break;
    case "warning":
      message.warning(msg);
      break;
    default:
      message.info(msg);
  }
};

window.getUserData = async (uid) => {
  try {
    const docRef = doc(firestore, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

window.updateUserData = async (userId, userData) => {
  const userDocRef = doc(firestore, "users", userId); // Reference to Firestore document
  const { profilePic, ...otherData } = userData; // Separate profilePic from other fields

  try {
    // Upload profile picture if a new file is provided
    if (profilePic) {
      const storageRef = ref(storage, `profilePictures/${userId}`);
      await uploadBytes(storageRef, profilePic);
      const downloadURL = await getDownloadURL(storageRef);

      // Add the profile picture URL to user data
      otherData.profilePicUrl = downloadURL;
    }

    // Update Firestore document with new data
    await updateDoc(userDocRef, otherData);

    console.log("User data updated successfully.");
  } catch (error) {
    console.error("Error updating user data:", error);
    throw new Error("Failed to update user profile.");
  }
};
