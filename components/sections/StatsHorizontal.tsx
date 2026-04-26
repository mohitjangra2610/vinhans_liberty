import { getStats, type Stat } from '@/lib/apicalls/stats';
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

export default async function StatsHorizontal() {
  let stats: Stat[] = [];

  try {
    stats = await getStats();
  } catch (error) {
    console.error('Error fetching stats:', error);
  }

  if (!stats || stats.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between gap-6">
      {stats.map((item) => {
        const iconKey = item.icon?.toLowerCase().trim() || 'file';
        const Icon = iconMap[iconKey] || FileText;

        return (
          <div key={item.id} className="flex-1 text-center">
            <div className="flex items-center justify-center text-gray-900 p-2 rounded-md bg-blue-100 w-12 h-12 mx-auto">
              <Icon className="w-6 h-6 " />
            </div>

            <h4 className="text-xl md:text-xl font-bold text-gray-800 mt-4">
              {item.number}
            </h4>

            <p className="mt-2 text-sm text-gray-600 font-medium">
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}