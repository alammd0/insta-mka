import { apiconnecter } from "../apiconnecter";

interface formData {
  id: string;
  title: string;
  description: string;
  location: string;
  image: File;
}

export const createPost = async ({
  title,
  description,
  location,
  image,
}: formData) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("image", image);

    const response = await apiconnecter("POST", "/post/create-posts", formData);

    // console.log("CreatePost Response:", response);

    if (!response) {
      throw new Error("No response from server");
    }

    return response;
  } catch (err) {
    console.log("Error creating post:", err);
  }
};

export const getPost = async () => {
  try {
    const response = await apiconnecter("GET", "/post/get-posts");

    if (!response || !response.data) {
      throw new Error("No Post Data Found...");
    }

    return response;
  } catch (err) {
    console.log(err);
    throw new Error("find post error....");
  }
};


