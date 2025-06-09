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
        <h2 className="text-center font-family text-2xl uppercase px-2 py-3 hidden lg:flex">
          Insta mka
        </h2>

        <div className="flex md:flex-col flex-row gap-3 px-2 py-3">
          <div className="flex md:flex-col flex-row gap-4">
            {sidebarItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <item.icon className="lg:w-6 lg:h-6 h-8 w-8" />
                <span className="text-lg hidden lg:flex">{item.label}</span>
              </Link>
            ))}
          </div>

          <div>
            <button
              onClick={openMoreModal}
              className="flex items-center justify-center gap-2 px-3 py-2 text-lg cursor-pointer"
            >
              {" "}
              <IoMenu className="lg:w-6 lg:h-6 h-8 w-8"/> <span className="text-lg hidden lg:flex">More</span> 
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
