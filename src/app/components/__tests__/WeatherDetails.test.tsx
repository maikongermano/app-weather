import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherDetails from '../WeatherDetails';

describe('WeatherDetails', () => {
  it('renders correctly with given props', () => {
    const props = {
      pressure: 1013,
      sunrise: '06:00 AM',
      sunset: '06:00 PM',
    };

    const { getByText, getByAltText } = render(<WeatherDetails {...props} />);

    expect(getByText(/Pressão:/i)).toHaveTextContent(`Pressão: ${props.pressure} hPa`);

    expect(getByText(/Nascer do sol:/i)).toHaveTextContent(`Nascer do sol: ${props.sunrise}`);

    expect(getByText(/Pôr do sol:/i)).toHaveTextContent(`Pôr do sol: ${props.sunset}`);
  });
});