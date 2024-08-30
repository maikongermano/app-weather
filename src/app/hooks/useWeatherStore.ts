import { create } from 'zustand';

interface WeatherState {
  city: string;
  temperature: number | null;
  description: string;
  humidity: number | null;
  windSpeed: number | null;
  setWeather: (data: Partial<WeatherState>) => void;
}

const useWeatherStore = create<WeatherState>((set) => ({
  city: "",
  temperature: null,
  description: "",
  humidity: null,
  windSpeed: null,
  setWeather: (data) => set((state) => ({ ...state, ...data })),
}));

export default useWeatherStore;
