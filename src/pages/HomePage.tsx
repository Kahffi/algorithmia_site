import Navbar from "@/components/ui/Navbar";
import { TUser, UserContext } from "@/context/UserContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/ui/Footer";
import LeaderBoard2 from "@/components/ui/LeaderBoard2";
import { Button } from "@/components/ui/button";
import { LucideImage, LucideScanQrCode, LucideUserCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrbitProgress } from "react-loading-indicators";

export default function HomePage() {
  const { state: userData } = useContext(UserContext)!;
  const navigate = useNavigate();

  const [usersArray, setUsersArray] = useState<TUser[]>([]);
  // unauthenticated user will be redirected
  useEffect(() => {
    if (!userData) {
      navigate("/auth/signin");
    }
  }, [userData]);

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
        if (data.status === 200) setUsersArray(data.user);
      } catch (e) {
        console.error(e);
      }
    }
    fetchAllUser("https://algoritmia.vercel.app/user/all");
  }, []);

  const sortedData = useMemo(() => {
    if (!usersArray) return;
    return usersArray.sort((a, b) => b.poin - a.poin);
  }, [usersArray]);

  const userRank = useMemo(() => {
    if (!(sortedData && userData)) return;
    let foundIndex;
    sortedData.forEach((user, idx) => {
      if (user._id === userData._id) foundIndex = idx + 1;
    });
    return foundIndex;
  }, [sortedData, userData]);
  return (
    <div className="flex flex-col min-h-svh bg-slate-100">
      <Navbar />
      <main className="flex-1 flex flex-col items-center p-3 py-8 gap-5">
        <div>
          <LucideUserCircle2 size={120} strokeWidth={0.7} />
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">{userData.username}</h2>
            <h3 className="text-xl font-medium">{userData.fullName}</h3>
          </div>
        </div>
        {/* Leader Board */}
        <div className="flex justify-center w-full">
          {sortedData && <LeaderBoard2 data={sortedData.slice(0, 3)} />}
        </div>
        {/* Status */}
        <div className="flex w-[320px] gap-7 justify-center">
          {/* Poins */}
          <Card className="border-4 border-pink-400 min-w-[130px]">
            <CardHeader className="-mb-3 -mt-4">
              <CardTitle className="-ml-3 text-lg font-medium">Poins</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-500 text-2xl text-center font-semibold">
                {userData.poin}
              </p>
            </CardContent>
          </Card>
          <Card className="border-4 border-pink-400 min-w-[130px]">
            <CardHeader className="-mb-3 -mt-4">
              <CardTitle className="-ml-3 text-lg font-medium">Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-500 text-2xl text-center font-semibold">
                {userRank ? (
                  userRank
                ) : (
                  <OrbitProgress size="small" color={"#cc31b1"} />
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Button Group */}
        <div className="flex flex-col w-[280px] gap-3">
          <Link to="/qr-scanner" className="w-full ">
            <Button className="flex bg-blue-500 hover:bg-blue-400 items-center gap-1 w-full font-semibold">
              <LucideScanQrCode strokeWidth={2} />
              QR Code Scanner
            </Button>
          </Link>
          <a
            href="https://gallery-digital-algorithmia.vercel.app/"
            target="_blank"
            className="flex items-center gap-1"
          >
            <Button className="w-full bg-pink-500 hover:bg-pink-400 font-semibold">
              <LucideImage />
              Digital Gallery
            </Button>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
