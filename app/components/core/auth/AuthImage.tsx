import Image from "next/image";
import screenshot from "../../../assets/screenshot1.png";

interface AuthFormProps {
  type: "login" | "signup";
}

export default function AuthImage() {
  return (
    <div className="h-[600px] w-[300px] hidden md:flex">
      <Image  className=" h-full w-full" src={screenshot} alt="hello" width={400} height={300} />
    </div>
  );
}
