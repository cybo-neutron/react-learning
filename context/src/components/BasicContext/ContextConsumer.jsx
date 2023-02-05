import React, { Component } from "react";
import { UserConsusmer } from "./UserContext";

function ContextConsumer() {
  return (
    <UserConsusmer>
      {user.name} : {age}
    </UserConsusmer>
  );
}

export default ContextConsumer;
