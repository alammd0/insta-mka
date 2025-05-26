import Link from "next/link";
import { sidebarItems } from "../../data/sidebar_link";

export default function SideBar() {
  return (
    <div>
      <div className="flex flex-col h-screen text-white gap-3">
        <h2 className="text-center font-family text-2xl uppercase px-2 py-3">
          Insta mka
        </h2>

        <div className="flex flex-col gap-3">
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
        </div>
      </div>
    </div>
  );
}
