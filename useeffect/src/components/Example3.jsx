import React, { useEffect, useState } from "react";
import { useCallback } from "react";

function debounce(cb, ms) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, ms);
  };
}

function Example3() {
  const [text, setText] = useState("");
  const [displayText, setDisplayText] = useState("");

  const [typing, setIsTyping] = useState(false);

  function onChange(e) {
    setText(e.target.value);
  }

  //1st valid solution
  //   useEffect(() => {
  //     let timer = setTimeout(() => {
  //       changeDisplayText();
  //     }, 1000);
  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }, [text]);

  useEffect(() => {
    debounced(text);
  }, [text]);

  const debounced = useCallback(
    debounce((text) => changeDisplayText(text), 1000),
    []
  );

  function changeDisplayText(text) {
    console.log("Calling :" + text);
    setDisplayText(text);
  }

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      {text}
      <br />
      {displayText}
    </div>
  );
}

export default Example3;
