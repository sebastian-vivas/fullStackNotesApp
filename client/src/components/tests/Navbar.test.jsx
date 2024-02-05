import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../Navbar";

describe("Navbar Component", () => {
  it("renders without errors", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("View Notes")).toBeDefined();

    expect(screen.getByText("Create Note")).toBeDefined();
  });
});
