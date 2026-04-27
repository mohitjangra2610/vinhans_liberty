'use client';

import { useStats } from '@/hooks/useStats';
import StatsHorizontal from './StatsHorizontal';
import StatsSection from './stats_section';

export default function Stats() {
  const statsState = useStats();

  return (
    <>
      <div className="hidden md:block">
        <StatsHorizontal {...statsState} />
      </div>

      <div className="md:hidden">
        <StatsSection {...statsState} />
      </div>
    </>
  );
}
