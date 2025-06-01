import Maincontent from "@/app/components/core/home/Maincontent";

export default function HomePage() {
  return (
    <div className="bg-[#000000] min-h-screen  text-white">
      <div className="flex justify-between pr-20 pt-8">
        
        <div className="w-1/2 mx-auto flex justify-center items-center pl-4">
          <Maincontent />
        </div>

        <div className="w-1/2">
          <h1 className="text-2xl font-bold text-center mt-10">
            Welcome to the Follow Side
          </h1>
          <p className="text-center mt-4">
            This is the main content area where you can add your content.
          </p>
        </div>

      </div>
    </div>
  );
}
