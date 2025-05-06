import React from "react";
import { render } from "@testing-library/react";
// the appointment component
import Appointment from "../Appointment/index";

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
})