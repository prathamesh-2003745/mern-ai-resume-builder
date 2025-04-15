// /logs/userLogs.js

export const logUserData = (user, actionType = "Registered") => {
    console.log(`🟢 USER ${actionType} 🟢`);
    console.log("First Name:", user.firstName);
    console.log("Last Name:", user.lastName);
    console.log("Email:", user.email);
    console.log("User ID:", user._id);
    console.log("-------------------------------");
  };
  