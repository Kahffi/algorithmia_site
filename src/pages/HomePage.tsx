import Navbar from "@/components/ui/Navbar";
import { TUser, UserContext } from "@/context/UserContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/ui/Footer";
import LeaderBoard2 from "@/components/ui/LeaderBoard2";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { state } = useContext(UserContext)!;
  const navigate = useNavigate();

  const [usersData, setUsersData] = useState<TUser[]>([]);
  // unauthenticated user will be redirected
  useEffect(() => {
    if (!state) {
      navigate("/auth/signin");
    }
  }, [state]);

  useEffect(() => {
    async function fetchAllUser(url: string) {
      try {
        const res = await fetch(url, {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error(res.status + "");
        const data = await res.json();
        if (data.status === 200) setUsersData(data.user);
      } catch (e) {
        console.error(e);
      }
    }
    fetchAllUser("https://algoritmia.vercel.app/user/all");
  }, []);

  const sortedData = useMemo(() => {
    if (!usersData) return;
    return usersData.sort((a, b) => b.poin - a.poin).slice(0, 3);
  }, [usersData]);

  return (
    <div className="flex flex-col min-h-svh">
      <Navbar />
      <main className="flex-1 flex flex-col items-center p-3">
        <div className="flex justify-center w-full">
          {sortedData && <LeaderBoard2 data={sortedData} />}
        </div>
        <div className="flex flex-col">
          <Button>
            <Link to="/qr-scanner">Scan Barcode</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
