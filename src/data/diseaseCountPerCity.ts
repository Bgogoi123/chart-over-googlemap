import { TCity } from "../types";

export const diseaseCountPerCity: Record<string, TCity> = {
  chicago: {
    center: { lat: 41.878, lng: -87.629 },
    diseasecount: [
      {
        date: new Date("2023-04-05"),
        measles: 2714856,
        malaria: 2714000,
        jaundice: 10000,
        norovirus: 23001,
      },
      {
        date: new Date("2023-04-06"),
        measles: 2714800,
        malaria: 2700000,
        jaundice: 89700,
        norovirus: 21000,
      },
    ],
  },
  newyork: {
    center: { lat: 40.714, lng: -74.005 },
    diseasecount: [
      {
        date: new Date("2023-04-05"),
        measles: 8405837,
        malaria: 2701111,
        jaundice: 102384,
        norovirus: 30010,
      },
      {
        date: new Date("2023-04-06"),
        measles: 840000,
        malaria: 2700000,
        jaundice: 102000,
        norovirus: 12010,
      },
    ],
  },
  losangeles: {
    center: { lat: 34.052, lng: -118.243 },
    diseasecount: [
      {
        date: new Date("2023-04-05"),
        measles: 3857799,
        malaria: 129009,
        jaundice: 119394,
        norovirus: 3003546,
      },
      {
        date: new Date("2023-04-06"),
        measles: 3857000,
        malaria: 125090,
        jaundice: 119000,
        norovirus: 300102,
      },
    ],
  },
  vancouver: {
    center: { lat: 49.25, lng: -123.1 },
    diseasecount: [
      {
        date: new Date("2023-04-05"),
        measles: 603502,
        malaria: 432123,
        jaundice: 513242,
        norovirus: 123456,
      },
      {
        date: new Date("2023-04-06"),
        measles: 603000,
        malaria: 432000,
        jaundice: 513000,
        norovirus: 123000,
      },
    ],
  },
};
