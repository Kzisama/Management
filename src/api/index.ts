import request from "@/unitls/request";

type User = {
  username: string;
  password: string;
  telephone: string;
};

// 用户-----登录
export const loginAPI = (userlogin: { username: string; password: string }) =>
  request({
    url: "/api/login",
    method: "POST",
    data: {
      user_name: userlogin.username,
      user_pwd: userlogin.password,
    },
  });

// 用户-----注册
export const registerAPI = (useReg: User) =>
  request({
    url: "/api/register",
    method: "POST",
    data: {
      user_name: useReg.username,
      user_pwd: useReg.password,
      user_tel: useReg.telephone,
    },
  });

// 用户信息-----获取用户信息
export const getUserInfoAPI = () =>
  request({
    url: "/my/getinfo",
  });

// 密码-----比较密码
export const comparePwdAPI = (pwd: string) =>
  request({
    url: "/my/compare",
    method: "POST",
    data: {
      user_pwd: pwd,
    },
  });

// 密码-----修改密码
export const setPwdAPI = (newPwd: string) => request({
  url: "/my/setpwd",
  method: "PUT",
  data: {
    newPwd
  }
});

// 昵称-----修改昵称
export const setNickNameAPI = (nickname: string) => request({
  url: "/my/setnickname",
  method: "PUT",
  data: {
    nickname
  }
});

// 商品-----添加商品
export const addGoodsAPI = (goods: FormData) => request({
  url: "/goods/add",
  method: "POST",
  data: goods,
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

// 商品-----获取全部商品信息
export const getGoodsAPI = () => request({
  url: "/goods/get",
  method: "GET"
});