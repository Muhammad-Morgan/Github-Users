import { calculateMostForkedRepos } from "@/utils";
import type { Repository } from "@/types";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const ForkedRepos = ({ repositories }: { repositories: Repository[] }) => {
  const forkedRepos = calculateMostForkedRepos(repositories);
  const chartConfig = {
    language: {
      label: "Repository",
      color: "#facd12",
    },
  } satisfies ChartConfig;
  return (
    <div>
      <h2 className="mb-4 text-center text-2xl font-semibold">Forked Repos</h2>
      <ChartContainer config={chartConfig} className="h-100 w-full">
        <BarChart accessibilityLayer data={forkedRepos}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="repo"
            tickLine={true}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 10)}
          />
          <YAxis dataKey="count" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="var(--color-language)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ForkedRepos;
