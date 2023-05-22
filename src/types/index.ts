export type TDiseaseCount = Record<string, number>;

export type TCity = {
  center: google.maps.LatLngLiteral;
  diseasecount: TDiseaseCount;
};
