import { defineStore } from "pinia";

const useWeatherStore = defineStore("Weather", {
  state: () => {
    return {
      weatherInfo: {}
    };
  },
  actions: {
    setWeather(todayWeather: any) {
      this.weatherInfo = todayWeather;
    }
  },
  persist: true
});

export default useWeatherStore;