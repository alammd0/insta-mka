"use client";

import SelectUserModal from "@/app/components/core/modals/SelectUserModal";
import { getuser } from "@/app/service/opreation/authAPI";
import { useState, useEffect } from "react";

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
    bio?: string;
  };
}

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim() === "") {
        setUsers([]);
        setSelectedUser(null);
        return;
      }

      fetchUsers();
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getuser({ username: query, exact: false });

      setUsers(res.data || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = async (username: string) => {
    setLoading(true);
    try {
      const response = await getuser({ username, exact: true });
      console.log("inside Profile Page : ", response);
      setSelectedUser(response.data);
    } catch (err) {
      console.error("User fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  console.log("Users In select : ", selectedUser);

  return (
    <div className="w-[100vh] max-w-md mx-auto p-6 rounded-lg shadow-lg">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedUser(null); // reset detail view on new search
        }}
        placeholder="Search username or name"
        className="w-full p-2 border rounded mb-4 bg-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading && <p className="text-gray-500">Loading...</p>}

      {!selectedUser && (
        <ul
          className="space-y-2 text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {users.map((user) => (
            <li
              key={user.id}
              className="cursor-pointer border p-3 rounded hover:bg-gray-700 flex items-center gap-3"
              onClick={() => handleUserClick(user.username)}
            >
              <img
                src={user.profile?.avatar || "/default-avatar.png"}
                alt={user.username}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">@{user.username}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedUser && (
        // <div className="mt-6 border p-4 rounded bg-white shadow">
        //   <div className="flex items-center gap-4">
        //     <img
        //       src={selectedUser.profile?.avatar || "/default-avatar.png"}
        //       alt={selectedUser.name}
        //       className="w-16 h-16 rounded-full"
        //     />
        //     <div>
        //       <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
        //       <p className="text-sm text-gray-600">@{selectedUser.username}</p>
        //       <p className="text-sm text-gray-500">{selectedUser.email}</p>
        //       {selectedUser.profile?.bio && (
        //         <p className="text-sm mt-2 text-gray-700">
        //           {selectedUser.profile.bio}
        //         </p>
        //       )}
        //     </div>
        //   </div>
        // </div>
        <div>
          <SelectUserModal
            onClose={closeModalHandler}
            users={selectedUser ? [selectedUser] : []}
          ></SelectUserModal>
        </div>
      )}
    </div>
  );
}
