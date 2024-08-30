import React from 'react';
import { Flex, Input, Button, Center, useColorModeValue } from "@chakra-ui/react";

interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  handleSearch: () => void;
  inputBgColor: string;
  buttonColorScheme: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ city, setCity, handleSearch, inputBgColor, buttonColorScheme }) => {
  return (
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
  );
};

export default SearchBar;
