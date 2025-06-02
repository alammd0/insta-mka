import Maincontent from "@/app/components/core/home/Maincontent";

export default function HomePage() {
  return (
    <div className="bg-[#000000] min-h-screen  flex justify-center items-center text-white">
      <div className="flex justify-center pr-20 pt-8 w-[100%] mx-auto gap-20">
        <div className="w-1/2 mx-auto flex justify-center items-center">
          <Maincontent />
        </div>

        <div className="w-1/2 mx-auto flex flex-col pl-20">
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
