import { useEffect, useRef } from "react";
import { TCity } from "../../types";
import Select from "../../components/Select";

const citymap: Record<string, TCity> = {
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

function DiseaseCountByArea() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 37.09, lng: -95.712 },
        zoom: 5,
        mapTypeId: "terrain",
      });

      for (const city in citymap) {
        // Add the circle for this city to the map.
        new google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          map,
          center: citymap[city].center,
          radius: Math.sqrt(citymap[city].diseasecount["measles"]) * 100,
        });
      }
    }
  }, []);

  return (
    <div style={{ border: "3px solid black", padding: "1em" }}>
      <Select />
      <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
}

export default DiseaseCountByArea;
