import useUserStore from "@/store/user";
import useWeatherStore from "@/store/weather";
import useGoodsStore from "@/store/goods";

export default function useStore() {
  return {
    userStore: useUserStore(),
    weatherStore: useWeatherStore(),
    goodsStore: useGoodsStore()
  };
}
