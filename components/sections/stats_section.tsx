import type { Stat } from "@/lib/apicalls/stats";
import {
  FileText,
  Users,
  Star,
  Briefcase,
  Globe,
  Trophy,
  Heart,
  Shield,
  Zap,
  BarChart3,
  Wallet,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  file: FileText,
  users: Users,
  star: Star,
  briefcase: Briefcase,
  globe: Globe,
  trophy: Trophy,
  heart: Heart,
  shield: Shield,
  zap: Zap,
  chart: BarChart3,
  wallet: Wallet,
};

interface StatsSectionProps {
  stats: Stat[];
  loading: boolean;
  error: string | null;
}

export default function StatsSection({
  stats,
  loading,
  error,
}: StatsSectionProps) {

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="mx-auto max-w-7xl grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="p-4">
              <div className="w-12 h-12 rounded-md bg-gray-200 animate-pulse" />
              <div className="mt-3 h-5 w-16 rounded bg-gray-200 animate-pulse" />
              <div className="mt-2 h-4 w-24 rounded bg-gray-200 animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error || !stats || stats.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-gray-500">
            {error ? "Unable to load statistics. Please try again later." : "No stats available."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="grid grid-cols-2 md:flex md:flex-row md:items-center md:justify-between gap-4 md:gap-6 w-full">
        {stats.map((item) => {
          const iconKey = item.icon?.toLowerCase().trim() || "file";
          const Icon = iconMap[iconKey] || FileText;

          return (
            <div
              key={item.id}
              className="p-4 md:p-6 flex flex-col items-start w-full md:flex-1"
            >
              <div className="flex items-center justify-center text-gray-900 p-2 rounded-md bg-blue-100 w-12 h-12">
                <Icon className="w-6 h-6 md:w-6 md:h-6" />
              </div>

              <h3 className="text-lg md:text-xs font-bold text-gray-800 mt-2 wrap-break-words">
                {item.number}
              </h3>

              <p className="mt-2 text-sm md:text-base text-gray-600 font-medium line-clamp-2">
                {item.title}
              </p>  

              {item.description && (
                <p className="mt-1 md:mt-2 text-xs md:text-sm text-gray-500 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
