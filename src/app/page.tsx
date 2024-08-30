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
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import useWeatherStore from "./hooks/useWeatherStore";
import { fetchWeather } from "./services/api";

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
    if (description.includes("sun")) return "sunny";
    if (description.includes("cloud")) return "cloudy";
    if (description.includes("rain")) return "rainy";
    return "partly_cloudy";
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

      <Center mb={10}>
        <Flex direction={["column", "row"]} width={["100%", "auto"]} alignItems="center">
          <Input
            placeholder="Entre com a cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            width={["100%", "400px"]}
            mb={[2, 0]}
            mr={[0, 4]}
            bg={inputBgColor}
            color={useColorModeValue("black", "white")}
            borderRadius="full"
            boxShadow="md"
            border="2px solid"
            borderColor="blue.400"
            _hover={{ borderColor: "blue.500", boxShadow: "lg" }}
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
            _placeholder={{ color: useColorModeValue("gray.500", "gray.300") }}
            transition="all 0.3s ease"
          />
          <Button
            onClick={handleSearch}
            colorScheme={buttonColorScheme}
            borderRadius="full"
            boxShadow="md"
            _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
            _active={{ boxShadow: "lg", transform: "scale(0.95)" }}
            px={8}
            transition="all 0.3s ease"
          >
            Buscar
          </Button>
        </Flex>
      </Center>

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
