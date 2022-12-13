import { useMemo } from "react";
import { ScheduleGroup } from "react-weekly-table";
export const useDataExample = () => {
    const fiveExample = useMemo<ScheduleGroup[]>(
      () => [
        {
          startTime: 1000 * 60 * 60 * 10,
          endTime: 1000 * 60 * 60 * 18,
          mask: 31,
          name:'Hello'
        },
      ],
      [],
    );
  
    const weekendExample = useMemo<ScheduleGroup[]>(
      () => [
        {
          startTime: 1000 * 60 * 60 * 12,
          endTime: 1000 * 60 * 60 * 15,
          mask: 96,
          name:'hello'
        },
      ],
      [],
    );
  
  
  
    return { fiveExample, weekendExample };
  };