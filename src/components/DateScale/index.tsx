import { Slider } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { TDateScaleProps } from "../../types/props";
import { convertDateToString } from "../../utils/functions";
import "./styles.css";

function DateScale({ dates, setSelectedDate }: TDateScaleProps) {
  const [axisWidth, setAxisWidth] = useState(0);

  const marks = dates.map((datum, index) => {
    return {
      value: index,
      label: convertDateToString(datum),
    };
  });

  useEffect(() => {
    if (marks.length > 0) {
      const labels = document.querySelectorAll("span.MuiSlider-markLabel");
      labels.forEach((label) => {
        label.classList.add("date-slider");
      });
    }
  }, [marks]);

  useEffect(() => {
    getSVGWidth();
  }, []);

  const getSVGWidth = () => {
    const resize = () => {
      const svgarea = document.querySelector("#axis-x");
      const width = svgarea!?.getBoundingClientRect().width;
      setAxisWidth(width);
    };
    window.addEventListener("resize", resize);
    resize();
  };

  const handleChangeSlider = (value: number | number[]) => {
    setSelectedDate(dates[value as number]);
  };

  return (
    <div>
      <Slider
        aria-label="Date"
        color="secondary"
        step={1}
        marks={marks}
        min={0}
        max={dates.length - 1}
        name="date"
        onChange={(_, value) => handleChangeSlider(value)}
        style={{
          width: "100%",
        }}
      />
    </div>
  );
}

export default DateScale;
