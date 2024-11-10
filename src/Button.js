import { useState } from "react";

export default function Button() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  console.log("rerender Button");

  return (
    <button onClick={() => handleClick()}>i've listened {count} songs</button>
  );
}

// export function GreenButton({ children }) {
//   return <button>{children}</button>;
// }