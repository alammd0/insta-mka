"use client";

import Link from "next/link";
import { sidebarItems } from "../../data/sidebar_link";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import MoreModal from "../modals/MoreModal";

export default function SideBar() {
  const [moreModalOpen, setMoreModalOpen] = useState(false);

  const openMoreModal = () => {
    setMoreModalOpen(true);
    console.log("More modal opened");
  };

  const closeMoreModal = () => {
    setMoreModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col h-screen text-white gap-3">
        <h2 className="text-center font-family text-2xl uppercase px-2 py-3">
          Insta mka
        </h2>

        <div className="flex flex-col gap-3 px-2 py-3">
          <div className="flex flex-col gap-4">
            {sidebarItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <item.icon className="w-6 h-6" />
                <span className="text-lg">{item.label}</span>
              </Link>
            ))}
          </div>

          <div>
            <button
              onClick={openMoreModal}
              className="flex items-center justify-center gap-2 px-3 py-2 text-lg cursor-pointer"
            >
              {" "}
              <IoMenu /> More
            </button>
          </div>
        </div>
      </div>

      {
        moreModalOpen && ( 
          <div>
            <MoreModal onClose={closeMoreModal}></MoreModal>
          </div>
        )
      }
    </div>
  );
}
