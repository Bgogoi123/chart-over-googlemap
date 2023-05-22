import { useEffect, useState } from "react";
import { TCity } from "../../types";

function Select({
  data,
  setSelectedDisease,
}: {
  data: Record<string, TCity>;
  setSelectedDisease: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [diseaseNames, setDiseaseNames] = useState<string[]>([]);

  useEffect(() => {
    getDiseaseNames();
  }, []);

  function getDiseaseNames() {
    Object.keys(data).forEach((city) => {
      const diseaseCount = data[city].diseasecount;
      setDiseaseNames([]);
      Object.keys(diseaseCount).forEach((disease) => {
        setDiseaseNames((prev) => [...prev, disease]);
      });
    });
  }

  return (
    <div style={{ padding: "0.5em 0 0.5em 0" }}>
      <select
        placeholder="Select "
        style={{
          padding: "0.4em 1em 0.4em 1em",
          color: "blueviolet",
        }}
        onChange={(event) => setSelectedDisease(event.target.value)}
      >
        {diseaseNames.map((disease, index) => {
          return (
            <option
              key={index}
              value={disease}
              style={{
                color: "darkblue",
              }}
            >
              {disease}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
