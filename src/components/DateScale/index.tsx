import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./styles.css";

function DateScale({ dates }: { dates: Date[] }) {
  const scaleRef = useRef<HTMLDivElement>(null);
  const [axisWidth, setAxisWidth] = useState(0);

  useEffect(() => {
    const resize = () => {
      const svgarea = document.querySelector("#axis-x");
      const width = svgarea!?.getBoundingClientRect().width;
      setAxisWidth(width);
    };
    resize();
    window.addEventListener("resize", resize);
  }, []);

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
        console.log({ sum }, i, fullDate);

        // append tick here.
        svg
          .append("line")
          .attr("x1", sum.toString())
          .attr("y1", "5")
          .attr("x2", sum.toString())
          .attr("y2", "25")
          .attr("stroke", "black")
          .attr("stroke-width", "3");

        svg
          .append("text")
          .text(fullDate)
          .attr("fill", "black")
          .attr("class", "date_ticks")
          .attr("x", sum.toString())
          .attr("y", "50");

        sum += divided;
      }
    }
  };

  return <div ref={scaleRef}></div>;
}

export default DateScale;
