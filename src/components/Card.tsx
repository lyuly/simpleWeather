/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useContext, useEffect, useState } from 'react'
import { CardContext } from '../App'
import * as dayjs from 'dayjs'

export interface DataProps {
  [key: string]: any
  code?: string
  updateTime?: string
  now: {
    obsTime: string
    temp: string
    feelsLike?: string
    icon?: string
    text: string
    wind360?: string
    windDir: string
    windScale: string
    windSpeed: string
    humidity: string
    precip?: string
    pressure: string
    vis?: string
    cloud?: string
    dew?: string
  }
  refer: {
    sources?: string[]
    license?: string[]
  }
}

function Card () {
  const ipInfo = useContext(CardContext)

  const url = `https://devapi.qweather.com/v7/weather/now?location=${Number(
    ipInfo.lon
  ).toFixed(2)},${Number(ipInfo.lat).toFixed(
    2
  )}&key=18a7bf8cb4f94fb0aca036a106becb43`

  const [data, setWeather] = useState<DataProps>()

  const getData = async (url: string) => {
    await fetch(url, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
      method: 'GET',
      mode: 'cors'
    })
      .then(async (response) => await response.json())
      .then((data) => {
        setWeather(data)
      })
  }

  useEffect(() => {
    if (ipInfo.lon) { void getData(url) }
  }, [])

  return (
    <div className='inline-flex justify-start flex-col max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
      <h5 className='font-light from-indigo-600 to-orange-300 text-transparent bg-clip-text bg-gradient-to-r'>
        当前更新时间：
        {dayjs((data != null) ? data.now.obsTime : '').format('YYYY年MM月DD日 HH:mm:ss')}
      </h5>
      <p className='font-light from-yellow-400 to-indigo-600 text-transparent bg-clip-text bg-gradient-to-r'>
        {(data != null) ? data.now.temp : ''}℃/{(data != null) ? data.now.humidity : ''}%
      </p>
      <p className='font-light from-blue-400 to-indigo-600 text-transparent bg-clip-text bg-gradient-to-r'>
        {(data != null) ? data.now.text : ''}
      </p>
      <p className='font-light from-gray-400 to-red-600 text-transparent bg-clip-text bg-gradient-to-r'>
        {(data != null) ? data.now.windDir : ''}{(data != null) ? data.now.windSpeed : ''}km/h
      </p>
      <p className='font-light from-lime-400 to-red-600 text-transparent bg-clip-text bg-gradient-to-r'>
        {(data != null) ? data.now.pressure : ''}pa
      </p>
    </div>
  )
}

export default Card
