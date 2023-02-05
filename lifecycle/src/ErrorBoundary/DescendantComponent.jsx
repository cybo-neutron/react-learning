import React from "react";
import { useEffect } from "react";

function DescendantComponent(props) {
  //   useEffect(() => {
  //     throw new Error("Demo error");
  //   }, []);
  if (props.count > 3) {
    throw new Error("Demo error");
  }

  return <div>DescendantComponent {props.count}</div>;
}

export default DescendantComponent;
