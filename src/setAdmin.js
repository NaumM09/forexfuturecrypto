import admin from "./adminSetup.mjs";

// Function to set admin privileges
const setAdmin = async (uid) => {
  try {
    await admin.auth().setCustomUserClaims(uid, { isAdmin: true });
    console.log(`Successfully granted admin privileges to user with UID: ${uid}`);
  } catch (error) {
    console.error("Error setting admin privileges:", error);
  }
};

// Example usage: Replace with the UID of the user you want to make an admin
const userUID = "wMGiCnseo9VN4FYY1apPCcOg1NZ2";
setAdmin(userUID);
