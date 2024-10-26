import { TUser } from "@/context/UserContext";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  data: TUser[];
};

export default function LeaderBoard2({ data }: Props) {
  return (
    <>
      <Card className="w-full max-w-[280px] sm:max-w-md pb-5">
        <CardHeader>
          <CardTitle className="text-center">LeaderBoard</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {data.map((usrData, idx) => {
            return (
              <div key={usrData._id} className="flex gap-2">
                <div className="py-1 px-3 sm:p-3 sm:px-5  rounded-md bg-green-100">
                  <p>{idx + 1}</p>
                </div>
                <div className="w-full bg-green-400 p-1 sm:p-3 rounded-md">
                  {usrData.username}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
}
