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
    <div className='inline-flex justify-center items-start flex-col max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
      <h5 className='font-light text-4xl from-indigo-600 to-orange-300 text-transparent bg-clip-text bg-gradient-to-r'>
        {city}
      </h5>
      <p className='font-light text-2xl from-yellow-400 to-indigo-600 text-transparent bg-clip-text bg-gradient-to-r'>
        {(data != null) ? data.main.temp : ''}
        <span className='align-super text-base'>℃</span>
        <span className='align-sub text-base'>{(data != null) ? data.main.humidity : ''}%</span>
      </p>
      <p className='inline font-light from-blue-400 to-indigo-600 text-transparent bg-clip-text bg-gradient-to-r'>
        <span>
          <img className='rounded-full max-w-lg' src={'https://openweathermap.org/img/wn/' + ((data != null) ? data.weather[0].icon : '') + '@2x.png'} />
          {(data != null) ? data.weather[0].description : ''}
        </span>
      </p>
      <p className='font-light from-gray-400 to-rose-200 text-transparent bg-clip-text bg-gradient-to-r'>
        {(data != null) ? data.wind.deg : ''} {(data != null) ? (data.wind.speed) : ''}m/s
      </p>
      <p className='font-light from-lime-400 to-rose-200 text-transparent bg-clip-text bg-gradient-to-r'>
        {(data != null) ? data.main.grnd_level : ''}pa
      </p>
      <p className='font-ligth from-gray-300 to-green-300 text-transparent bg-clip-text bg-gradient-to-l'>
        日出{(data != null) ? dayjs(data.sys.sunrise).format('h:mm:ss') : ''}~日落{(data != null) ? dayjs(data.sys.sunset).format('HH:mm:ss') : ''}
      </p>
    </div>
  )
}

export default Card
