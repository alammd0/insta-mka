interface SelectUserModalProps {
  onClose: () => void;
}

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  posts?: string[];
  followers?: string[];
  following?: string[];
  profile?: {
    avatar?: string;
  };
}

export default function SelectUserModal({
  onClose,
  users,
}: SelectUserModalProps & { users: User[] }) {
  console.log("Users inside SelectUserModal: ", users);

  return (
    <div>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className=" w-[100vw] fixed top-1/2 left-1/2 z-50 max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-2xl border-2 border-fuchsia-500 bg-[#262626] p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white text-xl hover:text-fuchsia-400"
        >
          &times;
        </button>

        <div className="flex flex-col gap-6 w-full">
          {users.length > 0 ? (
            <div>
              {users.map((user) => {
                return (
                  <div key={user.id}>
                    <div className="flex items-center gap-16 p-4 border-b border-gray-700">
                      <div>
                        {user.profile?.avatar ? (
                          <img
                            src={user.profile.avatar}
                            alt={`${user.name}'s avatar`}
                            className="w-28 h-28 rounded-full"
                          />
                        ) : (
                          <div className="w-28 h-28 bg-gray-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-lg">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <h1 className="text-xl font-semibold text-white">{user.name}</h1>
                        <p className="text-sm text-gray-400">
                          @{user.username}
                        </p>

                        
                          <div className="flex flex-col mt-2 text-white">
                            <p className="text-[16px] font-normal capitalize font-family">
                              {(user.posts?.length ?? 0) === 0
                                ? "0"
                                : user.posts?.length}{" "}
                              posts
                            </p>

                            <p className="text-[16px] font-normal capitalize font-family">
                              {(user.followers?.length ?? 0) === 0
                                ? "0"
                                : user.followers?.length}{" "}
                              followers
                            </p>

                            <p className="text-[16px] font-normal capitalize font-family">
                              {user.following?.length === 0
                                ? "0"
                                : user.following?.length}{" "}
                              following
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                );
              })}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
