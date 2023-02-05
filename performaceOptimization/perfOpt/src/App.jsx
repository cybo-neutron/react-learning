import { useCallback, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import User from "./components/User";
import UserInput from "./components/UserInput";

function App() {
  const [user, setUser] = useState([
    { id: "1", name: "demo1" },
    { id: "2", name: "demo2" },
    { id: "3", name: "demo3" },
  ]);

  const changeName = useCallback((id, val) => {
    setUser((prev) =>
      prev.map((elem) => {
        if (elem.id === id) {
          elem.name = val;
        }
        return elem;
      })
    );
  }, []);

  return (
    <div className="App">
      <div className="grid grid-cols-3">
        {user.map((elem, i) => {
          return <User key={elem.id} {...user[i]} />;
        })}
      </div>
      <div className="grid grid-cols-3">
        {user.map((elem, i) => {
          return (
            <UserInput key={elem.id} {...user[i]} changeName={changeName} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
