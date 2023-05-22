export type TDiseaseCount = Record<string, number | Date>;

export type TCity = {
  center: google.maps.LatLngLiteral;
  diseasecount: TDiseaseCount[];
};
