import React from "react";

export const Sidebar = ({
  items,
}: {
  items: {
    name: string;
    href: string;
  }[];
}) => (
  <div>
    {items.map(({ href, name }) => (
      <div key={href}>
        <a role="navigation" href={href}>
          {name}
        </a>
      </div>
    ))}
  </div>
);
