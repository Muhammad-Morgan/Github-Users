import { type Repository } from "@/types";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { calculateMostUsedLang } from "@/utils";

const UsedLanguages = ({ repositories }: { repositories: Repository[] }) => {
  const usedLangs = calculateMostUsedLang(repositories);
  const chartConfig = {
    language: {
      label: "Language",
      color: "#2563eb",
    },
  } satisfies ChartConfig;
  return (
    <div>
      <h2 className="mb-4 text-center text-2xl font-semibold">Used Languages</h2>
      <ChartContainer config={chartConfig} className="h-100 w-full">
        <BarChart accessibilityLayer data={usedLangs}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="language" tickLine={false} tickMargin={10} />
          <YAxis dataKey="count" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="var(--color-language)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default UsedLanguages;
