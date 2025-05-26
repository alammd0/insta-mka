import { setLoading, setToken, setUser } from "@/app/lib/slices/authSlice";
import { apiconnecter } from "../apiconnecter";

interface authFormData {
  email: string;
  password: string;
  name: string;
  phone: string;
  username: string;
}

export const signup = async ({
  email,
  password,
  name,
  phone,
  username,
}: authFormData) => {
  try {
    setLoading(true);

    const response = await apiconnecter("POST", "/signup", {
      email,
      password,
      name,
      phone,
      username,
    });

    console.log("Signup Response Inside API:", response);

    if (!response) {
      throw new Error("No response from server");
    }

    setUser(response.user);
    setToken(response.token);
    setLoading(false);

    return response;
  } catch (error) {
    console.error("Error during signup:", error);
    setLoading(false);
    throw error;
  }
};

export const signin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    setLoading(true);

    const response = await apiconnecter("POST", "/login", {
      email,
      password,
    });

    console.log("Login Response Inside API:", response);
    if (response.error) {
      throw new Error(response.error);
    }

    setUser(response.user);
    setToken(response.token);
    setLoading(false);

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    setLoading(false);
    throw error;
  }
};
