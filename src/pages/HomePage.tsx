import Navbar from "@/components/ui/Navbar";
import { UserContext } from "@/context/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/ui/Footer";
import LeaderBoard from "@/components/ui/LeaderBoard";

export default function HomePage() {
  const { state } = useContext(UserContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    if (state?._id === "") {
      navigate("auth/signin");
    }
  }, [navigate, state]);
  return (
    <div className="flex flex-col min-h-svh">
      <Navbar />
      <main className="flex-1">
        <LeaderBoard />
      </main>
      <Footer />
    </div>
  );
}
