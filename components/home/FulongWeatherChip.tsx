import type { FulongWeather, WeatherIconKind } from '@/lib/fulongWeather';

export type { FulongWeather };

function LiveDot() {
  return <span className="weather-live-dot" aria-hidden />;
}

function WeatherIcon({ kind }: { kind: WeatherIconKind }) {
  const common = 'h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5';
  if (kind === 'sun') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="4.2" fill="#f0d078" />
        <path
          d="M12 3.2v1.8M12 19v1.8M4.1 12H5.9M18.1 12h1.8M6.3 6.3l1.3 1.3M16.4 16.4l1.3 1.3M6.3 17.7l1.3-1.3M16.4 7.6l1.3-1.3"
          stroke="#f5e8c7"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (kind === 'moon') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M15.2 4.4A7.4 7.4 0 1 0 19.6 14 6.2 6.2 0 0 1 15.2 4.4Z" fill="#f5e8c7" />
      </svg>
    );
  }
  if (kind === 'fog') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 10h14M4 13.5h16M6 17h12" stroke="#e8e0d4" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === 'rain') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M8 10a4 4 0 0 1 7.5-1.9A3.5 3.5 0 1 1 17 16H8.5A3.5 3.5 0 0 1 8 10Z" fill="#cfe4ee" />
        <path d="M9 17.5 8 20M12.5 17.5 11.5 20M16 17.5 15 20" stroke="#8ec5d8" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === 'storm') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M8 9.5a4 4 0 0 1 7.4-2A3.4 3.4 0 1 1 16.5 15H8.6A3.4 3.4 0 0 1 8 9.5Z" fill="#d5dde6" />
        <path d="M12 13.5 9.8 18h2.4L11 21.5" stroke="#f0d078" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8.2 14a4 4 0 0 1 7.3-2.2A3.5 3.5 0 1 1 17 18H8.8A3.4 3.4 0 0 1 8.2 14Z" fill="#e8e0d4" />
    </svg>
  );
}

export default function FulongWeatherChip({
  weather,
  compact = false,
}: {
  weather?: FulongWeather | null;
  compact?: boolean;
}) {
  if (!weather) return null;

  const raining = weather.precipitation > 0;
  const rainText = raining ? `目前有雨 ${weather.precipitation} 毫米` : '目前沒下雨';
  const rainEmoji = raining ? '🌧️' : '☂️';
  const aria = `一間屋駅前宿實時天氣狀況 ${weather.temperature} 度，${weather.label}，感覺像 ${weather.feelsLike} 度，空氣濕度 ${weather.humidity}%，${weather.windDir} 時速 ${weather.windSpeed} 公里，${rainText}`;

  if (compact) {
    return (
      <div className="hero-weather-bar" aria-label={aria}>
        <p className="hero-weather-bar-title">
          <LiveDot />
          一間屋實時天氣狀況
        </p>
        <p className="hero-weather-bar-meta">
          <WeatherIcon kind={weather.icon} />
          <span className="hero-weather-bar-temp">{weather.temperature}°</span>
          <span className="hero-weather-bar-label">{weather.label}</span>
          <span className="hero-weather-bar-rain">
            {rainEmoji} {raining ? `${weather.precipitation} mm` : '沒下雨'}
          </span>
          <span className="hero-weather-bar-time">
            {weather.observedAt ? `${weather.observedAt} 更新` : '即時更新'}
          </span>
        </p>
        {raining ? (
          <a href="#booking" className="hero-weather-bar-tip">
            小雨可看沙雕或走舊草嶺隧道 · 仍可訂房
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className="mb-2 mx-auto w-full max-w-[19rem] rounded-2xl border border-[#F5E8C7]/35 bg-black/45 px-3 py-2.5 text-[#F5E8C7] shadow-sm sm:mb-2.5 sm:px-4 sm:py-3"
      aria-label={aria}
    >
      <div className="text-center">
        <p className="inline-flex items-center justify-center gap-1.5 font-playfair text-[15px] leading-tight tracking-wide sm:text-base">
          <LiveDot />
          一間屋•駅前宿
        </p>
        <p className="mt-1 text-[11px] text-[#F5E8C7]/75 sm:text-xs">🌤️ 實時天氣狀況</p>
      </div>

      <div className="mt-2 flex items-center justify-center gap-2 border-t border-[#F5E8C7]/20 pt-2">
        <WeatherIcon kind={weather.icon} />
        <span className="text-xl font-semibold tabular-nums leading-none sm:text-2xl">{weather.temperature}°</span>
        <span className="text-sm">{weather.label}</span>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-left text-[11px] leading-snug text-[#F5E8C7]/90 sm:text-xs">
        <p>🌡️ 感覺像 {weather.feelsLike}°</p>
        <p>💧 空氣濕度 {weather.humidity}%</p>
        <p>
          💨 {weather.windDir} {weather.windSpeed} 公里
        </p>
        <p>
          {rainEmoji} {rainText}
        </p>
      </div>
      <p className="mt-1.5 text-center text-[10px] text-[#F5E8C7]/65">
        🕐 {weather.observedAt ? `${weather.observedAt} 觀測` : '即時觀測'} · 約 15 分鐘更新
      </p>
    </div>
  );
}
