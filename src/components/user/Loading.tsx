import { Skeleton } from "../ui/skeleton";

const Loading = () => {
  return (
    <div>
      <Skeleton className="mb-8 h-[194px] w-full rounded lg:w-1/2" />
      <div className="mb-8 grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-4">
        <Skeleton className="h-[70px] rounded" />
        <Skeleton className="h-[70px] rounded" />
        <Skeleton className="h-[70px] rounded" />
        <Skeleton className="h-[70px] rounded" />
      </div>
    </div>
  );
};

export default Loading;
