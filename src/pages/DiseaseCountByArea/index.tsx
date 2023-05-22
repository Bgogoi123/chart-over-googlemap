import { useEffect, useRef, useState } from "react";
import Select from "../../components/Select";
import { diseaseCountPerCity } from "../../data/diseaseCountPerCity";

function DiseaseCountByArea() {
  const mapRef = useRef(null);
  const [selectedDisease, setSelectedDisease] = useState<string>("");

  useEffect(() => {
    const map = createMap();
    if (map !== null) {
      showDataOverMap(map);
    }
  }, [selectedDisease]);

  function createMap() {
    if (mapRef.current) {
      const map: google.maps.Map<Element> = new google.maps.Map(
        mapRef.current,
        {
          center: { lat: 37.09, lng: -95.712 },
          zoom: 5,
          mapTypeId: "terrain",
        }
      );
      return map;
    }
    return undefined;
  }

  function showDataOverMap(map: google.maps.Map<Element> | undefined) {
    for (const city in diseaseCountPerCity) {
      new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: diseaseCountPerCity[city].center,
        radius:
          Math.sqrt(diseaseCountPerCity[city].diseasecount[selectedDisease]) *
          100,
      });
    }
  }

  return (
    <div style={{ border: "3px solid black", padding: "1em" }}>
      <Select
        data={diseaseCountPerCity}
        setSelectedDisease={setSelectedDisease}
      />
      <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
}

export default DiseaseCountByArea;
