import { BUSINESS_GEO } from '@/lib/business';

/** Open-Meteo 即時資料約每 15 分鐘一筆；頁面也依此重抓 */
export const FULONG_WEATHER_REFRESH_MS = 15 * 60 * 1000;

export type FulongWeather = {
  temperature: number;
  feelsLike: number;
  humidity: number;
  weatherCode: number;
  isDay: boolean;
  windSpeed: number;
  windDir: string;
  precipitation: number;
  observedAt: string;
  label: string;
  icon: WeatherIconKind;
};

export type WeatherIconKind = 'sun' | 'moon' | 'cloud' | 'fog' | 'rain' | 'storm';

function iconAndLabel(code: number, isDay: boolean): { icon: WeatherIconKind; label: string } {
  if (code === 0) return { icon: isDay ? 'sun' : 'moon', label: isDay ? '晴' : '晴夜' };
  if (code === 1) return { icon: isDay ? 'sun' : 'moon', label: '大致晴朗' };
  if (code === 2) return { icon: 'cloud', label: '多雲' };
  if (code === 3) return { icon: 'cloud', label: '陰' };
  if (code === 45 || code === 48) return { icon: 'fog', label: '有霧' };
  if (code >= 51 && code <= 57) return { icon: 'rain', label: '毛毛雨' };
  if (code >= 61 && code <= 67) return { icon: 'rain', label: '雨' };
  if (code >= 71 && code <= 77) return { icon: 'cloud', label: '雪' };
  if (code >= 80 && code <= 82) return { icon: 'rain', label: '陣雨' };
  if (code >= 85 && code <= 86) return { icon: 'cloud', label: '陣雪' };
  if (code >= 95) return { icon: 'storm', label: '雷雨' };
  return { icon: 'cloud', label: '多雲' };
}

function windDirectionLabel(degree: number): string {
  const dirs = ['北', '東北', '東', '東南', '南', '西南', '西', '西北'];
  const i = Math.round(degree / 45) % 8;
  return `${dirs[i]}風`;
}

function formatObservedAt(iso: string | undefined): string {
  if (!iso) return '';
  const match = iso.match(/T(\d{2}:\d{2})/);
  return match ? match[1] : '';
}

export function parseFulongWeather(data: {
  current?: {
    temperature_2m?: number;
    apparent_temperature?: number;
    relative_humidity_2m?: number;
    weather_code?: number;
    is_day?: number;
    wind_speed_10m?: number;
    wind_direction_10m?: number;
    precipitation?: number;
    time?: string;
  };
}): FulongWeather | null {
  const current = data.current;
  if (current?.temperature_2m == null || current.weather_code == null) return null;
  const isDay = current.is_day === 1;
  const { icon, label } = iconAndLabel(current.weather_code, isDay);
  return {
    temperature: Math.round(current.temperature_2m),
    feelsLike: Math.round(current.apparent_temperature ?? current.temperature_2m),
    humidity: Math.round(current.relative_humidity_2m ?? 0),
    weatherCode: current.weather_code,
    isDay,
    windSpeed: Math.round(current.wind_speed_10m ?? 0),
    windDir: windDirectionLabel(current.wind_direction_10m ?? 0),
    precipitation: Math.round((current.precipitation ?? 0) * 10) / 10,
    observedAt: formatObservedAt(current.time),
    label,
    icon,
  };
}

export async function fetchFulongWeather(): Promise<FulongWeather | null> {
  try {
    const res = await fetch(fulongWeatherUrl(), {
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(800),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Parameters<typeof parseFulongWeather>[0];
    return parseFulongWeather(data);
  } catch {
    return null;
  }
}

export function fulongWeatherUrl() {
  const { latitude, longitude } = BUSINESS_GEO;
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current:
      'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,is_day,wind_speed_10m,wind_direction_10m,precipitation',
    timezone: 'Asia/Taipei',
    forecast_days: '1',
  });
  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}
