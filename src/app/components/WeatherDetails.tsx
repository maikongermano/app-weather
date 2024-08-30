import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

interface WeatherDetailsProps {
  pressure: number;
  sunrise: string;
  sunset: string;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ pressure, sunrise, sunset }) => {
  return (
    <Flex justifyContent="space-between" mt={6}>
      <Text>Pressão: {pressure} hPa</Text>
      <Text>Nascer do sol: {sunrise}</Text>
      <Text>Pôr do sol: {sunset}</Text>
    </Flex>
  );
};

export default WeatherDetails;
