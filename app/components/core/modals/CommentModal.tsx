import { createcomment } from "@/app/service/opreation/commentAPI";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface propsData {
  onclose: () => void;
  postId: string;
}

export default function CreateCommentModal({ onclose, postId }: propsData) {
  console.log(postId);

  const [comment, setComment] = useState("");

  const router = useRouter();

  const commentChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    console.log(e.target.value);
    setComment(e.target.value);
  };

  const submithandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      if (!postId || !comment) {
        throw new Error("Post ID and comment are required.");
      }

      const response = await createcomment({ postId, comment });

      console.log("Comment Here -> ", response?.data);

      if (response?.data) {
        router.push("/home");
        onclose();
      } else {
        throw new Error("Failed to create comment.");
      }
    } catch (err) {
      console.error("Error calling Create Comment API:", err);
    }
  };

  return (
    <div>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onclose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-2xl border-2 border-fuchsia-500 bg-[#262626] p-6 shadow-lg">
        {/* Close Button */}
        <button
          onClick={onclose}
          className="absolute right-4 top-4 text-white text-xl hover:text-fuchsia-400"
        >
          &times;
        </button>

        <div>
          <form onSubmit={submithandle} className="flex flex-col gap-2">
            <div className="border-b-1 -pb-2 rounded-sm">
              <input
                placeholder="Write comment here...."
                value={comment}
                name="comment"
                onChange={commentChange}
                type="text"
                id="comment"
                className="w-full rounded-lg border px-2 py-3 outline-none border-none"
              />
            </div>
            <button
              type="submit"
              className="bg-fuchsia-900 px-4 py-2 rounded-xl text-white font-semibold w-fit"
            >
              {" "}
              Post{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
