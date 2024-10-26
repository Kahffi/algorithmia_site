import LoginForm from "@/components/ui/LoginForm";
import Navbar from "@/components/ui/Navbar";
import SignUpForm from "@/components/ui/SignUpForm";
import { useParams } from "react-router-dom";
import Footer from "../components/ui/Footer";
import algorithmia_logo from "@/assets/images/algorithmia_logo.png";
export default function AuthPage() {
  const { authType } = useParams();

  return (
    <div className="flex flex-col min-h-svh bg-white gap-5">
      <Navbar />
      <main className="flex-1 flex flex-col items-center gap-1">
        <img src={algorithmia_logo} className="mb-5" alt="algorithmia's logo" />
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {authType === "signup" ? "Daftar Akun" : "Masuk"}
        </h1>
        {authType === "signup" ? (
          <SignUpForm />
        ) : authType === "signin" ? (
          <LoginForm />
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
