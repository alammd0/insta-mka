import { setLoading, setToken, setUser } from "@/app/lib/slices/authSlice";
import { apiconnecter } from "../apiconnecter";
import { AppDispatch } from "@/app/lib/store";

interface authFormData {
  email: string;
  password: string;
  name: string;
  phone: string;
  username: string;
}

interface updateUserData {
  name?: string;
  email?: string;
  phone?: string;
  username?: string;
}

export const signup = async (
  { email, password, name, phone, username }: authFormData,
  dispatch: AppDispatch
) => {
  try {
    setLoading(true);

    const response = await apiconnecter(
      "POST",
      "/auth/signup",
      JSON.stringify({
        email,
        password,
        name,
        phone,
        username,
      })
    );

    console.log("Signup Response Inside API:", response);

    if (!response) {
      throw new Error("No response from server");
    }

    dispatch(setUser(response.user));
    dispatch(setToken(response.token));

    setLoading(false);

    return response;
  } catch (error) {
    console.error("Error during signup:", error);
    setLoading(false);
    throw error;
  }
};

export const signin = async (
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  },
  dispatch: AppDispatch
) => {
  try {
    setLoading(true);

    const response = await apiconnecter(
      "POST",
      "/auth/login",
      JSON.stringify({ email, password })
    );

    console.log("Login Response Inside API:", response);

    console.log(response.token);
    console.log(response.user);

    if (response.error) {
      throw new Error(response.error);
    }

    dispatch(setUser(response.user));

    dispatch(setToken(response.token));

    setLoading(false);

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    setLoading(false);
    throw error;
  }
};

export const getuser = async ({
  token,
  username,
}: {
  token: string;
  username: string;
}) => {
  try {
    // Assuming the token should go in the Authorization header, not in the body
    const response = await apiconnecter("GET", `/user/${username}`, undefined, {
      Authorization: `Bearer ${token}`,
    });

    console.log("Full Details inside : ", response);
    return response;
  } catch (err) {
    console.log("Error fetching user data: ", err);
  }
};

export const updateUser = async (
  data: updateUserData,
  dispatch: AppDispatch
) => {
  try {
    const response = await apiconnecter(
      "PUT",
      "auth/update-user",
      JSON.stringify(data)
    );

    console.log("Signup Response Inside API:", response);

    if (!response) {
      throw new Error("No response from server");
    }

    dispatch(setUser(response.user));

    return response;
  } catch (err) {
    console.log("Error updating user data: ", err);
    throw err;
  }
};