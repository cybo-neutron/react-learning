import { useState } from "react";
import { useEffect } from "react";

function Example1() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMessage();
  });

  function fetchMessage() {
    console.log("Fetching message");
    setTimeout(() => {
      setMessage("Displaying message");
    }, 1000);
  }
  console.log("Current message:" + message);

  return <div>{message}</div>;
}

export default Example1;
