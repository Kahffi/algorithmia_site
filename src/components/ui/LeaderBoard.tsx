import { useEffect, useMemo, useState } from "react";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { TUser } from "@/context/UserContext";

export default function LeaderBoard() {
  const [data, setData] = useState<TUser[]>([]);

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
        if (data.status === 200) setData(data.user);
      } catch (e) {
        console.error(e);
      }
    }
    fetchAllUser("https://algoritmia.vercel.app/user/all");
  }, []);

  const sortedData = useMemo(() => {
    if (!data) return;
    return data.sort((a, b) => b.poin - a.poin);
  }, [data]);

  const chartConfig = useMemo(() => {
    if (!sortedData) return;
    const chartConfig: Record<string, { label: string }> = {
      points: {
        label: "Poin",
      },
    };
    for (const user of sortedData) {
      chartConfig[`${user.username}`] = { label: user.username };
    }

    return chartConfig;
  }, [sortedData]);
  return (
    <>
      {sortedData && (
        <>
          <ChartContainer
            className="min-h-svh w-full overflow-x-auto"
            config={chartConfig!}
          >
            <BarChart
              accessibilityLayer
              data={sortedData}
              layout="vertical"
              margin={{
                left: 0,
              }}
            >
              <YAxis
                dataKey="username"
                type="category"
                // tickFormatter={(value) =>
                //   chartConfig![value as keyof typeof chartConfig]?.label
                // }
              />
              <XAxis dataKey="poin" type="number" />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="poin" layout="vertical" radius={5} color="blue" />
            </BarChart>
          </ChartContainer>
        </>
      )}
    </>
  );
}
