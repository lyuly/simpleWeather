export interface WeatherProps {
  code: string
  updateTime: string
  fxLink: string
  now: Now
  refer: Refer
}

interface Refer {
  sources?: string[]
  license?: string[]
}

interface Now {
  obsTime: string
  temp: string
  feelsLike: string
  icon: string
  text: string
  wind360: string
  windDir: string
  windScale: string
  windSpeed: string
  humidity: string
  precip: string
  pressure: string
  vis: string
  cloud?: string
  dew?: string
}
