import React from "react";
import HashLoader from "react-spinners/HashLoader";

function Loading(props) {
  return (
    <div className="sweet-loading text-center">
      <div style={{margin: "0 auto", width: "10%"}} >
        <HashLoader
          color={props.color || "#000"}
          loading={props.loading || true}
          size={80}
        />
      </div>
    </div>
  );
}

export default Loading;
