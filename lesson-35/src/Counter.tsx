import React, { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>Add One</button>

      <div role="contentinfo">Count is {count}</div>
    </div>
  );
};
