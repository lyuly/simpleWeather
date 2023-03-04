/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useContext, useEffect, useState } from 'react'
import { CardContext } from '../App'
import { type WeatherProps } from './types'
import dayjs from 'dayjs'
import fetchJsonp from 'fetch-jsonp'

function Card () {
  const location = useContext(CardContext)
  const [city, lon, lat] = location.split(',')

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dfa5856ee9350054815bd2bedbef912a&lang=zh_cn&units=metric`

  const [data, setWeather] = useState<WeatherProps>()

  const getData = async (url: string) => {
    await fetchJsonp(url)
      .then(async (response) => await response.json())
      .then((data) => {
        setWeather(data)
      })
  }

  useEffect(() => {
    void getData(url)
  }, [])

  return (
    <div className='grid grid-cols-2 gap-4 justify-around max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <h5 className='font-semibold text-6xl from-indigo-400 to-blue-500 text-transparent bg-clip-text bg-gradient-to-r'>
        {city}
        <div className='font-light text-2xl text-gray-400 text-center'>
          {data != null ? data.weather[0].description : ''}
        </div>
      </h5>

      <img
        className='rounded-full fill-current'
        src={
          './icons/' + (data != null ? data.weather[0].icon : '') +
          '.png'
        }
      />
      <p className='font-light text-6xl from-yellow-400 to-blue-600 text-transparent bg-clip-text bg-gradient-to-r'>
        {data != null ? Math.round(data.main.temp) : ''}
        <span className='align-super text-base'>℃</span>
      </p>
      <div className='font-light text-gray-400'>
        <div className='flex justify-between'>
        <span>体感</span>
          <span className='font-light from-gray-400 to-rose-200 text-transparent bg-clip-text bg-gradient-to-l'>
            {data != null ? Math.round(data.main.feels_like) : ''}℃
          </span>
        </div>
        <div className='flex justify-between'>
          <span>风速</span>
          <span className='font-light from-gray-400 to-rose-200 text-transparent bg-clip-text bg-gradient-to-l'>
            {data != null ? Math.round(data.wind.speed) : ''}m/s
          </span>
        </div>
        <div className='flex justify-between'>
          <span>湿度</span>
          <span className='font-light from-gray-400 to-rose-200 text-transparent bg-clip-text bg-gradient-to-l'>
          {data != null ? Math.round(data.main.humidity) : ''}%
        </span>
        </div>
        <div className='flex justify-between'>
          <span>大气压</span>
          <span className='font-light from-gray-400 to-rose-200 text-transparent bg-clip-text bg-gradient-to-l'>
            {data != null ? data.main.pressure : ''}pa
          </span>
        </div>
      </div>
    </div>
  )
}

export default Card
