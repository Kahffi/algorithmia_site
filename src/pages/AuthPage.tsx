import LoginForm from "@/components/ui/LoginForm";
import Navbar from "@/components/ui/Navbar";
import SignUpForm from "@/components/ui/SignUpForm";
import { useParams } from "react-router-dom";

export default function AuthPage() {
  const { authType } = useParams();

  return (
    <div className="flex flex-col min-h-svh bg-white gap-5">
      <Navbar />
      <main className="flex-1 flex flex-col items-center gap-1">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {authType === "signup" ? "Daftar Akun" : "Masuk"}
        </h1>
        {authType === "signup" ? <SignUpForm /> : <LoginForm />}
      </main>
      <footer className="flex justify-center gap-7 w-full py-3 mt-6 text-xs text-center text-gray-600">
        <a
          href="https://www.instagram.com/algorithmia.fest/"
          className="text-pink-500 hover:underline"
        >
          Instagram: @Algorithmia.fest
        </a>
        <a
          href="mailto:algorithmiafest@gmail.com"
          className="text-blue-500 hover:underline"
        >
          Email: algorithmiafest@gmail.com
        </a>
      </footer>
    </div>
  );
}
