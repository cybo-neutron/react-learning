import React, { useState } from "react";
import { useEffect } from "react";

import axios from "axios";
const url = "http://localhost:4000/superheroes";
function SuperHeroes() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(url);

        setData(res.data);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
      }
    })();
  }, []);

  if (isError) {
    return <div>Error loading content</div>;
  }

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <h2 className="bold text-xl">Super Heroes page</h2>
      {data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </div>
  );
}

export default SuperHeroes;
