

export interface Division {
  id: string;
  name: string;
  bn_name: string;
}

export interface District {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
}

export interface Upazila {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
}

export interface BDLocations {
  divisions: Division[];
  districts: District[];
  upazilas: Upazila[];
}
