import { defineStore } from "pinia";

export type User = {
  user_id: number;
  user_name: string;
  user_nickname: null | string;
  user_type: number;
};

const useUserStore = defineStore("User", {
  state: () => {
    return {
      userInfo: {},
    };
  },
  actions: {
    // 保存用户信息
    setUserInfo(info: User) {
      this.userInfo = info;
    },
  },
  // 开启持久化
  persist: true,
});

export default useUserStore;
