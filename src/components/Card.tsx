/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useEffect, useState } from 'react'
import { type WeatherProps } from './types'
import dayjs from 'dayjs'
import { type optionProps } from '../types/IpProps'

function Card (props: optionProps) {
  const { value, label } = props

  const url = `https://devapi.qweather.com/v7/weather/now?key=18a7bf8cb4f94fb0aca036a106becb43&location=${value}`

  const [data, setWeather] = useState<WeatherProps>()

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
    void getData(url)
  }, [value])

  return (
    <>
      {((data?.now) != null)
        ? (
        <div className='grid grid-cols-2 gap-4 justify-center items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600'>
          <h5 className='font-semibold text-6xl from-indigo-400 to-blue-500 text-transparent bg-clip-text bg-gradient-to-r'>
            {label}
            <div className='font-light text-2xl text-gray-400 text-center'>
              {data.now.text}
            </div>
          </h5>

          <img
            className='rounded-full fill-current w-16 h-16'
            src={'./icons/' + (data != null ? data.now.icon : '') + '.svg'}
          />
          <p className='font-light text-6xl from-yellow-400 to-blue-600 text-transparent bg-clip-text bg-gradient-to-r'>
            {data.now.temp}
            <span className='align-super text-base'>℃</span>
          </p>
          <div className='font-light text-gray-400'>
            <div className='flex justify-between'>
              <span>体感</span>
              <span className='font-light from-gray-400 to-rose-200 text-transparent bg-clip-text bg-gradient-to-l'>
                {data.now.feelsLike}℃
              </span>
            </div>
            <div className='flex justify-between'>
              <span>风速</span>
              <span className='font-light from-gray-400 to-rose-200 text-transparent bg-clip-text bg-gradient-to-l'>
                {data != null ? data.now.windSpeed : ''}m/s
              </span>
            </div>
            <div className='flex justify-between'>
              <span>湿度</span>
              <span className='font-light from-gray-400 to-rose-200 text-transparent bg-clip-text bg-gradient-to-l'>
                {data != null ? data.now.humidity : ''}%
              </span>
            </div>
            <div className='flex justify-between'>
              <span>大气压</span>
              <span className='font-light from-gray-400 to-rose-200 text-transparent bg-clip-text bg-gradient-to-l'>
                {data != null ? data.now.pressure : ''}pa
              </span>
            </div>
          </div>
        </div>
          )
        : null}
    </>
  )
}

export default Card
