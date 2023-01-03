import { useState } from "react";
import { useEffect } from "react";
import Example2 from "./components/Example2";
import Example3 from "./components/Example3";
import CountDown from "./components/CountDown";

function App() {
  return (
    <div>
      <Example3 />
      <CountDown />
    </div>
  );
}

export default App;
