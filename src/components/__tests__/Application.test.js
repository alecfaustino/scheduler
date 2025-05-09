import React from "react";
import { render, fireEvent, getByText, prettyDOM } from "@testing-library/react";
import "@testing-library/jest-dom";
import Application from "../Application";

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { queryByText, findByText, getByText} = render(<Application />);
  
    await findByText("Monday");
  
    fireEvent.click(getByText("Tuesday"));
    expect(queryByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, findByText, getAllByTestId } = render(<Application />);

    await findByText("Archie Cohen");

    const appointments = getAllByTestId(container, "appointment");
    console.log(prettyDOM(appointments), "^^^^^^");


  })
})