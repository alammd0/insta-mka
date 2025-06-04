"use client";

import { useForm } from "react-hook-form";

type Inputs = {
  oldPassword: string;
  newPassword: string;
};

export default function ChangePasswordPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    try {
      const response = await fetch("/api/auth/changepassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to change password");
      }

      reset(); // Reset form on success
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[#2d2b2b] rounded-lg shadow-md w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="">
          <label htmlFor="oldpassword">Old Password : </label>
          <input
            type="password"
            id="oldpassword"
            {...register("oldPassword", { required: true })}
             className="w-[100%] rounded-lg bg-[#393737] mt-2 px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          />
          {errors.oldPassword && <span>This field is required</span>}
        </div>

        <div >
          <label htmlFor="newpassword">New Password : </label>
          <input
            type="password"
            id="newpassword"
            className="w-[100%] rounded-lg bg-[#393737] mt-2 px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            {...register("newPassword", { required: true })}
          />
          {errors.newPassword && <span>This field is required</span>}
        </div>

        <button type="submit" className="w-full rounded-lg bg-fuchsia-600 px-4 py-2 text-white transition hover:bg-fuchsia-700"> Update Password </button>
      </form>
    </div>
  );
}
