import { TCity } from "../types";

export const diseaseCountPerCity: Record<string, TCity> = {
  chicago: {
    center: { lat: 41.878, lng: -87.629 },
    diseasecount: {
      measles: 2714856,
      malaria: 2714000,
      jaundice: 10000,
      norovirus: 23001,
    },
  },
  newyork: {
    center: { lat: 40.714, lng: -74.005 },
    diseasecount: {
      measles: 8405837,
      malaria: 2701111,
      jaundice: 102384,
      norovirus: 30010,
    },
  },
  losangeles: {
    center: { lat: 34.052, lng: -118.243 },
    diseasecount: {
      measles: 3857799,
      malaria: 129009,
      jaundice: 119394,
      norovirus: 3003546,
    },
  },
  vancouver: {
    center: { lat: 49.25, lng: -123.1 },
    diseasecount: {
      measles: 603502,
      malaria: 432123,
      jaundice: 513242,
      norovirus: 123456,
    },
  },
};
