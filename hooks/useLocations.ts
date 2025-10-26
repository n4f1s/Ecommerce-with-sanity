// hooks/useLocations.ts
import { useMemo } from 'react';
import locationsData from '@/data/locations.json';
import type { Division, District, Upazila } from '@/lib/types/locations';

interface LocationData {
  divisions: Division[];
  districts: District[];
  upazilas: Upazila[];
}

const locations = locationsData as LocationData;

export function useBDLocations(divisionId?: string, districtId?: string) {
  const divisions = locations.divisions;

  const districts = useMemo(() => {
    if (!divisionId) return [];
    return locations.districts.filter(
      (district) => district.division_id === divisionId
    );
  }, [divisionId]);

  const upazilas = useMemo(() => {
    if (!districtId) return [];
    return locations.upazilas.filter(
      (upazila) => upazila.district_id === districtId
    );
  }, [districtId]);

  return { divisions, districts, upazilas };
}

export type { Division, District, Upazila };
