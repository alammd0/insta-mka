"use client";
import { createPost } from "@/app/service/opreation/postAPI";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormData {
  title: string;
  description: string;
  location: string;
  image: File | null;
}

export default function CreatePost() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    location: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files.length > 0) {
      const file = files[0];

      const reader = new FileReader();

      reader.onload = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file);

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const [loading, setLoading] = useState(false);

  async function submitData() {
    setLoading(true);
    console.log("Start");
    try {
      const { title, description, location, image } = formData;

      if (!image) {
        throw new Error("Image is required");
      }

      // Generate a unique id for the post (for example, using Date.now())
      const id = Date.now().toString();
      const response = await createPost({
        id,
        title,
        description,
        location,
        image,
      });
      console.log(response);
      // then navigate
      router.push("/home");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="text-white lg:pt-10 pb-10 mb-16">
      <div className="flex flex-col gap-5 border-1 border-dotted rounded-xl border-fuchsia-600 px-8 py-6">
        <h2 className="text-xl font-semibold">Create a Post </h2>
        <div className="w-full">
          <form action={submitData} className="flex lg:flex-row flex-col gap-8 w-full">
            <div className="lg:max-w-[50%]">
              <label className="block w-full border-2 border-dashed border-gray-500 rounded-lg p-6 text-center cursor-pointer bg-gray-800 text-white">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Uploaded Preview"
                    className="mx-auto max-h-1/2 object-contain"
                  />
                ) : (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto mb-2 h-52 w-36 text-white opacity-50"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 16l4-5h-3V4h-2v7H8l4 5z" />
                      <path d="M20 18H4v-2h16v2z" />
                    </svg>
                    <p className="text-sm">
                      <strong>Click to upload</strong> or drag and drop
                      <br />
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                )}
              </label>
            </div>

            <div className="flex flex-col gap-7 items-center justify-center">
              <div>
                <input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="w-full px-2 py-2 outline-none hover:border-b-1 hover:border-blue-100 text-xl font-semibold capitalize transition-all duration-200"
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  id="description"
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="w-full px-2 py-2 outline-none hover:border-b-1 hover:border-blue-100 text-xl font-semibold capitalize transition-all duration-200"
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  id="location"
                  type="text"
                  name="location"
                  placeholder="Location"
                  className="w-full px-2 py-2 outline-none hover:border-b-1 hover:border-blue-100 text-xl font-semibold capitalize transition-all duration-200"
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="py-2 px-3 bg-blue-700 rounded-xl"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
