import React from "react";
import { render, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, findByText} from "@testing-library/react";
import "@testing-library/jest-dom";
import Application from "../Application";

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { queryByText, findByText, getByText } = render(<Application />);
  
    await findByText("Monday");
  
    fireEvent.click(getByText("Tuesday"));
    expect(queryByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);


    await findByText(container, "Archie Cohen");
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(queryByText(appointment, "Saving")).toBeInTheDocument();

    await findByText(appointment, "Lydia Miller-Jones");

    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));

    expect(queryByText(day, "no spots remaining")).toBeInTheDocument();
    });


});