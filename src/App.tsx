/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useEffect, useState } from 'react'
import Card from './components/Card'
import { invoke } from '@tauri-apps/api/tauri'
import { type optionProps, type IpProps } from './types/IpProps'
import { type Location, type cityProps } from './types/cityProps'

function App () {
  // 搜索
  const [inputValue, setInputValue] = useState('')

  const [bgUrl, setBgUrl] = useState('')

  const [ipInfo, setIpInfo] = useState<optionProps>()

  const getIp = async () => {
    await fetch('https://forge.speedtest.cn/api/location/info', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
      method: 'GET',
      mode: 'cors'
    })
      .then(async (response) => await response.json())
      .then((data: IpProps) => {
        const options = {
          value: `${Number(data.lon).toFixed(2)},${Number(data.lat).toFixed(2)}`,
          label: `${data.city}`
        }
        setIpInfo(options)
      })
  }

  async function greet () {
    setInputValue(await invoke('greet', { inputValue }))
  }

  const getBgUrl = async () => {
    await fetch('https://fly.atlinker.cn/api/bing/cn.php')
      .then(async (res) => await res.json())
      .then((data: any) => {
        const url = `https://bing.com${data.images[0].url}`
        setBgUrl(url)
      })
  }

  // 获取当前地址的ip地理信息
  useEffect(() => {
    void getBgUrl()
  }, [])

  useEffect(() => {
    void getIp()
  }, [])

  const search = async (inputValue: string) => {
    await fetch(`https://geoapi.qweather.com/v2/city/lookup?key=18a7bf8cb4f94fb0aca036a106becb43&location=${inputValue}`)
      .then(async (res) => await res.json())
      .then((data: cityProps) => {
        const options = {
          value: `${data.location[0].lon},${data.location[0].lat}`,
          label: `${data.location[0].name}`
        }
        setIpInfo(options)
        setInputValue('')
      })
  }

  return (
    <div
      className='bg-cover bg-center flex justify-center items-center flex-col gap-5 w-screen h-screen bg-white dark:bg-black'
      style={{ backgroundImage: `url(${bgUrl})` }}>
      <h1 className='text-4xl text-transparent bg-clip-text bg-gradient-to-r font-light to-emerald-300 from-sky-600 md:text-5xl lg:text-6xl'>
        简单天气
      </h1>

      <form>
        <label
          htmlFor='search'
          className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
          Search
        </label>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <svg
              aria-hidden='true'
              className='w-5 h-5 text-gray-500 dark:text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
            </svg>
          </div>
          <input
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
            value={inputValue}
            type='search'
            id='search'
            className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='输入城市'
            required
          />
          <button
            onClick={() => {
              void search(inputValue)
            }}
            type='button'
            className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            搜索
          </button>
        </div>
      </form>

      <Card
        value={ipInfo != null ? ipInfo.value : ''}
        label={ipInfo != null ? ipInfo.label : ''}
      />
    </div>
  )
}

export default App
