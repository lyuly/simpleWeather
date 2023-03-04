<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import Card from "./components/Card.vue";

interface IP {
  ip?: string;
  full_ip?: string;
  country?: string;
  country_code?: string;
  province?: string;
  city: string;
  distinct?: string;
  isp?: string;
  operator?: string;
  lon: string;
  lat: string;
  net_str?: string;
}

const inputValue = ref("")
const bgURL = ref("")

let ipInfo = ref({})

const getIp = () => {
  fetch('https://forge.speedtest.cn/api/location/info', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
      method: 'GET',
      mode: 'cors'
    })
      .then(async(response) => await response.json())
      .then((data) => {
        ipInfo.value = data
      })
}

const getBgUrl = async () => {
    await fetch('https://fly.atlinker.cn/api/bing/cn.php')
      .then(async (res) => await res.json())
      .then((data: any) => {
        const url = `https://bing.com${data.images[0].url}`
        bgURL.value = url
      })
  }

  getIp()
  getBgUrl()

const search = () => {};
</script>

<template>
  <div
    className="bg-cover bg-center flex justify-center items-center flex-col gap-5 w-screen h-screen bg-white dark:bg-black"
    :style="{ backgroundImage: `url(${bgURL})` }"
  >
    <h1
      className="text-4xl text-transparent bg-clip-text bg-gradient-to-r font-light to-emerald-300 from-sky-600 md:text-5xl lg:text-6xl"
    >
      简单天气
    </h1>

    <form>
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div
          className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          v-model="inputValue"
          type="search"
          id="search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
          required
        />
        <button
          @click="search"
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          搜索
        </button>
      </div>
    </form>

    <Card :ip-info="ipInfo"/>
  </div>
</template>

<style scoped></style>
