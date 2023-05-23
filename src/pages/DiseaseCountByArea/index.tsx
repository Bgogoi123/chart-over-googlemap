import { useEffect, useRef, useState } from "react";
import Select from "../../components/Select";
import { diseaseCountPerCity } from "../../data/diseaseCountPerCity";
import DateScale from "../../components/DateScale";

function DiseaseCountByArea() {
  const mapRef = useRef(null);
  const [selectedDisease, setSelectedDisease] = useState<string>("");
  const [diseaseNames, setDiseaseNames] = useState<string[]>([]);
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date("2023-04-05")
  );

  useEffect(() => {
    const map = createMap();
    if (map !== null) {
      showDataOverMap(map);
    }
  }, [selectedDisease]);

  useEffect(() => {
    getDiseaseNames();
  }, [diseaseCountPerCity]);

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

  function convertDateToString(dateProp: Date) {
    return new Date(dateProp).toISOString().slice(0, 10);
  }

  function showDataOverMap(map: google.maps.Map<Element> | undefined) {
    for (const city in diseaseCountPerCity) {
      const diseaseCount = diseaseCountPerCity[city].diseasecount;

      diseaseCount.forEach((count) => {
        const circleRadius =
          convertDateToString(selectedDate) ===
          convertDateToString(count["date"] as Date)
            ? Math.sqrt(count[selectedDisease] as number) * 100
            : 0;

        console.log({ circleRadius });

        new google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          map,
          center: diseaseCountPerCity[city].center,
          radius: circleRadius,
        });
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
