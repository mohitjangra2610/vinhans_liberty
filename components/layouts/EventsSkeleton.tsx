import { Skeleton } from "@/components/ui/skeleton";

export function EventsSkeleton() {
  return (
    <section className="w-full px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-72 max-w-full" />
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-10 w-16 rounded-full" />
            <Skeleton className="h-10 w-20 rounded-full" />
            <Skeleton className="h-10 w-20 rounded-full" />
          </div>
        </div>

        <div className="grid w-full gap-6 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="inline-flex h-full w-full flex-col items-start justify-start gap-6 rounded-[20px] bg-[#FCFCFD] p-2 shadow-[0px_5px_8px_-4px_rgba(16,24,40,0.03),0px_8px_24px_-4px_rgba(16,24,40,0.08)] md:flex-row md:items-center"
            >
              <Skeleton className="h-55 w-full flex-1 rounded-xl sm:h-63.25" />

              <div className="inline-flex w-full flex-1 flex-col items-start justify-start gap-6 p-2">
                <div className="flex w-full flex-col gap-4">
                  <Skeleton className="h-7 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                <div className="flex items-center gap-2">
                  <Skeleton className="h-4.5 `w-4.5 rounded-full" />
                  <Skeleton className="h-4 w-44" />
                </div>

                <div className="flex items-start gap-2">
                  <Skeleton className="h-4.5 w-4.5 rounded-full" />

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>

                <Skeleton className="h-9 w-44 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}