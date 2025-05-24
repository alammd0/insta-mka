import AuthForm from "@/app/components/core/auth/AuthFrom";
import AuthImage from "@/app/components/core/auth/AuthImage";

export default function signupComponent() {
  return (
    <div className="bg-[#000000] min-h-screen flex items-center justify-center text-white gap-10">
      <div>
        <AuthImage/>
      </div>
      <div>
        <AuthForm  type="signup"/>
      </div>
    </div>
  );
}
