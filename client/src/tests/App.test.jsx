import { render, screen } from "@testing-library/react";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

describe("renders the landing page", () => {
  it("should render component correctly", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByRole("link", { name: /View Notes/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /Create Note/i })).toBeDefined();
    
  });
});
