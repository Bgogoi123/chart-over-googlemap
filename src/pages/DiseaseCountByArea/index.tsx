import { useEffect, useRef, useState } from "react";
import Select from "../../components/Select";
import { diseaseCountPerCity } from "../../data/diseaseCountPerCity";
import DateScale from "../../components/DateScale";

function DiseaseCountByArea() {
  const mapRef = useRef(null);
  const [selectedDisease, setSelectedDisease] = useState<string>("");
  const [diseaseNames, setDiseaseNames] = useState<string[]>([]);
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();

  useEffect(() => {
    const map = createMap();
    if (map !== null) {
      showDataOverMap(map);
    }
  }, [selectedDisease]);

  useEffect(() => {
    getDiseaseNames();
  }, [diseaseCountPerCity]);

  // console.log({ dates });

  function getDiseaseNames() {
    Object.keys(diseaseCountPerCity).forEach((city) => {
      const diseaseCount = diseaseCountPerCity[city].diseasecount;
      setDates([]);
      diseaseCount.forEach((count) => {
        setDiseaseNames([]);
        Object.keys(count).forEach((key) => {
          if (typeof count[key] === "number") {
            setDiseaseNames((prev) => {
              return [...prev, key];
            });
          } else {
            setDates((prev) => {
              return [...prev, count[key]] as Date[];
            });
          }
        });
      });
    });
  }

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
      const diseaseCount = diseaseCountPerCity[city].diseasecount;
      let data = [];
      diseaseCount.forEach((count) => {
        // console.log("check: ", count[selectedDisease], city, count["date"]);
        data.push(count[selectedDisease]);
      });
      // console.log({ data });

      new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: diseaseCountPerCity[city].center,
        radius:
          Math.sqrt(
            diseaseCountPerCity[city].diseasecount[0][selectedDisease]
          ) * 100,
      });
    }
  }

  return (
    <div style={{ border: "3px solid black", padding: "1em" }}>
      <Select data={diseaseNames} setSelectedDisease={setSelectedDisease} />
      <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
      <DateScale dates={dates} />
    </div>
  );
}

export default DiseaseCountByArea;
