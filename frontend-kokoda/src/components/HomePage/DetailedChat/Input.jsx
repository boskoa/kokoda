import { useState } from "react";

function Input({ send }) {
  const [message, setMessage] = useState("");
  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => send(message)}>send</button>
    </div>
  );
}

export default Input;
