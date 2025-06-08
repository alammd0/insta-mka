import Alluser from "@/app/components/core/home/AllUser";
import Maincontent from "@/app/components/core/home/Maincontent";

export default function HomePage() {
  return (
    <div className="bg-[#000000] min-h-screen  flex justify-center items-center text-white">
      <div className="flex justify-center pr-20 pt-8 w-[100%] mx-auto gap-20">
        <div className="w-1/2 mx-auto flex justify-center items-center">
          <Maincontent />
        </div>

        <div className="w-1/2 mt-10 mx-auto flex flex-col pl-20">
          <Alluser />
        </div>
      </div>
    </div>
  );
}
