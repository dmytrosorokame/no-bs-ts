import React from "react";
import { render, screen } from "@testing-library/react";
import { Person } from "./Person";

test("renders learn react link", () => {
  render(<Person name="Dmytro" />);

  const divElement = screen.getByRole("contentinfo");

  expect(divElement).toHaveTextContent("Name is Dmytro");

  expect(divElement).toHaveAttribute("role", "contentinfo");
});
