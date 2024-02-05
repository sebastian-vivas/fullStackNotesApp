import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Create from "../Create";
import { useNavigate } from "react-router";

vi.mock("react-router", () => ({
  useNavigate: vi.fn(),
}));

describe("Render Create Component", () => {
  beforeEach(() => {
    useNavigate.mockClear();
  });

  it("renders without errors", () => {
    render(<Create />);
    expect(screen.getByText("Create New Note")).toBeDefined();
  });

  it("updates form state on input change", () => {
    render(<Create />);
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "Test" } });
    expect(inputElement.value).toBe("Test");
  });

  it("calls createNote function on form submission", async () => {
    const mockFetch = vi.spyOn(global, "fetch").mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce({}),
    });

    render(<Create />);
    const inputElement = screen.getByRole("textbox");
    const addButton = screen.getByText("add note");

    fireEvent.change(inputElement, { target: { value: "Test" } });
    fireEvent.click(addButton);

    await act(() => Promise.resolve());

    expect(mockFetch).toHaveBeenCalledWith("http://localhost:8080/note/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note: "Test" }),
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);

    mockFetch.mockRestore();
  });
});
