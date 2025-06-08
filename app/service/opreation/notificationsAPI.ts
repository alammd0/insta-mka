import { apiconnecter } from "../apiconnecter";

export const getnotification = async () => {
  try {
    const response = await apiconnecter("GET", "/notifications");

    if (response) {
      return response;
    } else {
      console.log("Error here");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
