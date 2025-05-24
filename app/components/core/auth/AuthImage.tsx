import Image from "next/image";
import screenshot from "../../../assets/screenshot1.png";

interface AuthFormProps {
  type: "login" | "signup";
}

export default function AuthImage() {
  return (
    <div className="h-[620px] w-[320px]">
      <Image  className=" h-full w-full" src={screenshot} alt="hello" width={400} height={300} />
    </div>
  );
}
