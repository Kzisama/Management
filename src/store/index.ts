import useUserStore from "@/store/user";
import useWeatherStore from "@/store/weather";

export default function useStore() {
  return {
    userStore: useUserStore(),
    weatherStore: useWeatherStore()
  };
}
