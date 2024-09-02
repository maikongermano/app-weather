export class WeatherIconFactory {
    static createIcon(description: string): string {
      if (description.includes("sun")) return "sunny";
      if (description.includes("cloud")) return "cloudy";
      if (description.includes("rain")) return "rainy";
      return "partly_cloudy";
    }
  }