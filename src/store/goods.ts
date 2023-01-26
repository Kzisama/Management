import { defineStore } from "pinia";

type Goods = {
  product_num: number;
  product_name: string;
  product_pic: string;
  product_type: string;
  product_inv: number;
  product_price: number
}

const goodsInfo: Goods[] = [];
const useGoodsStore = defineStore("Goods", {
  state: () => {
    return {
      goodsInfo
    };
  },
  getters: {
    filterGoods: (state) => {
      return (type: string) => {
        if ( type === "全部" ) {
          return state.goodsInfo;
        } else {
          return state.goodsInfo.filter(item => item.product_type === type);
        }
      };
    }
  },
  actions: {
    setGoodsInfo(arr: Goods[]) {
      this.goodsInfo = arr;
    }
  }
});

export default useGoodsStore;