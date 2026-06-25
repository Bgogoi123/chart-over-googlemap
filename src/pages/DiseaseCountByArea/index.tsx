import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import DateScale from "../../components/DateScale";
import MultiSelect from "../../components/MultiSelect";
import { diseaseCountPerCity } from "../../data/diseaseCountPerCity";
import { convertDateToString } from "../../utils/functions";
import { TDiseaseDetails } from "../../types";
import DiseaseDetail from "../../components/DiseaseDetail";
import { lightMapConfiguration } from "../../utils/lightMapConfig";

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
  const [details, setDetails] = useState<TDiseaseDetails | null>(null);

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
        mapTypeControlOptions: {
          mapTypeIds: [
            "roadmap",
            "satellite",
            "hybrid",
            "terrain",
            "light_map",
          ],
        },
        mapTypeId: "light_map",
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
            strokeColor: DISEASE_COLORS[diseaseIndex],
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: DISEASE_COLORS[diseaseIndex],
            fillOpacity: 0.35,
            map,
            center: diseaseCountPerCity[city].center,
            radius: circleRadius,
            clickable: true,
          }).addListener("click", () => {
            // show details on a drawer that opens from right side. (pending)
            const diseaseInfo = {
              city,
              disease: disease,
              diseaseCount: count[disease],
              date: selectedDate,
            };
            setDetails(diseaseInfo);
          });
        });
      });
    }
  }

  useEffect(() => {
    const mapref = document.getElementById("mapref");
    setMapDiv(mapref);
  }, []);

  useEffect(() => {
    if (mapDiv === null) return;
    createMap();
  }, [selectedDisease, selectedDate, mapDiv]);

  useEffect(() => {
    if (googleMap !== null && googleMap !== undefined) {
      googleMap.mapTypes.set("light_map", lightMapConfiguration);
      googleMap.setMapTypeId("light_map");
      showDataOverMap(googleMap);
    }
  }, [googleMap]);

  useEffect(() => {
    getDiseaseNames();
  }, []);

  return (
    <Stack gap="1rem" height="90vh">
      <Stack direction="row" alignItems="center" gap="4rem" minHeight="100px">
        <MultiSelect
          data={diseaseNames}
          selectedDisease={selectedDisease}
          setSelectedDisease={setSelectedDisease}
        />

        {details && (
          <DiseaseDetail
            data={details}
            resetSelection={() => setDetails(null)}
          />
        )}
      </Stack>
      <div id="mapref" style={{ width: "100%", height: "500px" }} />
      <DateScale dates={dates} setSelectedDate={setSelectedDate} />
    </Stack>
  );
}

export default DiseaseCountByArea;
