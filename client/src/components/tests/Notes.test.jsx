import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Notes from "../Notes";
import { MemoryRouter } from "react-router-dom";
import { useNavigate } from "react-router";
vi.mock("react-router", () => ({
  useNavigate: vi.fn(),
}));

describe("Render Notes Component", () => {
  beforeEach(() => {
    useNavigate.mockClear();
  });

  it("renders without errors", async () => {
    const mockFetch = vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce([
        { _id: "1", note: "Note 1", pinned: true, starred: false },
        { _id: "2", note: "Note 2", pinned: false, starred: true },
      ]),
    });

    render(
      <MemoryRouter>
        <Notes />
      </MemoryRouter>
    );

    await act(() => Promise.resolve());

    expect(screen.getByText("Note 1")).toBeDefined();
    expect(screen.getByText("Note 2")).toBeDefined();

    expect(screen.getByText("star")).toBeDefined();
    expect(screen.getByText("starred")).toBeDefined();
    expect(screen.getByText("pin")).toBeDefined();
    expect(screen.getByText("pinned")).toBeDefined();
    expect(screen.getAllByText("delete")).toBeDefined();

    mockFetch.mockRestore();
  });

  it("handles setOrRemoveStar function", async () => {
    const mockFetch = vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: vi
        .fn()
        .mockResolvedValueOnce([
          { _id: "1", note: "Note 1", pinned: true, starred: false },
        ]),
    });

    render(
      <MemoryRouter>
        <Notes />
      </MemoryRouter>
    );

    await act(() => Promise.resolve());

    const starButton = screen.getByText("star");
    fireEvent.click(starButton);

    await act(() => Promise.resolve());

    expect(mockFetch).toHaveBeenCalledWith(
      "http://localhost:8080/updateStar/1",
      {
        method: "PUT",
        body: JSON.stringify({ starred: true }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    mockFetch.mockRestore();
  });
});
