import { Skeleton } from "@heroui/skeleton";

export default function HomeSkeleton() {
  return (
    <div className="w-[200px] space-y-5 p-4 rounded-lg bg-white shadow">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </div>
  );
}
