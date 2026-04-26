import { getStats, type Stat } from "@/lib/apicalls/stats";
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
  Container,
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

export default async function StatsSection() {
  let stats: Stat[] = [];

  try {
    stats = await getStats();
  } catch (error) {
    console.error("Error fetching stats:", error);
  }

  console.log("STATS_SECTION_DATA:", stats);
  console.log("STATS_SECTION_TOTAL:", stats.length);

  if (!stats || stats.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-gray-500">No stats available.</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="grid grid-cols-2 md:flex md:flex-row md:items-center md:justify-between gap-4 md:gap-6 w-full">
        {stats.map((item) => {
          const iconKey = item.icon?.toLowerCase().trim() || "file";
          const Icon = iconMap[iconKey] || FileText;

          return (
            <div key={item.id} className="p-4 md:p-6 flex flex-col items-start">
              <div className="flex items-center justify-center text-gray-900 p-2 rounded-md bg-blue-100 w-12 h-12">
                <Icon className="w-6 h-6 md:w-8 md:h-8" />
              </div>

              <h3 className="text-xl md:text-xl font-bold text-gray-800 mt-4">
                {item.number}
              </h3>

              <p className="mt-2 text-sm md:text-base text-gray-600 font-medium">
                {item.title}
              </p>

              {item.description && (
                <p className="mt-1 md:mt-2 text-xs md:text-sm text-gray-500">
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
