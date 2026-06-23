export type TDiseaseCount = Record<string, number | Date>;

export type TCity = {
  center: google.maps.LatLngLiteral;
  diseasecount: TDiseaseCount[];
};

export type TDiseaseDetails =  {
  city: string;
  disease: string[];
  diseaseCount: number | Date;
  date: Date;
}