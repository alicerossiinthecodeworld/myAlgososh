import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./app";

test("renders app", () => {
  render(<App />);
  const appElement = screen.getByText(/МБОУ АЛГОСОШ/i);
  expect(appElement).toBeInTheDocument();
});
