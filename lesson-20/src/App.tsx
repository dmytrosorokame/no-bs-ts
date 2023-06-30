import React, { PropsWithChildren, useCallback } from "react";
import "./App.css";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box: React.FC<PropsWithChildren> = ({ children }) => (
  <div style={{ padding: "1rem", fontWeight: "bold" }}>{children}</div>
);

const List: React.FC<{
  items: string[];
  onClick?: (item: string) => void;
}> = ({ items, onClick }) => (
  <ul>
    {items.map((item) => (
      <li key={item} onClick={onClick?.bind(null, item)}>
        {item}
      </li>
    ))}
  </ul>
);

function App() {
  const onListClick = useCallback((item: string) => {
    alert(item);
  }, []);

  return (
    <div>
      <Heading title="Introduction" />
      <Box>Hello there!</Box>

      <List items={["1", "2", "3"]} onClick={onListClick} />
    </div>
  );
}

export default App;
