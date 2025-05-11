import React from "react";
import { render, getAllByTestId, fireEvent, queryByAltText, queryByText, getByText, findByText, findByAltText, getByPlaceholderText, prettyDOM} from "@testing-library/react";
import "@testing-library/jest-dom";
import Application from "../Application";

describe("DayListItem", () => {
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await findByText(container, "Archie Cohen");
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find((appointment) =>
      queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(container, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(queryByText(appointment, "Deleting")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await findByAltText(appointment, "Add");
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));
    
    expect(queryByText(day, "2 spots remaining")).toBeInTheDocument();
  
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug} = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await findByText(container, "Archie Cohen");

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find((appointment) =>
      queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Change the value of the student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    // 5. Click Save
    fireEvent.click(getByText(appointment, "Save"));
    // 6. Check that the element with the text "Saving" is displayed
    await findByText(container, "Saving");
    // 7. Check that the element with the new student name is displayed
    await findByText(container, "Lydia Miller-Jones");
    // 8. Check that the DayListItem with the text "Monday" still has "1 spot remaining"
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    
  });


});
