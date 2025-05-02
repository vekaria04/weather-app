export interface WeatherResponse {
  coord: { lat: number; lon: number };
  name: string;
  main: { temp: number };
  weather: { description: string }[];
}
