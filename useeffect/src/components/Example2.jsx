import React, { useEffect, useState } from "react";

const Example2 = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // We don't want to fetch message when user is typing
    // Skip effect when isTyping is true
    if (isTyping) {
      return;
    }
    loadMessage(name);
  }, [name, isTyping]);

  const loadMessage = (nickName) => {
    try {
      fetch(
        `https://json.versant.digital/.netlify/functions/fake-api/message/name/${nickName}`
      )
        .then((res) => res.json())
        .then((message) => {
          setMessage(message);
        });
    } catch (e) {}
  };

  const handleNameFormSubmit = (event) => {
    event.preventDefault();
    setIsTyping(false);
  };

  return (
    <div className="App">
      <form onSubmit={handleNameFormSubmit}>
        <input
          value={name}
          onChange={(event) => {
            setIsTyping(true);
            setName(event.target.value);
          }}
        />
        <button>Set nickname</button>
      </form>
      <h1>{message}</h1>
    </div>
  );
};

export default Example2;
