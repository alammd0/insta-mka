import {
  createcomment,
  getallcomment,
} from "@/app/service/opreation/commentAPI";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/app/utils/data";

interface propsData {
  onclose: () => void;
  postId: string;
}

interface Comment {
  user: {
    name: string;
    // add other user properties if needed
  };
  comment: string;
  createdAt: string;
}

export default function CreateCommentModal({ onclose, postId }: propsData) {
  console.log(postId);

  const [comment, setComment] = useState("");

  const [allComments, setAllComments] = useState<Comment[]>([]);

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

  //  get all comment in a single post
  useEffect(() => {
    const getcommets = async () => {
      try {
        const res = await getallcomment({ postId });

        if (res) {
          setAllComments(res);
        } else {
          console.log("Error Fetching comments");
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    };

    getcommets();
  }, [postId]);

  console.log("All Are there Modal...", allComments);

  const formattedDates = allComments.map((data) => {
    return formatDate(data.createdAt);
  });

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

        {/* show all comment here */}

        <div>
          <div>
            {allComments.length > 0 && (
              <div>
                {allComments.map((comment, index) => (
                  <div className="flex justify-between gap-2 bg-fuchsia-900 m-2 px-3 py-2 rounded-xl text-[14px]">
                    <div>
                      <h2 className="text-[16px] font-bold">{comment.user.name}</h2>
                      <p>{comment.comment}</p>
                    </div>

                    <p className="text-[9px] font-bold">{formattedDates[0]}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

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
