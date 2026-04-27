import type { Stat } from '@/lib/apicalls/stats';
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
} from 'lucide-react';

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

interface StatsHorizontalProps {
  stats: Stat[];
  loading: boolean;
  error: string | null;
}

export default function StatsHorizontal({
  stats,
  loading,
  error,
}: StatsHorizontalProps) {

  if (loading) {
    return (
      <div className="flex flex-row items-center justify-between gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex-1 text-start">
            <div className="w-12 h-12 rounded-md bg-gray-200 animate-pulse" />
            <div className="mt-4 h-5 w-16 rounded bg-gray-200 animate-pulse" />
            <div className="mt-2 h-4 w-24 rounded bg-gray-200 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (error || !stats || stats.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between gap-6">
      {stats.map((item) => {
        const iconKey = item.icon?.toLowerCase().trim() || 'file';
        const Icon = iconMap[iconKey] || FileText;

        return (
          <div key={item.id} className="flex-1 text-start">
            <div className="flex items-center justify-center text-gray-900 p-2 rounded-md bg-blue-100 w-12 h-12">
              <Icon className="w-6 h-6" />
            </div>

            <h3 className="text-lg md:text-lg font-bold text-gray-800 mt-4">
              {item.number}
            </h3>

            <p className="text-sm text-gray-600 font-medium">
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
