import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
const url = "http://localhost:4000/superheroes1";

function RQSuperHeroes() {
  const { data, isLoading, isError, error } = useQuery(
    "rq-super-heroes",
    () => {
      return axios.get(url);
    }
  );

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  if (isLoading) {
    return <h2>Loading.....</h2>;
  }

  return (
    <div>
      <h2 className="bold text-xl">RQ Super Heroes page</h2>
      {data.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </div>
  );
}

export default RQSuperHeroes;
