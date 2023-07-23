import React from "react";
import { ScaleLoader } from "react-spinners";
const Loader = () => {
  return (
    <div
      style={{
        height: "100px",
        width: "100px",
        margin: "auto",
        marginTop: "100px",
        display: "block",
      }}
    >
      <ScaleLoader color="#64748b" height={200} width={10} />
    </div>
  );
};

export default Loader;
