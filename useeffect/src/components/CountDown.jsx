import React, { useState } from "react";
import { useEffect } from "react";

function CountDown() {
  const [count, setCount] = useState(10);
  let timer = null;

  useEffect(() => {
    timer = setInterval(() => {
      setCount((count) => count - 1);
    }, 100);
    if (count <= 0) clearInterval(timer);
    return () => {
      clearInterval(timer);
    };
  }, [count]);

  //   if (count < 0) {
  //     clearInterval(timer);
  //   }

  return <div>Count : {count}</div>;
}

export default CountDown;

/*
Solution 1:

    let timer;
    useEffect(() => {
      if (count > 0) {
        timer = setTimeout(() => {
          setCount((prev) => prev - 1);
        }, 100);
      }

      return () => {
        clearTimeout(timer);
      };
    }, [count]);



    -------------
Solution 2:
  let timer = null;
  useEffect(() => {
    timer = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);
    if (count <= 0) clearInterval(timer);
    return () => {
      clearInterval(timer);
    };
  }, [count]);

*/
