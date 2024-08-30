import React from 'react';
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from './weatherCard.module.css';

interface WeatherCardProps {
  city: string;
  temperature: number;
  description: string;
  icon: string;
}

const MotionBox = motion(Box);

const WeatherCard: React.FC<WeatherCardProps> = ({ city, temperature, description, icon }) => {
  return (
    <Box className={styles.container}>
      <Text className={styles.city}>
        {city}
      </Text>
      <Text className={styles.temperature}>
        {temperature}°C
      </Text>
      <MotionBox
        className={styles.imageContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image src={`/icons/${icon}.svg`} alt={description} width={80} height={80} />
      </MotionBox>
      <Text className={styles.description}>
        {description.charAt(0).toUpperCase() + description.slice(1)}
      </Text>
    </Box>
  );
};

export default WeatherCard;