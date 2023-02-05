import React from "react";

function User({ id, name }) {
  return (
    <div className=" border-2 mb-2 mx-2">
      ID : {id} <br />
      <div className="overflow-clip">
        Name : {name} <br />
      </div>
    </div>
  );
}

export default React.memo(User);
// export default User;
