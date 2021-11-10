import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react-native";
import { toHaveStyle } from "@testing-library/jest-native";

import App from "../App";
afterEach(cleanup);

describe("App", () => {
  expect.extend({ toHaveStyle });

  it("should show hello world", () => {
    const helloWorldText = "Hello World!";
    const notFoundText = "Not found text";

    const { toJSON, getByText, queryByText } = render(<App />);

    const foundHelloWorldText = getByText(helloWorldText);
    const notFoundTextElement = queryByText(notFoundText);

    expect(foundHelloWorldText.props.children).toEqual(helloWorldText);
    expect(notFoundTextElement).toBeNull();
    expect(toJSON()).toMatchSnapshot();
  });

  it("should not find a dynamic component", () => {
    const { queryByTestId } = render(<App />);
    const notFoundDynamicComponent = queryByTestId("dynamicComponent");

    expect(notFoundDynamicComponent).toBeNull();
  });

  it("should find the button via testId", () => {
    const testIdName = "pressMeButton";
    const { getByTestId } = render(<App />);
    const foundButton = getByTestId(testIdName);

    expect(foundButton).toBeTruthy();
  });

  it("should find the button via accessibilityLabel", () => {
    const accessibilityLabel = "Press me";
    const { getByA11yLabel } = render(<App />);
    const foundButton = getByA11yLabel(accessibilityLabel);

    expect(foundButton).toBeTruthy();
  });

  it("should find the button title", () => {
    const title = "Press me!";
    const { getByText } = render(<App />);
    const foundButtonTitle = getByText(title);

    expect(foundButtonTitle.props.children).toEqual(title);
  });

  it("should match the body style", () => {
    const { getByTestId } = render(<App />);
    const foundBodyElement = getByTestId("body");

    expect(foundBodyElement.props.style.backgroundColor).toEqual("#ffffff");
  });

  it("should match the sectionTitle style", () => {
    const { getByText } = render(<App />);
    const foundSectionTitle = getByText("Hello World!");

    expect(foundSectionTitle).toHaveStyle({
      fontSize: 24,
      fontWeight: "600",
      color: "#000000",
    });
  });

  it("should not find the toggled component", () => {
    const hiddenToggledText = "I am the toggled component";
    const { queryByText } = render(<App />);
    const notFoundHiddenComponent = queryByText(hiddenToggledText);

    expect(notFoundHiddenComponent).toBeFalsy();
  });

  it("should find the toggled component", () => {
    const testIdName = "pressMeButton";
    const toggledText = "I am the toggled component";
    const { getByTestId, getByText } = render(<App />);
    const foundButton = getByTestId(testIdName);

    fireEvent.press(foundButton);

    const foundToggledText = getByText(toggledText);

    expect(foundToggledText.props.children).toEqual(toggledText);
  });
});
