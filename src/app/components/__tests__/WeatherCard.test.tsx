import React from 'react';
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import WeatherCard from "../WeatherCard";

describe("WeatherCard", () => {
  it("renders correctly with given", () => {
    const props = {
      city: "Apucarana",
      temperature: 25,
      description: "sunny",
      icon: "sunny",
    };
    const { getByText, getByAltText } = render(<WeatherCard {...props} />);

    expect(getByText(props.city)).toBeInTheDocument();

    expect(getByText(`${props.temperature}°C`)).toBeInTheDocument();

    expect(getByText(/Sunny/i)).toBeInTheDocument();

    const image = getByAltText(/sunny/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", `/icons/${props.icon}.svg`);
  });
});