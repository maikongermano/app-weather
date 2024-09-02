"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Input,
  Button,
  Center,
  Heading,
  Flex,
  VStack,
  Text,
  useColorMode,
  useColorModeValue,
  IconButton,
  Grid,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import Image from "next/image";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import useWeatherStore from "./hooks/useWeatherStore";
import { fetchWeather } from "./services/api";
import { WeatherIconFactory } from "./utils/WeatherIconFactory";

export default function Home() {
  const [city, setCity] = useState<string>("Apucarana");
  const { setWeather } = useWeatherStore();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    enabled: false,
  });

  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const inputBgColor = useColorModeValue("white", "gray.600");
  const buttonColorScheme = useColorModeValue("blue", "orange");
  const iconColor = useColorModeValue("yellow.500", "blue.500");

  const handleSearch = () => {
    refetch();
  };

  useEffect(() => {
    if (data) {
      setWeather({
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      });
    }
  }, [data, setWeather]);

  const getNext7Days = () => {
    const daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const next7Days = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dayName = daysOfWeek[date.getDay()];
      next7Days.push(dayName);
    }

    return next7Days;
  };

  const days = getNext7Days();

  const getWeatherIcon = (description: string) => {
    return WeatherIconFactory.createIcon(description);
  };

  return (
    <Box bg={bgColor} minH="100vh" p={[4, 6, 8]} color="white">
      <Flex justify="flex-end" mb={4}>
        <IconButton
          aria-label="Toggle Theme"
          icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
          onClick={toggleColorMode}
          variant="ghost"
          color={iconColor}
        />
      </Flex>

      <Center>
        <Heading mb={5} color={useColorModeValue("black", "white")} fontSize={["2xl", "3xl", "5xl"]}>
          Previsão do tempo
        </Heading>
      </Center>

      <SearchBar 
        city={city} 
        setCity={setCity} 
        handleSearch={handleSearch} 
        inputBgColor={inputBgColor} 
        buttonColorScheme={buttonColorScheme} 
      />

      {isLoading && <Center color={useColorModeValue("black", "white")}>Carregando...</Center>}
      {isError && <Center color={useColorModeValue("black", "white")}>Erro ao carregar!</Center>}

      {data && (
        <Center>
          <VStack spacing={8} w="100%" maxW="2xl">
            <Box
              bg={useColorModeValue("blue.200", "blue.600")}
              p={[6, 8, 10]}
              rounded="lg"
              shadow="lg"
              textAlign="center"
              w="100%"
            >
              <WeatherCard
                city={data.name}
                temperature={data.main.temp}
                description={data.weather[0].description}
                icon={getWeatherIcon(data.weather[0].description)}
              />
              <WeatherDetails
                pressure={data.main.pressure}
                sunrise={new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
                sunset={new Date(data.sys.sunset * 1000).toLocaleTimeString()}
              />
            </Box>

            <Grid templateColumns={["1fr", "repeat(2, 1fr)", "repeat(4, 1fr)"]} gap={6} w="100%">
              {days.map((day, index) => (
                <Box
                  key={index}
                  bg={useColorModeValue("blue.200", "blue.600")}
                  p={[3, 4, 5]}
                  rounded="md"
                  textAlign="center"
                >
                  <Text>{day}</Text>
                  <Image src="/icons/sunny.svg" alt="sunny" width={40} height={40} />
                  <Text fontSize="xl" mt={2}>
                    20°C / 10°C
                  </Text>
                </Box>
              ))}
            </Grid>
          </VStack>
        </Center>
      )}
    </Box>
  );
}
