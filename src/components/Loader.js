import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
export default function Loader({visible}) {
  function GradientCircularProgress() {
    return visible ? (
        <div className="loaderWrapper">
          <div className="loader">
            <svg width={0} height={0}>
              <defs>
                <linearGradient
                  id="my_gradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#e01cd5" />
                  <stop offset="100%" stopColor="#1CB5E0" />
                </linearGradient>
              </defs>
            </svg>
            <CircularProgress
              sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
            />
          </div>
        </div>
      ) : null;
  }
  return <GradientCircularProgress />;
}
