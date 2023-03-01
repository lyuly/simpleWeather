/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createContext, useEffect, useState } from 'react'
import Card from './components/Card'
// import { invoke } from "@tauri-apps/api/tauri";

// 天气面板信息传递
export const CardContext = createContext('')

function App () {
  // 搜索
  const [inputValue, setInputValue] = useState('')

  const [ipInfo, setIpInfo] = useState('')

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
      .then((data) => {
        setIpInfo(data)
      })
  }

  // 获取当前地址的ip地理信息
  useEffect(() => {
    void getIp()
  }, [])

  const search = () => {

  }

  return (
    <div className='flex justify-center items-center flex-col gap-5 bg-white dark:bg-black'>
      <h1 className='text-transparent bg-clip-text bg-gradient-to-r font-light to-emerald-300 from-sky-600 md:text-5xl lg:text-6xl'>
        简单天气
      </h1>

      <form>
        <label
          htmlFor='search'
          className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
        >
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
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              ></path>
            </svg>
          </div>
          <input
            onChange={(e) => { setInputValue(e.target.value) }}
            value={inputValue}
            type='search'
            id='search'
            className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder=''
            required
          />
          <button
            onClick={() => { search() }}
            type='submit'
            className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            搜索
          </button>
        </div>
      </form>

      <CardContext.Provider value={ipInfo}>
        <Card />
      </CardContext.Provider>
    </div>
  )
}

export default App
