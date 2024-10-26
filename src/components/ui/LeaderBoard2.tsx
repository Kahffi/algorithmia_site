import { TUser } from "@/context/UserContext";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { OrbitProgress } from "react-loading-indicators";

type Props = {
  data: TUser[];
};

function generateColor(num: number): string {
  const lightness = 35 + num * 15;
  return `hsl(272 100% ${lightness}%)`;
}

export default function LeaderBoard2({ data }: Props) {
  return (
    <>
      <Card className="w-full max-w-[280px] border-4 border-pink-500 sm:max-w-md pb-5">
        <CardHeader>
          <CardTitle className="text-center text-xl">Leaderboard</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {data.length !== 0 ? (
            data.map((usrData, idx) => {
              return (
                <div key={usrData._id} className="flex gap-2">
                  <motion.div
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    style={{ backgroundColor: generateColor(idx) }}
                    className="text-white font-semibold py-2 px-3 sm:p-3 sm:px-5  rounded-md bg-green-100"
                  >
                    <p>{idx + 1}</p>
                  </motion.div>
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ ease: "easeInOut", duration: 0.75 }}
                    style={{ backgroundColor: generateColor(idx) }}
                    className="text-white font-semibold w-full bg-green-400 px-3 py-2 sm:p-3 rounded-md"
                  >
                    <div className="flex justify-between items-center">
                      <p>{usrData.username}</p>
                      <p className="text-sm font-medium">{usrData.poin}</p>
                    </div>
                  </motion.div>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center items-center w-full h-full">
              <OrbitProgress size="small" color={"#cc31b1"} />
            </div>
          )}
        </CardContent>
        <CardFooter className="-mb-6 -mt-1 text-sm text-gray-700">
          <p>Top 3 users with the most points</p>
        </CardFooter>
      </Card>
    </>
  );
}
