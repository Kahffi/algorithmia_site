import LoginForm from "@/components/ui/LoginForm";
import Navbar from "@/components/ui/Navbar";
import SignUpForm from "@/components/ui/SignUpForm";
import { useParams } from "react-router-dom";

export default function AuthPage() {
  const { authType } = useParams();

  return (
    <div className="min-h-svh bg-white ">
      <Navbar />
      <main className="flex flex-col items-center gap-8 py-5">
        <h1 className="font-medium text-3xl">Daftar Akun</h1>
        {authType === "signup" ? <SignUpForm /> : <LoginForm />}
      </main>
    </div>
  );
}
