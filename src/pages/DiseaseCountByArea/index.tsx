import { useEffect, useState } from "react";
import DateScale from "../../components/DateScale";
import MultiSelect from "../../components/MultiSelect";
import { diseaseCountPerCity } from "../../data/diseaseCountPerCity";
import { convertDateToString } from "../../utils/functions";
import { Stack } from "@mui/material";
import { TDiseaseDetails } from "../../types";
import DiseaseDetail from "../../components/DiseaseDetail";

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
  const [diseaseColors, _] = useState<string[]>(DISEASE_COLORS);
  const [details, setDetails] = useState<TDiseaseDetails | null>(null);

  const lightMapConfiguration = new google.maps.StyledMapType(
    [
      { elementType: "geometry", stylers: [{ color: "#d6d6d6" }] }, //some part of land
      { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] }, //text color
      { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] }, //text background
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{ color: "#c9b2a6" }], //stright and dotted lines on initial zoom
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [{ color: "#ae9e90" }],
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [{ color: "#ededeb" }], // main land
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#d7dbd9" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#93817c" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [{ color: "#dce8e2" }], // parks
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#447530" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry.stroke",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [{ color: "#806b63" }],
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [{ color: "#b3b4ba" }],
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.fill",
        stylers: [{ color: "#8f7d77" }],
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#ebe3cd" }],
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [{ color: "#cccccc" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#044978" }],
      },
    ],
    { name: "Light Map" }
  );

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
            // show details on a drawer that opens from right side. (pending)
            const diseaseInfo = {
              city,
              disease: selectedDisease,
              diseaseCount: count[disease],
              date: selectedDate,
            };
            setDetails(diseaseInfo);
            console.log({ diseaseInfo });
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
  }, [diseaseCountPerCity]);

  return (
    <Stack gap="1rem" height="90vh">
      <Stack
        direction="row"
        alignItems="center"
        gap="4rem"
        minHeight="100px"
      >
        <MultiSelect
          data={diseaseNames}
          selectedDisease={selectedDisease}
          setSelectedDisease={setSelectedDisease}
        />

        {details && <DiseaseDetail data={details} resetSelection={()=>setDetails(null)} />}
      </Stack>
      <div id="mapref" style={{ width: "100%", height: "500px" }} />
      <DateScale dates={dates} setSelectedDate={setSelectedDate} />
    </Stack>
  );
}

export default DiseaseCountByArea;
