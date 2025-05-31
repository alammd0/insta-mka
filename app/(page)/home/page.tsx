import Maincontent from "@/app/components/core/home/Maincontent";
export default function HomePage() {
  return (
    <div className="bg-[#000000] min-h-screen flex text-white">
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
