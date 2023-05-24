import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./styles.css";
import { Slider } from "@mui/material";
import { convertDateToString } from "../../utils/functions";

function DateScale({
  dates,
  setSelectedDate,
}: {
  dates: Date[];
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const scaleRef = useRef<HTMLDivElement>(null);
  const [axisWidth, setAxisWidth] = useState(0);

  const marks = dates.map((datum, index) => {
    return {
      value: index,
      label: convertDateToString(datum),
    };
  });

  // useEffect(() => {
  //   if (marks.length > 0) {
  //     const labels = document.querySelectorAll("span.MuiSlider-markLabel");
  //     labels.forEach((label, index) => {
  //       // console.log("left ==> ", label.getAttribute("style"));
  //       // label.setAttribute(
  //       //   "style",
  //       //   `font-size: 13px;
  //       //   transform-origin: center;
  //       //   transform: rotate(90deg);
  //       //   left: ${index * 10}px;
  //       //   `
  //       // );
  //     });
  //   }
  // }, [marks]);

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

  useEffect(() => {
    if (scaleRef.current) {
      clearCanvas();
      createCanvas();
      createLine();
    }
  }, []);

  useEffect(() => {
    createTicks();
  }, [axisWidth]);

  const clearCanvas = () => {
    d3.selectAll("svg").remove();
  };

  const createCanvas = () => {
    d3.select(scaleRef.current)
      .append("svg")
      .attr("id", "date-scale")
      .attr("width", "100%")
      .attr("height", "100")
      .attr("style", "margin-top: 1em;");
  };

  const createLine = () => {
    const svg = d3.select("svg#date-scale");

    svg
      .append("line")
      .attr("id", "axis-x")
      .attr("x1", "0")
      .attr("y1", "15")
      .attr("x2", "100%")
      .attr("y2", "15")
      .attr("stroke", "black")
      .attr("stroke-width", "2");
  };

  const createTicks = () => {
    const svg = d3.select("svg#date-scale");

    if (dates.length > 0) {
      const divident = dates.length - 1;
      const divided = +(axisWidth / divident).toFixed(2);

      let sum = 0;
      for (let i = 0; i < dates.length; i++) {
        const fullDate = `${dates[i].getDate()}-${dates[i].getMonth()}-${dates[
          i
        ].getFullYear()}`;

        // clear ticks
        d3.selectAll(`#tick_${i}`).remove();

        // append ticks here.
        if (i === 0) {
          svg
            .append("rect")
            .attr("id", `tick_${i}`)
            .attr("width", "10")
            .attr("height", "20")
            .attr("x", function () {
              if (i === 0) {
                return sum.toString();
              }
              return (sum - 10).toString();
            })
            .attr("y", "5")
            .attr("fill", "#fff")
            .attr("stroke", "black")
            .attr("stroke-width", "2")
            .attr("style", "cursor: pointer");
        }

        svg
          .append("text")
          .attr("id", `tick_${i}`)
          .text(fullDate)
          .attr("fill", "black")
          .attr("class", "date_ticks")
          .attr("x", "5")
          .attr("y", function () {
            if (i !== 0) {
              return (-(sum - 60)).toString();
            }
            return "50";
          });

        sum += divided;
      }
    }
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
      />
      {/* <div ref={scaleRef}></div> */}
    </div>
  );
}

export default DateScale;
