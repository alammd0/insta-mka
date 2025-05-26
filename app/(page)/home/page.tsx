import Maincontent from "@/app/components/core/home/Maincontent";
import SideBar from "@/app/components/core/home/SideBar";

export default function HomePage() {
  return (
    <div className="bg-[#000000] min-h-screen flex text-white">
      {/* two Section */}
      {/* 1. Side Bar */}
      <div className="w-1/5 bg-[#000000] p-4 border-r-1 border-r-white">
        <SideBar />
      </div>

      {/* 2. Main content */}
      <div className="flex justify-between gap-20 p-2">
        <div className="w-4/5">
          <Maincontent />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-center mt-10">
            Welcome to the Follow Side
          </h1>
          <p className="text-center mt-4">
            This is the main content area where you can add your content.
          </p>
        </div>
      </div>

      {/* 3. section hai */}
    </div>
  );
}
