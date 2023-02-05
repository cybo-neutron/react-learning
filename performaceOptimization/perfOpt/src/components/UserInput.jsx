import React from "react";

function UserInput({ id, name, changeName }) {
  return (
    <div className="bg-orange-500 py-2 border-2 border-black mx-2">
      <div>id : {id}</div>
      <div>
        <input
          type="text"
          defaultValue={name}
          className="border-2 border-black"
          onChange={(e) => {
            changeName(id, e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default React.memo(UserInput);
