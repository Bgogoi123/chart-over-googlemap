import { useEffect, useState } from "react";
import DateScale from "../../components/DateScale";
import MultiSelect from "../../components/MultiSelect";
import { diseaseCountPerCity } from "../../data/diseaseCountPerCity";
import { convertDateToString } from "../../utils/functions";

const DISEASE_COLORS = ["purple", "lightblue", "yellow", "red"];

function DiseaseCountByArea() {
  const [selectedDisease, setSelectedDisease] = useState<string[]>([]);
  const [diseaseNames, setDiseaseNames] = useState<string[]>([]);
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date("2023-04-05")
  );
  const [googleMap, setGoogleMap] = useState<
    google.maps.Map<Element> | undefined
  >(undefined);
  const [mapDiv, setMapDiv] = useState<HTMLElement | null>(null);
  const [diseaseColors, setDiseaseColors] = useState<string[]>(DISEASE_COLORS);

  useEffect(() => {
    const mapref = document.getElementById("mapref");
    setMapDiv(mapref);
  }, []);

  useEffect(() => {
    if (mapDiv === null) return;
    createMap();
  }, [selectedDisease, selectedDate, mapDiv]);

  useEffect(() => {
    if (googleMap !== null) {
      showDataOverMap(googleMap);
    }
  }, [googleMap]);

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
    if (mapDiv) {
      const map: google.maps.Map<Element> = new google.maps.Map(mapDiv, {
        center: { lat: 37.09, lng: -95.712 },
        zoom: 4,
      });
      setGoogleMap(map);
    }
  }

  function showDataOverMap(map: google.maps.Map<Element> | undefined) {
    for (const city in diseaseCountPerCity) {
      const diseaseCount = diseaseCountPerCity[city].diseasecount;

      diseaseCount.forEach((count) => {
        selectedDisease.forEach((disease, diseaseIndex) => {
          const circleRadius =
            convertDateToString(selectedDate) ===
            convertDateToString(count["date"] as Date)
              ? Math.sqrt(count[disease] as number) * 100
              : 0;

          new google.maps.Circle({
            strokeColor: diseaseColors[diseaseIndex],
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: diseaseColors[diseaseIndex],
            fillOpacity: 0.35,
            map,
            center: diseaseCountPerCity[city].center,
            radius: circleRadius,
            clickable: true,
          }).addListener("click", () => {
            // show ditails on a drawer that opens from right side.
            const details = {
              city,
              disease: selectedDisease,
              diseaseCount: count[disease],
              date: selectedDate,
            };
          });
        });
      });
    }
  }

  return (
    <div style={{ border: "1px solid black", padding: "1em", height: "90vh" }}>
      <MultiSelect
        data={diseaseNames}
        selectedDisease={selectedDisease}
        setSelectedDisease={setSelectedDisease}
      />
      <div id="mapref" style={{ width: "100%", height: "400px" }} />
      <DateScale dates={dates} setSelectedDate={setSelectedDate} />
    </div>
  );
}

export default DiseaseCountByArea;
