<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import fetchJsop from 'fetch-jsonp'

const props = defineProps(['ipInfo']);

const url = computed(() => {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${props.ipInfo!.lat}&lon=${props.ipInfo!.lon}&appid=dfa5856ee9350054815bd2bedbef912a&lang=zh_cn&units=metric`
})

const data = ref({weather: [{description: '', icon: ''}], main: {temp: 0, feels_like: 0, pressure: 0, humidity: 0}, wind: {speed: 0}})

const getData = async(url: string) => {
  await fetchJsop(url)
  .then(async (res) => await res.json())
  .then(rData => {
    data.value = rData
  })
}

  watchEffect(() => {
    getData(url.value)
  })
</script>

<template>
  <div
    className="grid grid-cols-2 gap-4 justify-around max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <h5
      className="font-semibold text-6xl from-indigo-400 to-blue-500 text-transparent bg-clip-text bg-gradient-to-r"
    >
      {{props.ipInfo!.city}}
      <div className="font-light text-2xl text-gray-400 text-center">
        {{data.weather[0].description}}
      </div>
    </h5>

    <img
      className="rounded-full fill-current"
      :src="'./icons/' + ( data.weather[0].icon) + '.png'"
    />
    <p
      className="font-light text-6xl from-yellow-400 to-blue-600 text-transparent bg-clip-text bg-gradient-to-r"
    >
      {{ Math.round(data.main.temp)}}
      <span className="align-super text-base">℃</span>
    </p>
    <div className="font-light text-gray-400">
      <div className="flex justify-between">
        <span>体感</span>
        <span
          className="font-light from-gray-400 to-rose-200 text-transparent bg-clip-text bg-gradient-to-l"
        >
          {{ Math.round(data.main.feels_like)}}℃
        </span>
      </div>
      <div className="flex justify-between">
        <span>风速</span>
        <span
          className="font-light from-gray-400 to-rose-200 text-transparent bg-clip-text bg-gradient-to-l"
        >
          {{ Math.round(data.wind.speed)}}m/s
        </span>
      </div>
      <div className="flex justify-between">
        <span>湿度</span>
        <span
          className="font-light from-gray-400 to-rose-200 text-transparent bg-clip-text bg-gradient-to-l"
        >
          {{ Math.round(data.main.humidity)}}%
        </span>
      </div>
      <div className="flex justify-between">
        <span>大气压</span>
        <span
          className="font-light from-gray-400 to-rose-200 text-transparent bg-clip-text bg-gradient-to-l"
        >
          {{ data.main.pressure}}pa
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
