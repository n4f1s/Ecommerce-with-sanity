// lib/hooks/use-bd-locations.ts
import { useMemo } from 'react';
import locationsData from '@/data/locations.json';
import type { BDLocations } from '@/lib/types/locations';

const locations = locationsData as BDLocations;

export function useBDLocations(divisionId?: string, districtId?: string) {
  // Get all divisions (always available)
  const divisions = locations.divisions;

  // Get districts filtered by selected division
  const districts = useMemo(() => {
    if (!divisionId) return [];
    return locations.districts.filter(
      (district) => district.division_id === divisionId
    );
  }, [divisionId]);

  // Get upazilas filtered by selected district
  const upazilas = useMemo(() => {
    if (!districtId) return [];
    return locations.upazilas.filter(
      (upazila) => upazila.district_id === districtId
    );
  }, [districtId]);

  return {
    divisions,
    districts,
    upazilas,
  };
}
